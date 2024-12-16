import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';
import { useExecutionStore } from '../../store/executionStore';

const ErrorDisplay: React.FC = () => {
  const error = useExecutionStore((state) => state.error);

  if (!error) return null;

  return (
    <Card className="border-red-500">
      <CardHeader>
        <CardTitle className="text-red-600">Error</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-red-50 p-4 rounded-md text-red-800">
          {error.message}
          {error.stackTrace && (
            <>
              {'\n\n'}
              <span className="text-red-600">Stack trace:</span>
              {'\n'}
              {error.stackTrace}
            </>
          )}
        </pre>
      </CardContent>
    </Card>
  );
};

export default ErrorDisplay;