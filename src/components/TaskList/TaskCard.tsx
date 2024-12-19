import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Task } from '../../store/types';
import { Button } from '../ui';

interface TaskCardProps {
  task: Task;
  isActive: boolean;
  onSelect: (task: Task) => void;
  onToggleCollapse: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isActive,
  onSelect,
  onToggleCollapse,
}) => (
  <Card 
    className={`cursor-pointer transition-all ${
      isActive ? 'border-blue-500 shadow-md' : ''
    }`}
  >
    <CardHeader className="flex flex-row items-center justify-between p-3 md:p-4">
      <div className="flex-1 min-w-0">
        <CardTitle className="text-base md:text-lg truncate">
          {task.title}
        </CardTitle>
      </div>
      <div className="flex items-center space-x-2 ml-2">
        <span className={`px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap ${
          task.language === 'python' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {task.language}
        </span>
        <Button
          className="p-1 md:p-2"
          onClick={(e) => {
            e.stopPropagation();
            onToggleCollapse(task.id);
          }}
        >
          {task.isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
        </Button>
      </div>
    </CardHeader>
    {!task.isCollapsed && (
      <CardContent 
        onClick={() => onSelect(task)}
        className="p-3 md:p-4 hover:bg-gray-50 transition-colors"
      >
        <p className="text-sm md:text-base text-gray-600">{task.description}</p>
        <pre className="mt-2 p-2 bg-gray-100 rounded text-xs md:text-sm overflow-x-auto">
          <code>{task.initialCode}</code>
        </pre>
      </CardContent>
    )}
  </Card>
);

export default TaskCard;