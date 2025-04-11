import { ITestCase, TestCaseMatcherEnum } from './codeExecutor.service';

export class CodeAssertionService {
  public static formatFailedAssertionStr = `
  "Assertion failed\\nExpected: \${JSON.stringify(expected)}\\nActual: \${JSON.stringify(actual)}" 
    `;

  public static baseIsToBe = `
    function isToBe(expected,actual) {
        if(!expected || !actual) return false

        return expected === actual
    }
  `;

  public static baseDeepEqual = `
  function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  if (typeof a !== typeof b) {
    return false;
  }

  // Explicitly check mismatch between array vs. object
  const aIsArray = Array.isArray(a);
  const bIsArray = Array.isArray(b);
  if (aIsArray !== bIsArray) {
    // one is array, the other isn't
    return false;
  }

  // If both are arrays
  if (aIsArray && bIsArray) {
    if (a.length !== b.length) {
      return false;
    }
    return a.every((val, index) => deepEqual(val, b[index]));
  }

  // If both are objects
  if (typeof a === 'object') {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
      return false;
    }
    return aKeys.every(
      key => b.hasOwnProperty(key) && deepEqual(a[key], b[key])
    );
  }

  // For anything else (numbers, strings, booleans, etc.)
  return false;
}
`;

  public static toBe = `
        result.passed = isToBe(expected,actual) 
        `;

  public static toBeDeepEqual = `
    const passed = deepEqual(expected,actual)

    if(!passed) {
        result.error = ${CodeAssertionService.formatFailedAssertionStr}
    }
    result.passed = passed
  `;

  public static setupAssertionFramework = (
    matcherEnum: typeof TestCaseMatcherEnum,
  ): string => `
    ${CodeAssertionService.baseIsToBe}
    ${CodeAssertionService.baseDeepEqual}


    function expect(actual) {
      let passed;
      const result = {
        passed,
        detail: {
          actual,
          expected: '',
        },
        error: null,
      };
      return {
        ${matcherEnum.toBe}: (expected) => {
          result.detail.expected = expected;
          ${CodeAssertionService.toBe};
          return result;
        },
        ${matcherEnum.toBeDeepEqual}: (expected) => {
          result.detail.expected = expected;
          ${CodeAssertionService.toBeDeepEqual};
          return result;
        },
      };
    }
    `;

  public static generateAssertionCode(testCase: ITestCase, actual: unknown) {
    if (typeof testCase.expected === 'object')
      testCase.expected = JSON.stringify(testCase.expected);
    return `expect(${actual}).${testCase.matcher}(${testCase.expected})`;
  }
}
