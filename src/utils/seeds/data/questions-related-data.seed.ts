import { Category } from 'src/resources/categories/domain/categories.domain';
import { CreateCategoryDto } from 'src/resources/categories/dto/create.dto';
import { CreateQuestionDto } from 'src/resources/questions/dto/create-question.dto';

const seedsCategoryData: CreateCategoryDto = {
  name: 'Seed',
  isChallenge: false,
};

const categoriesData: CreateCategoryDto[] = [
  {
    name: 'Conditional',
    isChallenge: false,
  },
  {
    name: 'Loop',
    isChallenge: false,
  },
];

const questionData: Omit<CreateQuestionDto, 'categoryId'>[] = [
  {
    description: '',
    solution: '',
    starterCode: '',
    testCases: [],
    testVariable: {
      isFunction: true,
      variableName: 'seed',
    },
    title: 'Seeds Question',
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

export function seedsQuestion() {}
