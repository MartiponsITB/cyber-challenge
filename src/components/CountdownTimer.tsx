
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  startTimeSeconds: number;
  totalSeconds: number;
  isCompleted: boolean;
}

const CountdownTimer = ({ startTimeSeconds, totalSeconds, isCompleted }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(Math.max(0, totalSeconds - startTimeSeconds));

  useEffect(() => {
    if (isCompleted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = Math.max(0, prev - 1);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isCompleted]);

  // Format the time as HH:MM:SS
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage for the progress bar
  const progress = Math.max(0, Math.min(100, ((totalSeconds - timeLeft) / totalSeconds) * 100));

  return (
    <div className="cyber-card bg-black p-4">
      <div className="flex items-center mb-4">
        <Clock className="mr-2 text-cyber" />
        <h3 className="text-xl font-bold text-cyber">
          {isCompleted ? 'Temps Completat' : 'Temps Restant'}
        </h3>
      </div>
      
      <div className="text-center">
        <div className="text-4xl font-mono mb-4 cyber-text">
          {formatTime(timeLeft)}
        </div>
        
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-cyber" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="mt-2 text-sm text-gray-400">
          {isCompleted 
            ? 'Repte completat!' 
            : timeLeft === 0 
              ? 'Temps esgotat!' 
              : '48h límit per completar el repte'}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
