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

  public static baseHaveType = `
  function isHaveType(actual, expectType) {
    return typeof actual === expectType
  }
  `;

  public static toBe = `
  function toBe(not = false) {
    let passed =isToBe(expected,actual) 

    if(not) passed = !passed

    return passed 
  }
        `;

  public static toBeDeepEqual = `
  function toBeDeepEqual(not = false) {
    let passed = deepEqual(expected,actual)
    
    if(!passed) {
      result.error = ${CodeAssertionService.formatFailedAssertionStr}
    }

    if(not) passed = !passed

    return passed 
  }
  `;

  public static toHaveType = `
  function toHaveType(not = false) {
    let passed = isHaveType(actual,expected) 

    if(not) passed = !passed

    return passed
  }
  `;

  public static setupAssertionFramework = (
    matcherEnum: typeof TestCaseMatcherEnum,
  ): string => `
    ${CodeAssertionService.baseIsToBe}
    ${CodeAssertionService.baseDeepEqual}
    ${CodeAssertionService.baseHaveType}

    function expect(actual) {
      let passed;

      const result = {
        passed,
        detail: {
          actual:  actual,
          expected: '',
          describe: "",
        },
        error: null,
      };
      return {
           ${CodeAssertionService.allMatcher(matcherEnum, false)},
            ${matcherEnum.not}: () => ({ 
              ${CodeAssertionService.allMatcher(matcherEnum, true)}
            })
      };
    }
    `;

  private static allMatcher(
    matcherEnum: typeof TestCaseMatcherEnum,
    not = false,
  ): string {
    const notText = `${not ? ' not ' : ' '}`;

    const matcherArr: {
      key: TestCaseMatcherEnum;
      func: string;
      verb: string;
    }[] = [
      {
        key: matcherEnum.toBe,
        func: CodeAssertionService.toBe,
        verb: TestCaseMatcherEnum.toBeStr,
      },
      {
        key: matcherEnum.toBeDeepEqual,
        func: CodeAssertionService.toBeDeepEqual,
        verb: TestCaseMatcherEnum.toBeDeepEqualStr,
      },
      {
        key: matcherEnum.toHaveType,
        func: CodeAssertionService.toHaveType,
        verb: TestCaseMatcherEnum.toHaveTypeStr,
      },
    ];

    return matcherArr
      .map(
        ({ func, key, verb }) => `["${key}"] : (expected) => {
      result.detail.expected = expected;
      result.passed = (${func})(${not});
      result.detail.not = ${not};
      result.detail.matcher = "${key}";
    if (!result.passed) {
      result.error = ${CodeAssertionService.formatFailedAssertionStr};
    }
    result.describe = "expect " + result.detail.actual + "${notText}${verb} " + expected


    return result;
    }`,
      )
      .join(', \n');

    //   [${matcherEnum.toBe}]: (expected) => {
    //     result.detail.expected = expected;
    //     result.passed = ${CodeAssertionService.toBe}(${not});
    //     if (!result.passed) {
    //       result.error = ${CodeAssertionService.formatFailedAssertionStr};
    //     }
    //     result.describe = "expect " + actual + "to${not ? ' not ' : ' '} ${matcherEnum.toBeStr} " + expected

    //     ${not ? 'result.not = true' : ''}

    //     return result;
    //   },
    //   [${matcherEnum.toBeDeepEqual}]: (expected) => {
    //     result.detail.expected = expected;
    //     result.passed = ${CodeAssertionService.toBeDeepEqual}(${not});
    //     result.describe = \`expect \$\{actual} to${not ? ' not ' : ' '}${matcherEnum.toBeDeepEqualStr} \$\{expected} \`
    //     if (!result.passed) {
    //       result.error = ${CodeAssertionService.formatFailedAssertionStr};
    //     }

    //     return result;
    //   },
    //     [${matcherEnum.toHaveType}]: (expected) => {
    //     result.detail.expected = expected;
    //     result.passed = ${CodeAssertionService.toHaveType}(${not});
    //     result.describe = \`expect \$\{actual} to${not ? ' not ' : ' '}${matcherEnum.toBeDeepEqualStr} \$\{expected} \`
    //     if (!result.passed) {
    //       result.error = ${CodeAssertionService.formatFailedAssertionStr};
    //     }

    //     return result;
    //   },
    // `;
  }

  public static generateAssertionCode(testCase: ITestCase, actual: unknown) {
    let { expected, expect, matcher, not } = testCase;

    if (expect) {
      actual = expect;
    }

    // actual = JSON.stringify(actual);
    if (typeof expected === 'object') {
      expected = JSON.stringify(expected);
    } else if (typeof expected === 'string') {
      // Wrap string values in quotes
      expected = `"${expected}"`;
    }
    return `expect(${actual}).${not ? `${TestCaseMatcherEnum.not}().` : ''}${matcher}(${expected})`;
  }
}
