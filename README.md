
# Code Craft - Онлайн редактор кода

Онлайн веб-приложение для написания и выполнения кода на JavaScript и Python. Разработано с использованием React, Monaco Editor и современных веб-технологий.

## Особенности

- Редактирование кода в реальном времени с подсветкой синтаксиса
- Поддержка JavaScript и Python
- Мгновенное выполнение кода
- Чистый и интуитивно понятный интерфейс
- Горячие клавиши для быстрого выполнения (⌘/Ctrl + Enter)
- Система обучения на основе задач с различными программированными упражнениями

## Технологии

- React 18
- TypeScript
- Vite
- Monaco Editor
- MirageJS (для имитации API)
- Tailwind CSS
- Компоненты shadcn/ui

## Структура проекта

```
src/
├── components/
│   ├── Editor/
│   ├── Layout/
│   ├── Results/
│   ├── TaskList/
│   └── ui/
├── hooks/
├── store/
│   └── slices/
│       ├── editorStore.ts
│       ├── executionStore.ts
│       └── taskStore.ts
├── services/
│   └── interpreter/
│       └── pythonInterpreter.ts
├── constants/
└── mocks/
    ├── server.ts
    ├── handlers.ts
    └── types.ts
```

## Начало работы

### Требования

- Node.js (версия 16 или выше)
- npm или yarn

### Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/code-craft.git
cd code-craft
```

2. Установите зависимости:
```bash
npm install
# или
yarn install
```

3. Запустите сервер разработки:
```bash
npm run dev
# или
yarn dev
```

4. Откройте браузер и перейдите по адресу `http://localhost:5173`

### Сборка для продакшн

```bash
npm run build
# или
yarn build
```

## Деплой

Проект настроен для деплоя на Firebase Hosting:

1. Установите Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Войдите в Firebase:
```bash
firebase login
```

3. Инициализируйте проект Firebase:
```bash
firebase init hosting
```

4. Задеплойте на Firebase:
```bash
firebase deploy
```

## Текущие ограничения

### Ограничения Python
- Ограниченная поддержка стандартной библиотеки
- Нет поддержки внешних пакетов/импортов
- Поддержка только базовых арифметических операций и команд print
- Нет поддержки операций с файлами
- Ограниченные возможности обработки ошибок

### Общие ограничения
- Нет сохранения кода между сессиями
- Нет аутентификации пользователей
- Поддержка только одного файла для выполнения
- Нет поддержки многократных файлов или проектов
- Нет ограничения по времени выполнения

## Будущие улучшения

### Функциональные улучшения
- Аутентификация пользователей и профили
- Возможности для обмена кодом
- Сохранение фрагментов кода
- Поддержка нескольких файлов
- Совместная работа в реальном времени
- Поддержка дополнительных языков программирования
- Пользовательские тестовые кейсы
- Настройки форматирования кода
- Темы для редактора

### Технические улучшения
- Исполнение Python через WebAssembly (Pyodide)
- Улучшенная обработка ошибок с номерами строк
- Анализ кода и предложения
- Функция авто-сохранения
- Реализация модульных тестов
- Улучшенная мобильная отзывчивость
- Настройки горячих клавиш
- Полная реализация бэкенда
- Мониторинг производительности

### Образовательные функции
- Дополнительные программные задания
- Уровни сложности задач
- Отслеживание прогресса
- Система достижений
- Возможности для рецензирования кода
- Интерактивные уроки

## Конфигурация ESLint

Для производственных приложений включите lint-правила, учитывающие типы:

1. Настройте параметры парсера:
```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

2. Обновите конфигурацию ESLint:
```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  settings: { react: { version: '18.3' } },
  plugins: {
    react,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

