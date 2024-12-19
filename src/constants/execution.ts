export const EXECUTION_STATUS = {
    IDLE: 'idle',
    RUNNING: 'running',
    SUCCESS: 'success',
    ERROR: 'error',
  } as const;
  
export type ExecutionStatusType = typeof EXECUTION_STATUS[keyof typeof EXECUTION_STATUS];  