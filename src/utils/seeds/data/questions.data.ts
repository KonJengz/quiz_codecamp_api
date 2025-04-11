import { CreateQuestionDto } from 'src/resources/questions/dto/create-question.dto';

const stringQuestions: Omit<CreateQuestionDto, 'categoryId'>[] = [
  {
    description: `เขียนฟังก์ชันที่รับข้อความ (String) เป็น input และคืนค่าข้อความที่เรียงตัวอักษรกลับจากหลังมาหน้า
ตัวอย่าง Input: "hello"
ตัวอย่าง Output: "olleh"
`,
    solution: '',
    starterCode: '',
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
    testVariable: {
      isFunction: true,
      variableName: 'seed',
    },
    title: 'กลับคำ',
  },
];
