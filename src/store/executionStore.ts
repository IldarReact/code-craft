import { create } from 'zustand'

// Интерфейс для запроса к API
interface ExecuteCodePayload {
    code: string;
    language: string;
}

// Интерфейс для ответа API
interface ExecutionResponse {
    output: string;
    error?: string;
}

export type ExecutionStatus = 'idle' | 'running' | 'success' | 'error';

export interface ExecutionResult {
    output: string;
}

export interface ExecutionError {
    message: string;
    line?: number;
    column?: number;
    stackTrace?: string | undefined;
}

interface ExecutionState {
    status: ExecutionStatus;
    result: ExecutionResult | null;
    error: ExecutionError | null;
    setStatus: (status: ExecutionStatus) => void;
    setResult: (result: ExecutionResult) => void;
    setError: (error: ExecutionError) => void;
    reset: () => void;
    executeCode: (payload: ExecuteCodePayload) => Promise<void>;
}

const initialState = {
    status: 'idle' as ExecutionStatus,
    result: null,
    error: null,
};

export const useExecutionStore = create<ExecutionState>((set) => ({
    ...initialState,

    setStatus: (status) => set({ status }),

    setResult: (result) => set({
        result,
        status: 'success',
        error: null
    }),

    setError: (error) => set({
        error,
        status: 'error',
        result: null
    }),

    reset: () => set(initialState),

    executeCode: async ({ code, language }: ExecuteCodePayload) => {
        if (!code?.trim() || !language?.trim()) {
          set({
            status: 'error',
            error: {
              message: 'Код и язык программирования обязательны',
            },
            result: null
          });
          return;
        }
      
        try {
          set({ status: 'running', result: null, error: null });
      
          const response = await fetch('/api/execute', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, language })
          });
      
          const data = await response.json() as ExecutionResponse;
      
          if (!response.ok) {
            throw new Error(data.error || 'Ошибка выполнения кода');
          }
      
          set({
            status: 'success',
            result: {
              output: data.output
            },
            error: null
          });
        } catch (error) {
          const errorMessage = error instanceof Error 
            ? error.message 
            : 'Произошла ошибка при выполнении кода';
          
          set({
            status: 'error',
            error: {
              message: errorMessage
            },
            result: null
          });
        }
      }
}));