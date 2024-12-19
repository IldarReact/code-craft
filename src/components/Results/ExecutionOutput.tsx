import React from 'react';
import { useExecutionStore } from '../../store/executionStore';
import { Button } from '../ui';

interface ExecutionOutputProps {
  onReset: () => void;
}

const ExecutionOutput: React.FC<ExecutionOutputProps> = ({ onReset }) => {
  const { status, result, error } = useExecutionStore();

  const formatOutput = (output: any): string => {
    if (output === undefined || output === null) return 'No output';
    if (typeof output === 'string') return output;
    return String(output);
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-md mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">Output</h3>
        {(status === 'success' || status === 'error') && (
          <Button onClick={onReset}>
            Reset
          </Button>
        )}
      </div>

      {status === 'running' && (
        <div className="text-gray-400">Executing code...</div>
      )}

      {status === 'success' && result && (
        <div>
          <pre className="bg-gray-800 p-4 rounded-md overflow-auto">
            {formatOutput(result.output)}
          </pre>
        </div>
      )}

      {status === 'error' && error && (
        <div>
          <pre className="bg-red-900 text-red-400 p-4 rounded-md overflow-auto">
            {error.message}
          </pre>
          {error.stackTrace && (
            <div className="text-gray-400 mt-2">
              <pre>{error.stackTrace}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExecutionOutput;