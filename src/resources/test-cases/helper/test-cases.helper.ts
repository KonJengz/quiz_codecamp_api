import { isObject } from 'class-validator';
import { TestCaseMatcherEnum } from 'src/infrastructure/executor/codeExecutor.service';
import { CreateQuestionDto } from 'src/resources/questions/dto/create-question.dto';

export type TestCaseValidatedResult = {
  isValid: boolean;
  detail: string;
};

export function createTestCaseHelper(
  testCases: CreateQuestionDto['testCases'],
  isFuction: CreateQuestionDto['isFunction'],
  solution: CreateQuestionDto['solution'],
): TestCaseValidatedResult {
  if (isFuction) {
    return validateIsFunctionTestCase(testCases);
  }

  return validateNotFunctionTestCase(testCases, solution);
}

function validateIsFunctionTestCase(
  testCases: CreateQuestionDto['testCases'],
): TestCaseValidatedResult {
  const result: TestCaseValidatedResult = {
    detail: '',
    isValid: true,
  };

  const validator = {
    'input is not an array': (input) => Array.isArray(input),
    'output is undefined': (input) => input.output !== undefined,
  };

  for (const [index, testCase] of Object.entries(testCases)) {
    let isValid = true;
    for (let [msg, fn] of Object.entries(validator)) {
      isValid = fn(testCase);

      if (!isValid) {
        result.detail = `Test Case : ${index + 1} ${msg}`;
        break;
      }
    }

    if (!isValid) {
      result.isValid = isValid;
      return result;
    }
  }

  return result;
}

function validateNotFunctionTestCase(
  testCases: CreateQuestionDto['testCases'],
  solution: CreateQuestionDto['solution'],
): TestCaseValidatedResult {
  const allJSTypes = [
    'string',
    'number',
    'bigint',
    'boolean',
    'symbol',
    'undefined',
    'object',
    'function',
  ];
  const result: TestCaseValidatedResult = {
    detail: '',
    isValid: true,
  };

  for (let [index, testCase] of Object.entries(testCases)) {
    const { matcher, variable, expected } = testCase;

    if (expected === undefined) {
      result.isValid = false;
      result.detail = `Test case ${index} does not provide test case expected.`;
      return result;
    }

    if (!matcher) {
      result.isValid = false;
      result.detail = `Test case ${index} does not provide test matcher.`;
      return result;
    }

    switch (matcher) {
      case TestCaseMatcherEnum.toHaveType:
        if (!allJSTypes.includes(expected)) {
          result.isValid = false;
          result.detail = `Test case ${index} does not provide correct type for output.\n Provided: ${expected}. Can be: ${allJSTypes.join(', ')}`;
          return result;
        }
        break;
      case TestCaseMatcherEnum.toBeDeepEqual:
        if (!Array.isArray(expected) || !isObject(expected)) {
          result.isValid = false;
          result.detail = `Test case ${index} does not provide correct type for output.\n Provided: ${expected}. Can be: Array and Object`;
          return result;
        }
        break;
    }

    if (variable) {
      if (!solution.includes(variable)) {
        result.isValid = false;
        result.detail = `Test case ${index} provide variable: ${variable} but not find the exact variable in solution \n Solution: \n ${solution}`;
        return result;
      }
    }
  }
  return result;
}
