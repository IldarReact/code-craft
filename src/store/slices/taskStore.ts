import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Task } from '../types';

interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  languageFilter: string | null;
  isTaskListCollapsed: boolean;
  setCurrentTask: (task: Task) => void;
  toggleTaskCollapse: (taskId: string) => void;
  toggleTaskListCollapse: () => void;
  setLanguageFilter: (language: string | null) => void;
}

const defaultTasks: Task[] = [
  {
    id: 'py1',
    title: 'Сложение чисел',
    description: 'Даны две переменные x и y. Выведите их сумму.',
    language: 'python',
    difficulty: 'easy',
    initialCode: 'x = 20\ny = 30\n\n# Выведите сумму x и y\n',
    isCollapsed: false
  },
  {
    id: 'py2',
    title: 'Умножение чисел',
    description: 'Даны две переменные a и b. Выведите их произведение.',
    language: 'python',
    difficulty: 'easy',
    initialCode: 'a = 10\nb = 5\n\n# Выведите произведение a и b\n',
    isCollapsed: true
  },
  {
    id: 'js1',
    title: 'Проверка на четность',
    description: 'Напишите функцию, которая определяет, является ли число четным.',
    language: 'javascript',
    difficulty: 'easy',
    initialCode: 'function isEven(num) {\n  // Ваш код здесь\n}\n\nconsole.log(isEven(4));\nconsole.log(isEven(7));',
    isCollapsed: true
  },
  {
    id: 'js2',
    title: 'Реверс строки',
    description: 'Напишите функцию, которая переворачивает строку.',
    language: 'javascript',
    difficulty: 'easy',
    initialCode: 'function reverseString(str) {\n  // Ваш код здесь\n}\n\nconsole.log(reverseString("hello"));',
    isCollapsed: true
  }
];

export const useTaskStore = create<TaskState>()(
  immer((set) => ({
    tasks: defaultTasks,
    currentTask: null,
    languageFilter: null,
    isTaskListCollapsed: false,
    setCurrentTask: (task) => set((state) => {
      state.currentTask = task;
    }),
    toggleTaskCollapse: (taskId) => set((state) => {
      const task = state.tasks.find(t => t.id === taskId);
      if (task) {
        task.isCollapsed = !task.isCollapsed;
      }
    }),
    toggleTaskListCollapse: () => set((state) => {
      state.isTaskListCollapsed = !state.isTaskListCollapsed;
    }),
    setLanguageFilter: (language) => set((state) => {
      state.languageFilter = language;
    })
  }))
);