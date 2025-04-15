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
    title: 'กลับคำ',
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
  },
  {
    // THIRD QUESTION
    title: 'นับจำนวนสระ',
    description: `คำอธิบาย: เขียนฟังก์ชันที่รับข้อความ (String) เป็น input และนับจำนวนสระ (a, e, i, o, u) ที่อยู่ในข้อความนั้น (ไม่นับตัวพิมพ์ใหญ่/เล็ก)
ตัวอย่างที่ 1:
Input: "Programming"
Output: 3
ตัวอย่างที่ 2:
Input: "javascript"
Output: 3
ตัวอย่างที่ 3:
Input: "developer"
Output: 4
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
        output: 3,
      },
      {
        input: ['developer'],
        output: 4,
      },
      {
        input: ['apple'],
        output: 1,
      },
      {
        input: ['crypt'],
        output: 0,
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
Output: 5
ตัวอย่างที่ 2:
 Input: "Internet protocol in OSI model"
Output: 5
ตัวอย่างที่ 3:
 Input: "Integrated Development Environment"
Output: 3
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
        output: 5,
      },
      {
        input: ['Internet protocol in OSI model'],
        output: 5,
      },
      {
        input: ['Integrated Development Environment'],
        output: 3,
      },
      {
        input: ['You should always try to avoid long sentences.'],
        output: 8,
      },
      {
        input: [
          'He looked out of the window, noticing the girl who, at that moment, was walking towards the heavy door to the library.',
        ],
        output: 22,
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
Output: true
ตัวอย่างที่ 2:
Input: "level"
Output: true
ตัวอย่างที่ 3:
Input: "code"
Output: false
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
        output: true,
      },
      {
        input: ['level'],
        output: true,
      },
      {
        input: ['code'],
        output: false,
      },
      {
        input: ['hello'],
        output: false,
      },
      {
        input: ['Madam'],
        output: true,
      },
      {
        input: ['DOQxkKXUUxkKXqOd'],
        output: true,
      },
      {
        input: ['qJisnQQNsijq'],
        output: true,
      },
      {
        input: ['F'],
        output: true,
      },
      {
        input: ['EmEduYYTVF'],
        output: false,
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
Output: "JAVASCRIPT IS FUN"
ตัวอย่างที่ 2:
Input: "React"
Output: "REACT"
ตัวอย่างที่ 3:
Input: "developer"
Output: "DEVELOPER"
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
        output: 'JAVASCRIPT IS FUN',
      },
      {
        input: ['React'],
        output: 'REACT',
      },
      {
        input: ['developer'],
        output: 'DEVELOPER',
      },
      {
        input: ['hello'],
        output: false,
      },
      {
        input: ['Madam'],
        output: true,
      },
      {
        input: ['DOQxkKXUUxkKXqOd'],
        output: true,
      },
      {
        input: ['qJisnQQNsijq'],
        output: true,
      },
      {
        input: ['F'],
        output: true,
      },
      {
        input: ['EmEduYYTVF'],
        output: false,
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

Output: 3

ตัวอย่างที่ 2:

Input: "hello world", "l"

Output: 3

ตัวอย่างที่ 3:

Input: "mississippi", "s"

Output: 4
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
    testCases: [
      {
        input: ['banana', 'a'],
        output: 3,
      },
      {
        input: ['hello world', 'l'],
        output: 3,
      },
      {
        input: ['Mississippi', 's'],
        output: 4,
      },
      {
        input: ['orange', 'a'],
        output: 1,
      },
      {
        input: ['apple', 'p'],
        output: 2,
      },
    ],
    isFunction: true,
    variableName: 'countLetter',
  },
  {
    // SECOND QUESTION
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
    // THRID QUESTION
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
  {
    // FOURTH QUESTION
    title: 'หาจำนวนเฉพาะ',
    description: ` เขียนฟังก์ชันที่รับตัวเลขจำนวนเต็มเป็น input และตรวจสอบว่าเป็นจำนวนเฉพาะหรือไม่ จากนั้นให้แสดงผลลัพธ์เป็น true ถ้าเป็นจำนวนเฉพาะ และ false ถ้าไม่ใช่
ตัวอย่างที่ 1:
Input: 17
Output: true
ตัวอย่างที่ 2:
Input: 8
Output: false
ตัวอย่างที่ 3:
Input: 11
Output: true
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
    testCases: [
      {
        input: [17],
        output: true,
      },
      {
        input: [8],
        output: false,
      },
      {
        input: [11],
        output: true,
      },
      {
        input: [18],
        output: false,
      },
      {
        input: [143],
        output: false,
      },
      {
        input: [64657551],
        output: false,
      },
      {
        input: [64657553],
        output: true,
      },
      {
        input: [0],
        output: false,
      },
      {
        input: [1],
        output: false,
      },
    ],
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

Output: 100

ตัวอย่างที่ 2:

Input: 99, 0

Output: 100

ตัวอย่างที่ 3:

Input: 10, 15

Output: 100
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
    testCases: [
      {
        input: [100, 12],
        output: 100,
      },
      {
        input: [99, 0],
        output: 100,
      },
      {
        input: [10, 15],
        output: 100,
      },
      {
        input: [85, 5],
        output: 90,
      },
      {
        input: [55, 3],
        output: 75,
      },
      {
        input: [55, 0],
        output: 0,
      },
      {
        input: [20, 2],
        output: 0,
      },
    ],
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
Output: 77
ตัวอย่างที่ 2:
Input: 37
Output: 98.6
ตัวอย่างที่ 3:
Input: 40
Output: 104
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
    testCases: [
      {
        input: [25],
        output: 77,
      },
      {
        input: [37],
        output: 98.6,
      },
      {
        input: [40],
        output: 104,
      },
    ],
    isFunction: true,
    variableName: 'convertTemp',
  },
  {
    // SECOND QUESTION
    title: 'ตรวจสอบเลขคู่หรือเลขคี่',
    description: `รับค่าตัวเลขหนึ่งตัว และให้ return ค่าออกมาเป็น "Even" ถ้าตัวเลขนั้นเป็นเลขคู่ และ "Odd" ถ้าตัวเลขเป็นเลขคี่
ตัวอย่างที่ 1:
Input: 7
Output: "Odd"
ตัวอย่างที่ 2:
Input: 8
Output: "Even"
ตัวอย่างที่ 3:
Input: -2
Output: "Even"
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
    testCases: [
      {
        input: [7],
        output: 'Odd',
      },
      {
        input: [8],
        output: 'Even',
      },
      {
        input: [-2],
        output: 'Even',
      },
      {
        input: [144],
        output: 'Even',
      },
      {
        input: [577],
        output: 'Odd',
      },
    ],
    isFunction: true,
    variableName: 'checkEvenOdd',
  },
  {
    // THIRD QUESTION
    title: 'แปลงวินาทีเป็น ชั่วโมง:นาที:วินาที',
    description: `เขียนฟังก์ชันที่รับวินาทีเป็นจำนวนเต็ม แล้วแปลงเป็นเวลารูปแบบ ชั่วโมง:นาที:วินาที
ตัวอย่างที่ 1:
Input: 3661
Output: "1:1:1"
ตัวอย่างที่ 2:
Input: 75
Output: "0:1:15"
ตัวอย่างที่ 3:
Input: 12345
Output: "3:25:45"
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
    testCases: [
      {
        input: [3661],
        output: '1:1:1',
      },
      {
        input: [75],
        output: '0:1:15',
      },
      {
        input: [12345],
        output: '3:25:45',
      },
      {
        input: [5768],
        output: '1:36:8',
      },
      {
        input: [56789],
        output: '15:46:29',
      },
      {
        input: [1],
        output: '0:0:1',
      },
      {
        input: [61],
        output: '0:1:1',
      },
    ],
    isFunction: true,
    variableName: 'convertSecondsToTime',
  },
];
