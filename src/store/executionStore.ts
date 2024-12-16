import { create } from 'zustand'

// Интерфейс для ответа API
interface ExecutionResponse {
    output: string;
    executionTime: number;
    memory: string;
}

// Типы для статуса выполнения
export type ExecutionStatus = 'idle' | 'running' | 'success' | 'error';

// Типы для результатов выполнения
export interface ExecutionResult {
    output: string;
    executionTime?: number;
    memory?: string;
}

// Типы для ошибок выполнения
export interface ExecutionError {
    message: string;
    line?: number;
    column?: number;
    stackTrace?: string | undefined;
}

// Интерфейс состояния хранилища
interface ExecutionState {
    status: ExecutionStatus;
    result: ExecutionResult | null;
    error: ExecutionError | null;
    setStatus: (status: ExecutionStatus) => void;
    setResult: (result: ExecutionResult) => void;
    setError: (error: ExecutionError) => void;
    reset: () => void;
    executeCode: (code: string) => Promise<void>;
}

// Начальное состояние
const initialState = {
    status: 'idle' as ExecutionStatus,
    result: null,
    error: null,
};

// Создание хранилища
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

    executeCode: async (code: string) => {
        try {
            set({ status: 'running' });

            const response = await fetch('/api/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code })
            });

            const data = (await response.json()) as ExecutionResponse;

            if (!response.ok) {
                throw data;
            }

            set({
                status: 'success',
                result: {
                    output: data.output,
                    executionTime: data.executionTime,
                    memory: data.memory
                },
                error: null
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка при выполнении кода';
            const stackTrace = error instanceof Error ? error.stack : undefined;

            set({
                status: 'error',
                error: {
                    message: errorMessage,
                    stackTrace
                },
                result: null
            });
        }
    }
}));

// Как вызывать из других мест:

// const MyComponent = () => {
//     const { status, result, error, executeCode } = useExecutionStore();

//     const handleExecute = async () => {
//         await executeCode(myCode);
//     };

//     return (
//       // Ваш JSX код
//     );
// };