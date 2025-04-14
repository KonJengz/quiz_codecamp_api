const AUTH_PATH = 'auth';
const USER_PATH = 'users';
const CATEGORIES_PATH = 'categories';
const QUESTIONS_PATH = 'questions';
const SUBMISSIONS_PATH = 'submissions';
const HEALTH_PATH = 'healthcheck';
const EXECUTE_PATH = 'executes';
const ME = 'me';

export const authPath = {
  base: AUTH_PATH,
  login: '/login',
};

export const healthCheckPath = {
  base: HEALTH_PATH,
};

export const userPath = {
  base: USER_PATH,
  me: ME,
};

export const categoriesPath = {
  base: CATEGORIES_PATH,
  me: ME,
  queries: {
    isChallenge: 'cha',
  },
  paramId: 'categoryId',
};

export const questionsPath = {
  base: QUESTIONS_PATH,
  idAndMe: `:questionId/${SUBMISSIONS_PATH}/${ME}`,
  getById: ':questionId',
  paramId: 'questionId',
  category: `${categoriesPath.base}/:${categoriesPath.paramId}`,
  categoryParam: `${categoriesPath.paramId}`,
};

export const submissionsPath = {
  base: SUBMISSIONS_PATH,
};

export const executesPath = {
  base: EXECUTE_PATH,
};
