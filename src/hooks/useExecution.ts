import { useCallback } from 'react';
import type { ExecuteCodePayload } from '../store/types';
import { useExecutionStore } from '../store';

export const useExecution = () => {
  const { status, result, error, executeCode, reset } = useExecutionStore();

  const handleExecute = useCallback(async (payload: ExecuteCodePayload) => {
    if (!payload.code?.trim()) return;
    await executeCode(payload);
  }, [executeCode]);

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  return {
    status,
    result,
    error,
    execute: handleExecute,
    reset: handleReset,
    isRunning: status === 'running',
    isError: status === 'error',
    isSuccess: status === 'success',
  };
};