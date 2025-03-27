const USER_PATH = 'users';
const CATEGORIES_PATH = 'categories';
const QUESTIONS_PATH = 'questions';
const SUBMIT_PATH = 'submit';
const HEALTH_PATH = 'healthcheck';

export const healthCheckPath = {
  base: HEALTH_PATH,
};

export const userPath = {
  base: USER_PATH,
};

export const categoriesPath = {
  base: CATEGORIES_PATH,
  paramId: 'categoryId',
};

export const questionsPath = {
  base: QUESTIONS_PATH,
};
export const submitPath = {
  base: SUBMIT_PATH,
};
