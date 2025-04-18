const AUTH_PATH = 'auth';
const USER_PATH = 'users';
const CATEGORIES_PATH = {
  base: 'categories',
  paramId: 'categoryId',
};
const QUESTIONS_PATH = { base: 'questions', paramId: 'questionId' };
const TESTCASES_PATH = { base: 'test-cases' };
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
  getByIdAndQuestions: `:${CATEGORIES_PATH.paramId}/questions/`,
  getByIdAndQuestionsIncludeMe: `:${CATEGORIES_PATH.paramId}/questions/${ME}`,
  updateStatus: `:${CATEGORIES_PATH.paramId}/status`,
};

export const questionsPath = {
  base: QUESTIONS_PATH.base,
  idAndMe: `:${QUESTIONS_PATH.paramId}/${SUBMISSIONS_PATH}/${ME}`,
  getById: `:${QUESTIONS_PATH.paramId}`,
  paramId: QUESTIONS_PATH.paramId,
  category: `${categoriesPath.base}/:${categoriesPath.paramId}`,
  categoryParam: `${categoriesPath.paramId}`,
  updateStatus: `:${QUESTIONS_PATH.paramId}/status`,
};

export const submissionsPath = {
  base: SUBMISSIONS_PATH,
};

export const executesPath = {
  base: EXECUTE_PATH,
};

export const testCasesPath = {
  base: TESTCASES_PATH.base,
  matchers: `matchers`,
};
