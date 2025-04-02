import { Injectable } from '@nestjs/common';
import { Service } from 'src/common/base-class';
import { Question } from './domain/question.domain';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionRepository } from './repository/questions-abstract.repository';
import { CategoriesService } from '../categories/categories.service';
import { ErrorApiResponse } from 'src/core/error-response';

@Injectable()
export class QuestionsService implements Service<Question> {
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
    return this.questionRepository.findById(id);
  }
  getMany(): Promise<Question[]> {
    return this.questionRepository.findMany();
  }
  update(data: Partial<Omit<Question, 'id'>>, id: string): Promise<Question> {
    return this.questionRepository.update(data, id);
  }

  // PRIVATE METHOD PART

  private validateQuestionCode(data: CreateQuestionDto): void {
    const { starterCode, solution, variableName } = data;
    return;
  }
}
