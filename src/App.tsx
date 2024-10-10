import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import TaskList from './components/TaskList';
import Timer from './components/Timer';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

interface Task {
  id: number;
  name: string;
}

const API_URL = 'http://localhost:5000/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        throw new Error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleLogin = (token: string) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setTasks([]);
    setSelectedTask(null);
  };

  const handleAddTask = async (taskName: string) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name: taskName }),
      });
      if (response.ok) {
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
      } else {
        throw new Error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
    setTime(0);
    setIsRunning(false);
  };

  const handleTimerToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleTimerReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const handleTimerComplete = async () => {
    if (selectedTask) {
      try {
        await fetch(`${API_URL}/tasks/${selectedTask.id}/timer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ duration: time }),
        });
        // Calculate break time (1/5 of work time)
        const breakTime = Math.floor(time / 5);
        setTime(breakTime);
        setIsRunning(true);
      } catch (error) {
        console.error('Error saving timer:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {isLoggedIn ? (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center">Flowmodoro Timer</h1>
            <TaskList tasks={tasks} onTaskSelect={handleTaskSelect} onAddTask={handleAddTask} />
            <Timer
              time={time}
              isRunning={isRunning}
              onToggle={handleTimerToggle}
              onReset={handleTimerReset}
              onComplete={handleTimerComplete}
            />
            <div className="mt-6 flex justify-center">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        ) : showRegister ? (
          <RegisterForm onRegisterSuccess={() => setShowRegister(false)} />
        ) : (
          <LoginForm onLoginSuccess={handleLogin} onRegisterClick={() => setShowRegister(true)} />
        )}
      </div>
    </div>
  );
}

export default App;