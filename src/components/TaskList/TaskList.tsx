import React from 'react'
import { useTaskStore } from '../../store/slices/taskStore'
import TaskCard from './TaskCard'
import TaskListHeader from './TaskListHeader'

export const TaskList: React.FC = () => {
  const {
    tasks,
    currentTask,
    languageFilter,
    isTaskListCollapsed,
    setCurrentTask,
    toggleTaskCollapse,
    toggleTaskListCollapse,
    setLanguageFilter,
  } = useTaskStore()

  const filteredTasks = React.useMemo(
    () =>
      languageFilter
        ? tasks.filter(task => task.language === languageFilter)
        : tasks,
    [tasks, languageFilter]
  )

  return (
    <div className="space-y-6 bg-gray-50 p-4 rounded-md shadow-sm">
      <TaskListHeader
        isCollapsed={isTaskListCollapsed}
        onToggleCollapse={toggleTaskListCollapse}
        onFilterChange={setLanguageFilter}
        currentFilter={languageFilter}
      />

      {!isTaskListCollapsed && (
        <div className="space-y-4">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              isActive={currentTask?.id === task.id}
              onSelect={setCurrentTask}
              onToggleCollapse={toggleTaskCollapse}
            />
          ))}

          {filteredTasks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">Нет доступных задач</p>
              {languageFilter && (
                <button
                  onClick={() => setLanguageFilter(null)}
                  className="text-blue-500 hover:text-blue-600 mt-2"
                >
                  Сбросить фильтр
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TaskList