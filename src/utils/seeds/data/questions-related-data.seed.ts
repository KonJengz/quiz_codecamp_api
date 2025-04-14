import { Category } from 'src/resources/categories/domain/categories.domain';
import { CreateCategoryDto } from 'src/resources/categories/dto/create.dto';
import { CategorySchemaClass } from 'src/resources/categories/repository/entities/category.entity';
import { CreateQuestionDto } from 'src/resources/questions/dto/create-question.dto';
import { loopQuestions, stringQuestions } from './questions.data';
import { QuestionSchemaClass } from 'src/resources/questions/repository/entities/questions.entity';
import { Question } from 'src/resources/questions/domain/question.domain';

const seedsCategoryData: CreateCategoryDto = {
  name: 'Seed',
  isChallenge: false,
};

const categoriesData: CreateCategoryDto[] = [
  {
    name: 'String',
    isChallenge: false,
  },
  {
    name: 'Conditional',
    isChallenge: false,
  },
  {
    name: 'Loop',
    isChallenge: false,
  },
];
// function generateQuestionData(categoryId: Category['id']): CreateQuestionDto {
//   return {
//     categoryId,
//     description,
//   };
// }

export function seedsCategory() {
  const categories: CreateCategoryDto[] = categoriesData;

  for (let i = 1; i <= 4; i++) {
    if (i > 2) {
      categories.push({
        name: `${seedsCategoryData.name}_challenge_0${i - 2}`,
        isChallenge: true,
      });
      continue;
    }

    categories.push({
      ...seedsCategoryData,
      name: `${seedsCategoryData.name}_0${i}`,
    });
  }

  return categories;
}

export function seedsQuestion(
  categories: CategorySchemaClass[],
): CreateQuestionDto[] {
  const questions: CreateQuestionDto[] = [];

  const pushingSeedData = (questionsSeed: any[], categoryId) => {
    questions.push(
      ...questionsSeed.map((question) => ({ ...question, categoryId })),
    );
  };

  categories.forEach((category) => {
    switch (category.name) {
      case 'String':
        pushingSeedData(stringQuestions, category.id);
        break;
      case 'Loop':
        pushingSeedData(loopQuestions, category.id);
        break;
    }
  });

  return questions;
}

export function filterQuestionForCategory(
  categories: CategorySchemaClass[],
  questions: QuestionSchemaClass[],
): Map<string, QuestionSchemaClass['id'][]> {
  const categoriesMap = new Map<Category['id'], QuestionSchemaClass['id'][]>();
  // Making a category map first
  categories.forEach((category) => {
    categoriesMap.set(category._id.toString(), []);
  });

  // Loop through each question to check the category
  questions.forEach((question) => {
    const categoryId = question.categoryId.toString();
    if (!categoriesMap.has(categoryId))
      throw new Error(
        'There is an error while seedinng questions in to category',
      );
    // Get the existing array and push the nnew question ID
    const arr = categoriesMap.get(categoryId);
    arr.push(question.id);

    // Setting the categoryId with exsiting arr
    categoriesMap.set(categoryId, arr);
  });

  return categoriesMap;
}
