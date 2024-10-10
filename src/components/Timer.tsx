import React, { useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerProps {
  time: number;
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
  onComplete: () => void;
}

const Timer: React.FC<TimerProps> = ({ time, isRunning, onToggle, onReset, onComplete }) => {
  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        onComplete();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, onComplete]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center">
      <div className="text-6xl font-bold mb-4">{formatTime(time)}</div>
      <div className="flex justify-center space-x-4">
        <button
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
          onClick={onToggle}
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          className="bg-gray-300 text-gray-700 p-2 rounded-full hover:bg-gray-400"
          onClick={onReset}
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
};

export default Timer;