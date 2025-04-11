import { Injectable } from '@nestjs/common';
import { Service } from 'src/common/base-class';
import { Question, QuestionAndSubmission } from './domain/question.domain';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionRepository } from './repository/questions-abstract.repository';
import { CategoriesService } from '../categories/categories.service';
import { ErrorApiResponse } from 'src/core/error-response';
import { CodeExecutorService } from 'src/infrastructure/executor/codeExecutor-abstract.service';
import { Category } from '../categories/domain/categories.domain';
import { IDValidator } from 'src/utils/IDValidatior';
import { SubmissionStatusEnum } from '../submissions/domain/submission.domain';
import { User } from '../users/domain/user.domain';

@Injectable()
export class QuestionsService implements Service<Question> {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly categoriesService: CategoriesService,
    private readonly codeExecutionService: CodeExecutorService,
  ) {}

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

    // Validate the question code
    // before creating it.
    await this.validateQuestionCode(data);

    return this.questionRepository.create(data);
  }

  getById(id: Question['id']): Promise<Question> {
    // Validate ID before proceed.
    IDValidator(id, 'Question');
    return this.questionRepository.findById(id);
  }

  getByIdAndMySubmission(
    id: Question['id'],
    userId: User['id'],
  ): Promise<QuestionAndSubmission> {
    IDValidator(id, 'Question');

    return this.questionRepository.findByIdAndUserSubmission(id, userId);
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

  /**
   * Function to check the code inside of data argument
   * {CreateQuestionDto} to check if provided variableName
   * included in solution and/or starterCode
   * and also testing the solution against all of
   * the test case
   * @param {CreateQuestionDto} data
   * @returns void
   */
  private async validateQuestionCode(data: CreateQuestionDto): Promise<void> {
    const { solution, testVariable, testCases } = data;
    const { isFunction, variableName } = testVariable;

    const { errMsg, isValid } = this.codeExecutionService.validateCode({
      codes: [solution],
      detail: {
        isFunction,
        variableName,
      },
    });

    if (!isValid) throw ErrorApiResponse.badRequest(errMsg);

    const genTestCase = this.codeExecutionService.generateTestCase(testCases);
    const testResults = await this.codeExecutionService.submit(
      solution,
      genTestCase,
      { isFunction, variableName },
    );

    if (testResults.isError)
      throw ErrorApiResponse.badRequest(testResults.errMsg);

    if (
      testResults.status === SubmissionStatusEnum.FAILED ||
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
}
