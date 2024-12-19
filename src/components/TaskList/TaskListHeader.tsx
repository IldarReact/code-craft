import React from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '../ui'

interface TaskListHeaderProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  onFilterChange: (language: string | null) => void
  currentFilter: string | null
}

const TaskListHeader: React.FC<TaskListHeaderProps> = ({
  isCollapsed,
  onToggleCollapse,
  onFilterChange,
  currentFilter,
}) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 bg-gray-100 p-4 rounded-lg shadow">
    <div className="flex items-center space-x-4">
      <h2 className="text-lg md:text-xl font-bold">Задачи</h2>
      <Button onClick={onToggleCollapse} className="p-1 md:p-2">
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
      </Button>
    </div>
    <div className="flex flex-wrap gap-2">
      <Button
        className="text-sm md:text-base"
        color={currentFilter === 'python' ? 'primary' : 'secondary'}
        onClick={() =>
          onFilterChange(currentFilter === 'python' ? null : 'python')
        }
      >
        Python
      </Button>
      <Button
        className="text-sm md:text-base"
        color={currentFilter === 'javascript' ? 'primary' : 'secondary'}
        onClick={() =>
          onFilterChange(currentFilter === 'javascript' ? null : 'javascript')
        }
      >
        JavaScript
      </Button>
    </div>
  </div>
)

export default TaskListHeader
