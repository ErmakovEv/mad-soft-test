export const enum Cards {
  RADIO,
  CHECKBOX,
  INPUT,
  TEXTAREA,
}

export interface Question {
  id: number;
  type: Cards;
  question: string;
  options?: string[]; // Для вопросов типа RADIO и CHECKBOX
  answer: string | string[]
}

const question: Question[] = [
  {
    id: 0,
    type: Cards.CHECKBOX,
    question: 'Что такое JavaScript?',
    options: [
      'Язык программирования для веб-разработки',
      'Тип данных в HTML',
      'Модель базы данных',
      'Операционная система',
    ],
    answer: []
  },
  {
    id: 1,
    type: Cards.RADIO,
    question: 'Лучший кандидат на вакансию',
    options: ['Вася Пупкин', 'Иванов Олег', 'Евгений Ермаков', 'Den Abramov'],
    answer: ''
  },
  {
    id: 2,
    type: Cards.CHECKBOX,
    question: 'Какие из перечисленных операторов относятся к JavaScript?',
    options: ['if', 'for', 'switch', 'class'],
    answer: []
  },
  {
    id: 3,
    type: Cards.INPUT,
    question: 'Что выведет консоль: console.log(typeof 42)?',
    answer: ''
  },
  {
    id: 4,
    type: Cards.TEXTAREA,
    question: 'Расскажите о принципе работы замыканий в JavaScript.',
    answer: ''
  },
  {
    id: 5,
    type: Cards.RADIO,
    question: 'Какой метод используется для добавления элемента в конец массива в JavaScript?',
    options: ['push()', 'append()', 'add()', 'insert()'],
    answer: ''
  },
  {
    id: 6,
    type: Cards.RADIO,
    question: 'Что делает метод Array.map() в JavaScript?',
    options: [
      'Преобразует каждый элемент массива с помощью указанной функции',
      'Удаляет последний элемент массива',
      'Определяет количество элементов в массиве',
      'Сортирует элементы массива',
    ],
    answer: ''
  },
  {
    id: 7,
    type: Cards.INPUT,
    question: 'Какой будет результат выполнения выражения 5 + "5" в JavaScript?',
    answer: ''
  },
  {
    id: 8,
    type: Cards.TEXTAREA,
    question: 'Что такое объектно-ориентированное программирование (ООП) в JavaScript?',
    answer: ''
  },
  {
    id: 9,
    type: Cards.RADIO,
    question: 'Какой результат typeof null в JavaScript?',
    options: ['"null"', '"object"', '"undefined"', '"number"'],
    answer: ''
  },
  {
    id: 10,
    type: Cards.CHECKBOX,
    question: 'Какие из перечисленных являются фреймворками или библиотеками JavaScript?',
    options: ['React', 'Vue', 'Angular', 'Node.js'],
    answer: []
  },
];

export default question;
