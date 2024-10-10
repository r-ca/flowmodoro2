import React, { useState } from 'react';

interface Task {
  id: number;
  name: string;
}

interface TaskListProps {
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
  onAddTask: (taskName: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskSelect, onAddTask }) => {
  const [newTaskName, setNewTaskName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskName.trim()) {
      onAddTask(newTaskName.trim());
      setNewTaskName('');
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Tasks</h2>
      <ul className="space-y-2 mb-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-gray-100 p-2 rounded cursor-pointer hover:bg-gray-200"
            onClick={() => onTaskSelect(task)}
          >
            {task.name}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow px-3 py-2 border rounded-l"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">
          Add
        </button>
      </form>
    </div>
  );
};

export default TaskList;