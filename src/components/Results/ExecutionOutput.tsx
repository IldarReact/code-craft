import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';
import { useExecutionStore } from '../../store/executionStore';

const ExecutionOutput: React.FC = () => {
  const result = useExecutionStore((state) => state.result);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Output</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
          {result?.output || 'No output yet'}
        </pre>
      </CardContent>
    </Card>
  );
};

export default ExecutionOutput;