import { Response } from 'miragejs';
import { AppSchema, ExecuteRequest, HandlerRequest } from './types';

const createPythonInterpreter = () => {
  const evaluateExpression = (expression: string, variables: Map<string, any>): any => {
    try {
      let processedExpression = expression;
      for (const [varName, value] of variables.entries()) {
        const regex = new RegExp(`\\b${varName}\\b`, 'g');
        processedExpression = processedExpression.replace(regex, String(value));
      }
      return eval(processedExpression); // Используем eval для выражений
    } catch (err) {
      return expression; // Вернуть оригинальное выражение, если ошибка
    }
  };

  const execute = (code: string): string => {
    const localOutput: string[] = [];
    const localVariables = new Map<string, any>();

    for (const line of code.split('\n')) {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#')) continue;

      // Обработка команды print
      if (trimmedLine.startsWith('print(')) {
        const match = trimmedLine.match(/print\((.*)\)/);
        if (match) {
          const args = match[1];
          const printResult = evaluateExpression(args, localVariables);

          // Логирование результата print для отладки
          if (printResult !== undefined && printResult !== null) {
            localOutput.push(String(printResult));
          } else {
            localOutput.push('No output for print');
          }
        }
        continue;
      }

      // Обработка присваивания
      if (trimmedLine.includes('=') && !trimmedLine.includes('==')) {
        const [varName, ...rest] = trimmedLine.split('=');
        const expression = rest.join('=').trim();
        localVariables.set(varName.trim(), evaluateExpression(expression, localVariables));
        continue;
      }

      // Остальные выражения
      const result = evaluateExpression(trimmedLine, localVariables);
      
      if (result !== undefined && result !== null) {
        localOutput.push(String(result));
      }
    }

    return localOutput.length > 0 ? localOutput.join('\n') : 'No output';
  };

  return {
    execute
  };
};

const executeHandler = async (_schema: AppSchema, request: HandlerRequest) => {
  let body: ExecuteRequest;

  try {
    if (!request.requestBody) {
      return new Response(400, {}, { error: 'Request body is required' });
    }

    body = JSON.parse(request.requestBody) as ExecuteRequest;
  } catch (error) {
    return new Response(400, {}, { error: 'Invalid JSON format' });
  }

  const { code, language } = body;

  if (!code || !language) {
    return new Response(400, {}, { error: 'Code and language are required' });
  }

  try {
    if (language === 'javascript') {
      const logs: string[] = [];
      const originalConsoleLog = console.log;

      console.log = (...args: any[]) => {
        logs.push(args.map(String).join(' '));
        originalConsoleLog(...args);
      };

      const result = eval(code);

      console.log = originalConsoleLog;

      return {
        output: logs.length > 0
          ? logs.join('\n')
          : result !== undefined
            ? String(result)
            : 'No output'
      };
    }

    if (language === 'python') {
      const interpreter = createPythonInterpreter();
      const output = interpreter.execute(code);

      return {
        output
      };
    }

    return new Response(400, {}, { error: `Unsupported language: ${language}` });

  } catch (error) {
    return new Response(500, {}, {
      error: error instanceof Error
        ? error.message
        : 'Execution error'
    });
  }
};

export { executeHandler }