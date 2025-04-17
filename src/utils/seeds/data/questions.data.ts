import { TestCaseMatcherEnum } from 'src/infrastructure/executor/codeExecutor.service';
import {
  CreateQuestionDto,
  CreateTestCaseSimulWithQuestion,
} from 'src/resources/questions/dto/create-question.dto';
import { TestCaseSchemaClass } from 'src/resources/test-cases/repository/entities/test-cases.entities';

function generateSeedingTestCase(
  testCases: Pick<TestCaseSchemaClass, 'input' | 'expected'>[],
): CreateTestCaseSimulWithQuestion[] {
  return testCases.map((testCase) => ({
    ...testCase,
    matcher: TestCaseMatcherEnum.toBe,
    not: false,
  }));
}

type SeedingQuestions = (Omit<CreateQuestionDto, 'categoryId'> & {
  isFunction: boolean;
  variableName: string;
})[];

export const stringQuestions: SeedingQuestions = [
  {
    // FIRST QUESTION
    title: 'นับจำนวนตัวอักษรทั้งหมดในข้อความ',
    description: `เขียนฟังก์ชันที่รับข้อความและคืนค่าจำนวนตัวอักษรทั้งหมด
ตัวอย่างที่ 1
Input: "hello"
expected: 5
ตัวอย่างที่ 2
Input: "codecamp"
expected: 8
ตัวอย่างที่ 3
Input: "Thailand"
expected: 8
`,
    solution: `
function countLetter(word) {
    return word.length
}`,
    starterCode: `/**
 * @param {String} word
 * @returns {Number} number
 */
    function countLetter() {
    /** Writing your code here */
}
`,
    testCases: [
      {
        input: ['hello'],
        expected: 5,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['codecamp'],
        expected: 8,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['Thailand'],
        expected: 8,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
    ],
    isFunction: true,
    variableName: 'countLetter',
  },
  {
    // SECOND QUESTION
    title: 'กลับคำ',
    description: `เขียนฟังก์ชันที่รับข้อความ (String) เป็น input และคืนค่าข้อความที่เรียงตัวอักษรกลับจากหลังมาหน้า
ตัวอย่าง Input: "hello"
ตัวอย่าง expected: "olleh"
`,
    solution: `function reverseWord(word) {
    return word.split("").reverse().join("")
}
`,
    starterCode: `/**
 * @param {String} word
 * @returns {String} reverseWord
 */
function reverseWord(word) {
    /** Writing your code here */
}
`,
    testCases: [
      {
        input: ['hello'],
        expected: 'olleh',
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['apple'],
        expected: 'elppa',
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['paparazzi'],
        expected: 'izzarapap',
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
    ],
    isFunction: true,
    variableName: 'reverseWord',
  },
  {
    // THIRD QUESTION
    title: 'นับจำนวนสระ',
    description: `คำอธิบาย: เขียนฟังก์ชันที่รับข้อความ (String) เป็น input และนับจำนวนสระ (a, e, i, o, u) ที่อยู่ในข้อความนั้น (ไม่นับตัวพิมพ์ใหญ่/เล็ก)
ตัวอย่างที่ 1:
Input: "Programming"
expected: 3
ตัวอย่างที่ 2:
Input: "javascript"
expected: 3
ตัวอย่างที่ 3:
Input: "developer"
expected: 4
`,
    solution: `function vowelCount(text) {
  const lowerText = text.toLowerCase();
  const vowels = "aeiou";
  let vowelCount = 0;

  for (const char of lowerText) {
    if (vowels.includes(char)) {
      vowelCount++;
    }
  }
  return vowelCount;
}
`,
    starterCode: `/**
 * @param {String} text
 * @returns {Number} number
 */
function vowelCount(text) {
    /** Writing your code here */
}
`,
    testCases: [
      {
        input: ['Programming'],
        expected: 3,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['developer'],
        expected: 4,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['apple'],
        expected: 1,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['crypt'],
        expected: 0,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
    ],
    isFunction: true,
    variableName: 'vowelCount',
  },
  {
    // FOURTH QUESTION
    title: 'นับจำนวนคำ',
    description: `คำอธิบาย: เขียนฟังก์ชันที่รับข้อความ (String) เป็น input และนับจำนวนคำที่อยู่ในข้อความนั้น (โดยถือว่าคำถูกคั่นด้วยช่องว่าง)
ตัวอย่างที่ 1:
 Input: "This is a sample sentence."
expected: 5
ตัวอย่างที่ 2:
 Input: "Internet protocol in OSI model"
expected: 5
ตัวอย่างที่ 3:
 Input: "Integrated Development Environment"
expected: 3
`,
    solution: `function countWords(text) {
  return text.split(" ").length;
}
`,
    starterCode: `/**
 * @param {String} text
 * @returns {Number} number
 */
function countWords(text) {
    /** Writing your code here */
}
`,
    testCases: [
      {
        input: ['This is a sample sentence.'],
        expected: 5,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['Internet protocol in OSI model'],
        expected: 5,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['Integrated Development Environment'],
        expected: 3,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['You should always try to avoid long sentences.'],
        expected: 8,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: [
          'He looked out of the window, noticing the girl who, at that moment, was walking towards the heavy door to the library.',
        ],
        expected: 22,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
    ],
    isFunction: true,
    variableName: 'countWords',
  },
  {
    // FIFTH QUESTION
    title: 'ตรวจสอบ Palindrome',
    description: `คำอธิบาย: เขียนฟังก์ชันที่รับข้อความ (String) เป็น input และตรวจสอบว่าเป็น Palindrome (อ่านจากหน้าไปหลังและหลังมาหน้าได้เหมือนกัน) หรือไม่ (ไม่สนใจตัวพิมพ์ใหญ่/เล็กและช่องว่าง)
ตัวอย่างที่ 1:
Input: "Racecar"
expected: true
ตัวอย่างที่ 2:
Input: "level"
expected: true
ตัวอย่างที่ 3:
Input: "code"
expected: false
`,
    solution: `function isPalindrome(text) {
    return x.toLowerCase().split('').reverse().join('') == x.toLowerCase()
}
`,
    starterCode: `/**
 * @param {String} text
 * @returns {Boolean} result
 */
function isPalindrome(text) {
    /** Writing your code here */
}

`,
    testCases: [
      {
        input: ['Racecar'],
        expected: true,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['level'],
        expected: true,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['code'],
        expected: false,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['hello'],
        expected: false,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['Madam'],
        expected: true,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['DOQxkKXUUxkKXqOd'],
        expected: true,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['qJisnQQNsijq'],
        expected: true,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['F'],
        expected: true,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['EmEduYYTVF'],
        expected: false,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
    ],
    isFunction: true,
    variableName: 'isPalindrome',
  },
  {
    // SIXTH QUESTION
    title: 'แปลงตัวพิมพ์เล็กเป็นตัวพิมพ์ใหญ่',
    description: `คำอธิบาย: เขียนฟังก์ชันที่รับข้อความ (String) เป็น input และแปลงตัวอักษรทุกตัวในข้อความนั้นให้เป็นตัวพิมพ์ใหญ่
ตัวอย่างที่ 1:
Input: "javascript is fun"
expected: "JAVASCRIPT IS FUN"
ตัวอย่างที่ 2:
Input: "React"
expected: "REACT"
ตัวอย่างที่ 3:
Input: "developer"
expected: "DEVELOPER"
`,
    solution: `function convertToUppercase(text) {
    return text.toUpperCase();
}
`,
    starterCode: `/**
 * @param {String} text
 * @returns {String} upperCaseText
 */
function convertToUppercase(text) {
    /** Writing your code here */
}
`,
    testCases: [
      {
        input: ['javascript is fun'],
        expected: 'JAVASCRIPT IS FUN',
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['React'],
        expected: 'REACT',
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['developer'],
        expected: 'DEVELOPER',
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['hello'],
        expected: false,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['Madam'],
        expected: true,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['DOQxkKXUUxkKXqOd'],
        expected: true,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['qJisnQQNsijq'],
        expected: true,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['F'],
        expected: true,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
      {
        input: ['EmEduYYTVF'],
        expected: false,
        matcher: TestCaseMatcherEnum.toBe,
        not: false,
      },
    ],
    isFunction: true,
    variableName: 'convertToUppercase',
  },
];

export const loopQuestions: SeedingQuestions = [
  {
    // FIRST QUESTION
    title: 'นับจำนวนตัวอักษรที่ระบุในข้อความ',
    description: `
เขียนฟังก์ชันที่รับอินพุตสองค่า โดยที่

อินพุตตัวแรกเป็นข้อความ (ให้ถือว่าตัวอักษรเป็นตัวพิมพ์เล็กทั้งหมด (case-insensitive)) (string)

อินพุตตัวที่สองเป็นตัวอักษร (character)

จากนั้นให้นับและส่งกลับจำนวนครั้งที่ตัวอักษรดังกล่าวปรากฏในข้อความ

ตัวอย่าง:

ตัวอย่างที่ 1:

Input: "banana", "a"

expected: 3

ตัวอย่างที่ 2:

Input: "hello world", "l"

expected: 3

ตัวอย่างที่ 3:

Input: "mississippi", "s"

expected: 4
`,
    solution: `function countLetter(word,letter) {
    function countLetter(word,letter) {
    let nums = 0

    for(let l of word) {
        if(l === letter) nums++;
    }

    return nums    
}
}`,
    starterCode: `/**
 * @param {String} word
 * @param {String} letter
 * @returns {Number} number
 */
function countLetter(word,letter) {
    /** Writing your code here */
}
    `,
    testCases: generateSeedingTestCase([
      {
        input: ['banana', 'a'],
        expected: 3,
      },
      {
        input: ['hello world', 'l'],
        expected: 3,
      },
      {
        input: ['Mississippi', 's'],
        expected: 4,
      },
      {
        input: ['orange', 'a'],
        expected: 1,
      },
      {
        input: ['apple', 'p'],
        expected: 2,
      },
    ]),
    isFunction: true,
    variableName: 'countLetter',
  },
  {
    // SECOND QUESTION
    title: 'Fizz Buzz',
    description:
      '\n  Given an integer n, return a string array answer (1-indexed) where:\n\nanswer[i] == "FizzBuzz" if i is divisible by 3 and 5.\nanswer[i] == "Fizz" if i is divisible by 3.\nanswer[i] == "Buzz" if i is divisible by 5.\nanswer[i] == i (as a string) if none of the above conditions are true.\n \n\nExample 1:\n\nInput: n = 3\nexpected: ["1","2","Fizz"]\nExample 2:\n\nInput: n = 5\nexpected: ["1","2","Fizz","4","Buzz"]\nExample 3:\n\nInput: n = 15\nexpected: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]\n  ',
    solution:
      'function fizzBuzz(numbers) {\n    const results = []\n    for(let i = 1; i <= numbers; i++) {\n        let expected = ""\n        if(i % 3 === 0) expected += "Fizz"\n\n        if(i % 5 === 0) expected += "Buzz"\n\n        if(expected.length === 0) expected = i\n        \n        results.push(expected)\n    }\n    return results\n}',
    starterCode:
      '/**\n * Writing a logic inside the function\n * and return the result as an array\n * @param {Number} number\n * @return {Array<number | string>} results\n */\nfunction fizzBuzz(number) {\n    /**Writing your code here */\n}\n',
    testCases: generateSeedingTestCase([
      {
        input: [10],
        expected: [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz'],
      },
      {
        input: [15],
        expected: [
          1,
          2,
          'Fizz',
          4,
          'Buzz',
          'Fizz',
          7,
          8,
          'Fizz',
          'Buzz',
          11,
          'Fizz',
          13,
          14,
          'FizzBuzz',
        ],
      },
      {
        input: [24],
        expected: [
          1,
          2,
          'Fizz',
          4,
          'Buzz',
          'Fizz',
          7,
          8,
          'Fizz',
          'Buzz',
          11,
          'Fizz',
          13,
          14,
          'FizzBuzz',
          16,
          17,
          'Fizz',
          19,
          'Buzz',
          'Fizz',
          22,
          23,
          'Fizz',
        ],
      },
      {
        input: [30],
        expected: [
          1,
          2,
          'Fizz',
          4,
          'Buzz',
          'Fizz',
          7,
          8,
          'Fizz',
          'Buzz',
          11,
          'Fizz',
          13,
          14,
          'FizzBuzz',
          16,
          17,
          'Fizz',
          19,
          'Buzz',
          'Fizz',
          22,
          23,
          'Fizz',
          'Buzz',
          26,
          'Fizz',
          28,
          29,
          'FizzBuzz',
        ],
      },
    ]),
    isFunction: true,
    variableName: 'fizzBuzz',
  },
  {
    // THRID QUESTION
    title: 'Factorial',
    description: `เขียนฟังก์ชันที่รับตัวเลขจำนวนเต็มเป็น input และคำนวณค่า Factorial ของตัวเลขนั้น (ผลคูณของตัวเลขตั้งแต่ 1 ถึงตัวเลขนั้น)
ตัวอย่าง Input: 5
ตัวอย่าง expected: 120 (5 * 4 * 3 * 2 * 1)
`,
    solution: `function factorial(number) {
    let result = 1
  for(let i = 1; i <= number; i ++) {
    result *= i
  }
  return result
}`,
    starterCode: `/**
 * @param {Number} number
 * @returns {Number} calculatedNumber
 */
function factorial(number) {
    /** Writing your code here */
}
`,
    testCases: generateSeedingTestCase([
      {
        input: [5],
        expected: 120,
      },
      {
        input: [8],
        expected: 40320,
      },
      {
        input: [15],
        expected: 1307674368000,
      },
    ]),
    isFunction: true,
    variableName: 'factorial',
  },
  {
    // FOURTH QUESTION
    title: 'หาจำนวนเฉพาะ',
    description: ` เขียนฟังก์ชันที่รับตัวเลขจำนวนเต็มเป็น input และตรวจสอบว่าเป็นจำนวนเฉพาะหรือไม่ จากนั้นให้แสดงผลลัพธ์เป็น true ถ้าเป็นจำนวนเฉพาะ และ false ถ้าไม่ใช่
ตัวอย่างที่ 1:
Input: 17
expected: true
ตัวอย่างที่ 2:
Input: 8
expected: false
ตัวอย่างที่ 3:
Input: 11
expected: true
`,
    solution: `function isPrime(number) {
  if(number <= 1) return false

  for (let i = 2; i < number; i++) {
    if(number % i === 0) return false
  }

  return true
}
`,
    starterCode: `/**
 * @param {Number} number
 * @returns {Boolean} isPrime
 */
 function isPrime(number) {
    /** Writing your code here */
}
`,
    testCases: generateSeedingTestCase([
      {
        input: [17],
        expected: true,
      },
      {
        input: [8],
        expected: false,
      },
      {
        input: [11],
        expected: true,
      },
      {
        input: [18],
        expected: false,
      },
      {
        input: [143],
        expected: false,
      },
      {
        input: [64657551],
        expected: false,
      },
      {
        input: [64657553],
        expected: true,
      },
      {
        input: [0],
        expected: false,
      },
      {
        input: [1],
        expected: false,
      },
    ]),
    isFunction: true,
    variableName: 'isPrime',
  },
];

export const conditionalQuestions: SeedingQuestions = [
  {
    title: 'คำนวณเกรดของนักเรียน',
    description: `เขียน Logic ที่เอาไว้คำนวณเกรดสุดท้ายของนักเรียนใน function finalGrade โดยอิงจากพารามิเตอร์สองตัว คือ คะแนนสอบและจำนวนโปรเจคที่ทำเสร็จ

รับพารามิเตอร์ 2 ตัวดังนี้:

exam: คะแนนสอบ (อยู่ในช่วง 0 ถึง 100)

projects: จำนวนโปรเจคที่ทำเสร็จ (เป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป)

ฟังก์ชันจะต้องคืนค่าตัวเลข (เกรดสุดท้าย) ตามเงื่อนไขดังนี้:

คืนค่า 100 หาก คะแนนสอบมากกว่า 90 หรือ จำนวนโปรเจคที่ทำเสร็จมากกว่า 10

คืนค่า 90 หาก คะแนนสอบมากกว่า 75 และ จำนวนโปรเจคที่ทำเสร็จไม่น้อยกว่า 5

คืนค่า 75 หาก คะแนนสอบมากกว่า 50 และ จำนวนโปรเจคที่ทำเสร็จไม่น้อยกว่า 2

คืนค่า 0 ในกรณีอื่น ๆ

ตัวอย่าง:

ตัวอย่างที่ 1:

Input: 100, 12

expected: 100

ตัวอย่างที่ 2:

Input: 99, 0

expected: 100

ตัวอย่างที่ 3:

Input: 10, 15

expected: 100
`,
    solution: `function finalGrade (exam, projects) {
  let grade = 0
  
  if(exam > 50 && projects >= 2) grade = 75
  if(exam > 75 && projects >= 5) grade = 90
  if(exam > 90 || projects >10) grade = 100
  
  return grade
}`,
    starterCode: `/**
 * @param {Number} exam
 * @param {Number} project
 * @returns {Number} grade
 */
    function finalGrade (exam, projects) {
     /** Writing your code here */
}`,
    testCases: generateSeedingTestCase([
      {
        input: [100, 12],
        expected: 100,
      },
      {
        input: [99, 0],
        expected: 100,
      },
      {
        input: [10, 15],
        expected: 100,
      },
      {
        input: [85, 5],
        expected: 90,
      },
      {
        input: [55, 3],
        expected: 75,
      },
      {
        input: [55, 0],
        expected: 0,
      },
      {
        input: [20, 2],
        expected: 0,
      },
    ]),
    isFunction: true,
    variableName: 'finalGrade',
  },
];

export const numberQuestions: SeedingQuestions = [
  {
    // FIRST QUESTION
    title: 'แปลงอุณหภูมิ',
    description: ` เขียนฟังก์ชันที่รับอุณหภูมิเป็นองศาเซลเซียส (Celsius) เป็น input และแปลงเป็นองศาฟาเรนไฮต์ (Fahrenheit) โดยใช้สูตร: F = (C * 9/5) + 32
ตัวอย่างที่ 1:
Input: 25
expected: 77
ตัวอย่างที่ 2:
Input: 37
expected: 98.6
ตัวอย่างที่ 3:
Input: 40
expected: 104
`,
    solution: `function convertTemp(degree) {
    return  (degree * 9 / 5) + 32
}`,
    starterCode: `/**
 * @param {Number} degree
 * @returns {Number} convertedDegree
 */
   function convertTemp(degree) {
    /** Writing your code here */
}
`,
    testCases: generateSeedingTestCase([
      {
        input: [25],
        expected: 77,
      },
      {
        input: [37],
        expected: 98.6,
      },
      {
        input: [40],
        expected: 104,
      },
    ]),
    isFunction: true,
    variableName: 'convertTemp',
  },
  {
    // SECOND QUESTION
    title: 'ตรวจสอบเลขคู่หรือเลขคี่',
    description: `รับค่าตัวเลขหนึ่งตัว และให้ return ค่าออกมาเป็น "Even" ถ้าตัวเลขนั้นเป็นเลขคู่ และ "Odd" ถ้าตัวเลขเป็นเลขคี่
ตัวอย่างที่ 1:
Input: 7
expected: "Odd"
ตัวอย่างที่ 2:
Input: 8
expected: "Even"
ตัวอย่างที่ 3:
Input: -2
expected: "Even"
`,
    solution: `function checkEvenOdd(number) {
  return number % 2 === 0 ? "Even" : "Odd"
}
`,
    starterCode: `/**
 * @param {Number} number
 * @returns {"Even" | "Odd"} numberType
 */
   function checkEvenOdd (number) {
    /** Writing your code here */
}
`,
    testCases: generateSeedingTestCase([
      {
        input: [7],
        expected: 'Odd',
      },
      {
        input: [8],
        expected: 'Even',
      },
      {
        input: [-2],
        expected: 'Even',
      },
      {
        input: [144],
        expected: 'Even',
      },
      {
        input: [577],
        expected: 'Odd',
      },
    ]),
    isFunction: true,
    variableName: 'checkEvenOdd',
  },
  {
    // THIRD QUESTION
    title: 'แปลงวินาทีเป็น ชั่วโมง:นาที:วินาที',
    description: `เขียนฟังก์ชันที่รับวินาทีเป็นจำนวนเต็ม แล้วแปลงเป็นเวลารูปแบบ ชั่วโมง:นาที:วินาที
ตัวอย่างที่ 1:
Input: 3661
expected: "1:1:1"
ตัวอย่างที่ 2:
Input: 75
expected: "0:1:15"
ตัวอย่างที่ 3:
Input: 12345
expected: "3:25:45"
`,
    solution: `function convertSecondsToTime(seconds) { 
  const hours = Math.floor(seconds / 3600);
  const remainingSecondsAfterHours = seconds % 3600;
  const minutes = Math.floor(remainingSecondsAfterHours / 60);
  const secs = remainingSecondsAfterHours % 60;

  return \`\$\{hours}:\$\{minutes}:\$\{secs}\`;
}
`,
    starterCode: `/**
 * @param {Number} degree
 * @returns {Number} convertedDegree
 */
   function convertSecondsToTime(seconds) {
    /** Writing your code here */
}
`,
    testCases: generateSeedingTestCase([
      {
        input: [3661],
        expected: '1:1:1',
      },
      {
        input: [75],
        expected: '0:1:15',
      },
      {
        input: [12345],
        expected: '3:25:45',
      },
      {
        input: [5768],
        expected: '1:36:8',
      },
      {
        input: [56789],
        expected: '15:46:29',
      },
      {
        input: [1],
        expected: '0:0:1',
      },
      {
        input: [61],
        expected: '0:1:1',
      },
    ]),
    isFunction: true,
    variableName: 'convertSecondsToTime',
  },
];
