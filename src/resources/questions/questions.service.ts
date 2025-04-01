import { Injectable } from '@nestjs/common';
import { Service } from 'src/common/base-class';
import { Question } from './domain/question.domain';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionRepository } from './repository/questions-abstract.repository';
import { CategoriesService } from '../categories/categories.service';
import { ErrorApiResponse } from 'src/core/error-response';

@Injectable()
export class QuestionsService implements Service<Question> {
  private mockQuestion = new Question({
    id: '',
    category: { id: '', isChallenge: false, name: '' },
    createdAt: '',
    description: '',
    title: '',
    solution: '',
    starterCode: '',
    testCases: [],
    updatedAt: '',
    deletedAt: '',
  });

  private mockResolve = Promise.resolve(this.mockQuestion);
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(data: CreateQuestionDto): Promise<Question> {
    const isCategoryExist = await this.categoriesService.getById(
      data.categoryId,
    );

    if (!isCategoryExist)
      throw ErrorApiResponse.notFound('ID', data.categoryId, 'Category');

    const isQuestionDuped = await this.questionRepository.findByTitle(
      data.name,
    );

    if (isQuestionDuped)
      throw ErrorApiResponse.conflictRequest(
        `The question name: ${isQuestionDuped.title} is already exist. Please try again with new question name.`,
      );
    return this.mockResolve;
  }
  getById(id: string): Promise<Question> {
    return this.mockResolve;
  }
  getMany(): Promise<Question[]> {
    return Promise.resolve([this.mockQuestion]);
  }
  update(data: Partial<Omit<Question, 'id'>>, id: string): Promise<Question> {
    return this.mockResolve;
  }
}
