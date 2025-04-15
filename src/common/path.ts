const AUTH_PATH = 'auth';
const USER_PATH = 'users';
const CATEGORIES_PATH = {
  base: 'categories',
  paramId: 'categoryId',
};
const QUESTIONS_PATH = { base: 'questions', paramId: 'questionId' };
const SUBMISSIONS_PATH = 'submissions';
const HEALTH_PATH = 'healthcheck';
const EXECUTE_PATH = 'executes';
export const ME = 'me';

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
  paramId: 'userId',
};

export const categoriesPath = {
  base: CATEGORIES_PATH.base,
  me: ME,
  queries: {
    isChallenge: 'cha',
  },
  paramId: CATEGORIES_PATH.paramId,
  getByIdAndMe: `:${CATEGORIES_PATH.paramId}/${ME}`,
};

export const questionsPath = {
  base: QUESTIONS_PATH.base,
  idAndMe: `:${QUESTIONS_PATH.paramId}/${SUBMISSIONS_PATH}/${ME}`,
  getById: `:${QUESTIONS_PATH.paramId}`,
  paramId: QUESTIONS_PATH.paramId,
  category: `${categoriesPath.base}/:${categoriesPath.paramId}`,
  categoryParam: `${categoriesPath.paramId}`,
};

export const submissionsPath = {
  base: SUBMISSIONS_PATH,
};

export const executesPath = {
  base: EXECUTE_PATH,
};
