import type { LanguageType } from '../constants/languages';

export interface ExecuteCodePayload {
    code: string;
    language: LanguageType;
}

export interface ExecutionResult {
    output: string;
}

export interface ExecutionError {
    message: string;
    line?: number;
    column?: number;
    stackTrace?: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    language: 'javascript' | 'python';
    initialCode: string;
    difficulty: 'easy' | 'medium' | 'hard';
    isCollapsed?: boolean;
}