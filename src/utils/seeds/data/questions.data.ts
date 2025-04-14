import { CreateQuestionDto } from 'src/resources/questions/dto/create-question.dto';
import { QuestionSchemaClass } from 'src/resources/questions/repository/entities/questions.entity';

type SeedingQuestions = (Omit<
  CreateQuestionDto,
  'categoryId' | 'testVariable'
> & { isFunction: boolean; variableName: string })[];

export const stringQuestions: SeedingQuestions = [
  {
    // FIRST QUESTION
    title: 'นับจำนวนตัวอักษรทั้งหมดในข้อความ',
    description: `เขียนฟังก์ชันที่รับข้อความและคืนค่าจำนวนตัวอักษรทั้งหมด
ตัวอย่างที่ 1
Input: "hello"
Output: 5
ตัวอย่างที่ 2
Input: "codecamp"
Output: 8
ตัวอย่างที่ 3
Input: "Thailand"
Output: 8
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
        output: 5,
      },
      {
        input: ['codecamp'],
        output: 8,
      },
      {
        input: ['Thailand'],
        output: 8,
      },
    ],
    isFunction: true,
    variableName: 'countLetter',
  },
  {
    // SECOND QUESTION
    description: `เขียนฟังก์ชันที่รับข้อความ (String) เป็น input และคืนค่าข้อความที่เรียงตัวอักษรกลับจากหลังมาหน้า
ตัวอย่าง Input: "hello"
ตัวอย่าง Output: "olleh"
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
        output: 'olleh',
      },
      {
        input: ['apple'],
        output: 'elppa',
      },
      {
        input: ['paparazzi'],
        output: 'izzarapap',
      },
    ],
    isFunction: true,
    variableName: 'reverseWord',
    title: 'กลับคำ',
  },
];

export const loopQuestions: SeedingQuestions = [
  {
    title: 'Fizz Buzz',
    description:
      '\n  Given an integer n, return a string array answer (1-indexed) where:\n\nanswer[i] == "FizzBuzz" if i is divisible by 3 and 5.\nanswer[i] == "Fizz" if i is divisible by 3.\nanswer[i] == "Buzz" if i is divisible by 5.\nanswer[i] == i (as a string) if none of the above conditions are true.\n \n\nExample 1:\n\nInput: n = 3\nOutput: ["1","2","Fizz"]\nExample 2:\n\nInput: n = 5\nOutput: ["1","2","Fizz","4","Buzz"]\nExample 3:\n\nInput: n = 15\nOutput: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]\n  ',
    solution:
      'function fizzBuzz(numbers) {\n    const results = []\n    for(let i = 1; i <= numbers; i++) {\n        let output = ""\n        if(i % 3 === 0) output += "Fizz"\n\n        if(i % 5 === 0) output += "Buzz"\n\n        if(output.length === 0) output = i\n        \n        results.push(output)\n    }\n    return results\n}',
    starterCode:
      '/**\n * Writing a logic inside the function\n * and return the result as an array\n * @param {Number} number\n * @return {Array<number | string>} results\n */\nfunction fizzBuzz(number) {\n    /**Writing your code here */\n}\n',
    testCases: [
      {
        input: [10],
        output: [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz'],
      },
      {
        input: [15],
        output: [
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
        output: [
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
        output: [
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
    ],
    isFunction: true,
    variableName: 'fizzBuzz',
  },
  {
    title: 'Factorial',
    description: `เขียนฟังก์ชันที่รับตัวเลขจำนวนเต็มเป็น input และคำนวณค่า Factorial ของตัวเลขนั้น (ผลคูณของตัวเลขตั้งแต่ 1 ถึงตัวเลขนั้น)
ตัวอย่าง Input: 5
ตัวอย่าง Output: 120 (5 * 4 * 3 * 2 * 1)
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
    testCases: [
      {
        input: [5],
        output: 120,
      },
      {
        input: [8],
        output: 40320,
      },
      {
        input: [15],
        output: 1307674368000,
      },
    ],
    isFunction: true,
    variableName: 'factorial',
  },
];

export const conditionalQuestions: SeedingQuestions = [
  {
    title: 'Replace all vowel to exclamation mark in the sentence',
    description: `Replace all vowel to exclamation mark in the sentence. aeiouAEIOU is vowel.

Examples
"Hi!" --> "H!!"
"!Hi! Hi!" --> "!H!! H!!"
"aeiou" --> "!!!!!"
"ABCDE" --> "!BCD!"`,
    solution: '',
    starterCode: '',
    testCases: [],
    isFunction: true,
    variableName: '',
  },
];
