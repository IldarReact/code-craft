// src/mocks/handlers.ts
import { Response } from 'miragejs';
import { AppSchema, ExecuteRequest, HandlerRequest } from './types';
import { PythonInterpreter } from './pythonInterpreter';

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
    // JavaScript execution остаётся без изменений
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

    // Новая реализация для Python
    if (language === 'python') {
      const interpreter = new PythonInterpreter();
      const result = interpreter.execute(code);

      if (result.error) {
        return new Response(400, {}, { 
          error: result.error,
          output: null
        });
      }

      return {
        output: result.output
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

export { executeHandler };