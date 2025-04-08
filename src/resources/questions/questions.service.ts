import { Injectable } from '@nestjs/common';
import { Service } from 'src/common/base-class';
import { Question } from './domain/question.domain';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionRepository } from './repository/questions-abstract.repository';
import { CategoriesService } from '../categories/categories.service';
import { ErrorApiResponse } from 'src/core/error-response';
import {
  CodeExecutionEnum,
  CodeExecutorService,
} from 'src/infrastructure/executor/codeExecutor-abstract.service';
import { Category } from '../categories/domain/categories.domain';
import { IDValidator } from 'src/utils/IDValidatior';

@Injectable()
export class QuestionsService implements Service<Question> {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly categoriesService: CategoriesService,
    private readonly codeExecutionService: CodeExecutorService,
  ) {}

  private arrowFnRegex = new RegExp(/\=\s*\(\s*\)\s*=>/);
  private functionRegex = new RegExp(/function\s+(\w+\s*)?\(/);

  async create(data: CreateQuestionDto): Promise<Question> {
    const isCategoryExist = await this.categoriesService.getById(
      data.categoryId,
    );

    if (!isCategoryExist)
      throw ErrorApiResponse.notFound('ID', data.categoryId, 'Category');

    const isQuestionDuped = await this.questionRepository.findByTitle(
      data.title,
    );

    if (isQuestionDuped)
      throw ErrorApiResponse.conflictRequest(
        `The question name: ${isQuestionDuped.title} is already exist. Please try again with new question name.`,
      );

    // Validate the question
    this.validateQuestionCode(data);

    return this.questionRepository.create(data);
  }

  getById(id: Question['id']): Promise<Question> {
    // Validate ID before proceed.
    IDValidator(id, 'Question');
    return this.questionRepository.findById(id);
  }

  async getByCategoryId(categoryId: Category['id']): Promise<Question[]> {
    // Validate ID before proceed.
    IDValidator(categoryId, 'Category');

    const isCategoryExist = await this.categoriesService.getById(categoryId);

    if (!isCategoryExist)
      throw ErrorApiResponse.notFound(`ID`, categoryId, 'Category');

    return this.questionRepository.findByCategoryId(categoryId);
  }

  getMany(): Promise<Question[]> {
    return this.questionRepository.findMany();
  }
  update(data: Partial<Omit<Question, 'id'>>, id: string): Promise<Question> {
    return this.questionRepository.update(data, id);
  }

  // PRIVATE METHOD PART

  private async validateQuestionCode(data: CreateQuestionDto): Promise<void> {
    const { starterCode, solution, testVariable, testCases } = data;
    const { isFunction, variableName } = testVariable;

    if (!starterCode.includes(variableName))
      throw ErrorApiResponse.badRequest(
        `The variable name: ${variableName} is not exists in startercode`,
      );

    if (!solution.includes(variableName))
      throw ErrorApiResponse.badRequest(
        `The variable name: ${variableName} is not exist in solution`,
      );

    if (isFunction) {
      const isTestVariableAFn = [starterCode, solution].every((code) =>
        this.validateFunctionSyntax(code),
      );

      if (!isTestVariableAFn)
        throw ErrorApiResponse.badRequest(
          `Provided question as function but the solution does not contain any function syntax.`,
        );
    }

    const genTestCase = this.codeExecutionService.generateTestCase(testCases);
    const testResults = await this.codeExecutionService.submit(
      solution,
      genTestCase,
      { isFunction, variableName },
    );

    console.log('Test', testResults);

    if (
      testResults.status === CodeExecutionEnum.Fail ||
      testResults.results.failed.length > 0
    )
      if (!testResults.isError) {
        throw ErrorApiResponse.badRequest(
          `The provided solution does not pass all of testcases. ${testResults.results.failed.map((result) => `Case: ${result.testCase} \n Expected: ${result.expected} \n Receive: ${result.actual}`).join('\n')}`,
        );
      } else {
        throw ErrorApiResponse.badRequest(
          `There is an error while testing the test case with provided solution \n ${testResults.errMsg}`,
        );
      }

    return;
  }

  private validateFunctionSyntax(code: string) {
    return this.arrowFnRegex.test(code) || this.functionRegex.test(code);
  }
}
