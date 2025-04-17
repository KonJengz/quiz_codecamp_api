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
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ObjectHelper } from 'src/utils/object.helper';
import { ITestCase } from 'src/infrastructure/executor/codeExecutor.service';

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

    const { variableName, isFunction } = data;

    // Generate test case
    const genTestCase = this.codeExecutionService.generateTestCase(
      data.testCases,
      data.variableName,
    );

    await this.testingCodeWithTestCases(
      data.solution,
      { isFunction, variableName },
      genTestCase,
    );

    data.testCases = genTestCase;

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
  async update(data: UpdateQuestionDto, id: string): Promise<Question> {
    const question = await this.questionRepository.findById(id);

    if (!question) throw ErrorApiResponse.notFound('ID', id, 'Questions');

    const processedData = await this.validateUpdateInfo(data, question);

    return this.questionRepository.update(processedData, id);
  }

  // --- PRIVATE METHOD PART ---

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
    const { solution, isFunction, variableName, testCases } = data;

    const { errMsg, isValid } = this.codeExecutionService.validateCode({
      codes: [solution],
      detail: {
        isFunction,
        variableName,
      },
    });

    if (!isValid) throw ErrorApiResponse.badRequest(errMsg);

    return;
  }

  private async testingCodeWithTestCases(
    solution: Question['solution'],
    details: {
      isFunction: Question['isFunction'];
      variableName: Question['variableName'];
    },
    testCases: ITestCase[],
  ) {
    const { isFunction, variableName } = details;

    const testResults = await this.codeExecutionService.submit(
      solution,
      testCases,
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

  private async validateUpdateInfo(
    data: UpdateQuestionDto,
    question: Question,
  ): Promise<UpdateQuestionDto> {
    // Declare the array contain the keys which need to validate the code
    // before updating
    const mustValidateFields: Omit<keyof UpdateQuestionDto, 'questionId'>[] = [
      'isFunction',
      'solution',
      'starterCode',
      'variableName',
    ];

    const { questionId, categoryId, title, isFunction } = data;

    // Processing the category part if provided.
    if (categoryId) {
      const category = await this.categoriesService.getById(categoryId);

      if (!category)
        throw ErrorApiResponse.notFound('ID', categoryId, 'Category');
    }

    // If there are to-be-update title,
    // check first if it's duplicate.
    if (title) {
      const isTitleExist = await this.questionRepository.findByTitle(title);

      if (isTitleExist)
        throw ErrorApiResponse.conflictRequest(
          `The title : ${title} is already exist with ID:${isTitleExist.id}`,
        );
    }
    // Adding isFunction to question to check the to-be-update isFunction
    if (isFunction) {
      let toValidateIsFunction: boolean =
        this.codeExecutionService.validateFunctionSyntax(question.starterCode);
      question['isFunction'] = toValidateIsFunction;
    }

    const toUpdateData = ObjectHelper.nonMutateDeDuplicateNewObj<
      Omit<UpdateQuestionDto, 'questionId'>
    >(question, data);

    if (ObjectHelper.isEmpty(toUpdateData))
      throw ErrorApiResponse.conflictRequest();

    const toUpdateFields: (keyof UpdateQuestionDto)[] = Object.keys(
      toUpdateData,
    ) as (keyof UpdateQuestionDto)[];

    if (
      toUpdateFields.some((toUpdateField) =>
        mustValidateFields.includes(toUpdateField),
      )
      // Validate the to-be-update code part
      // which is variableName, solution and starterCode
    )
      return { questionId, ...toUpdateData };
  }
}
