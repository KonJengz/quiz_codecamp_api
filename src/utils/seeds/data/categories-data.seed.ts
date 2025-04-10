import { CreateCategoryDto } from 'src/resources/categories/dto/create.dto';

const categoryData: CreateCategoryDto = {
  name: 'Seed',
  isChallenge: false,
};

function seedsCategoryAndQuestions() {
  const categories: CreateCategoryDto[] = [];

  for (let i = 1; i <= 8; i++) {
    if (i > 5) {
      categories.push({
        name: `${categoryData.name}_challenge_0${i - 5}`,
        isChallenge: true,
      });
      continue;
    }

    categories.push({
      ...categoryData,
      name: `${categoryData.name}_0${i}`,
    });
  }

  return categories;
}

export default seedsCategoryAndQuestions;
