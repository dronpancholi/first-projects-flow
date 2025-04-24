
import React from 'react';
import { useTasks } from '@/context/TaskContext';
import { Card, CardContent } from '@/components/ui/card';
import { Flame } from 'lucide-react';

const StreakTracker: React.FC = () => {
  const { state } = useTasks();

  // Generate streak circles
  const renderStreakCircles = () => {
    const maxCircles = 5;
    const circles = [];
    
    for (let i = 0; i < maxCircles; i++) {
      circles.push(
        <div 
          key={i} 
          className={`h-2.5 w-2.5 rounded-full ${
            i < state.stats.currentStreak ? 'bg-orange-500' : 'bg-gray-200'
          }`}
        />
      );
    }
    
    return (
      <div className="flex gap-1.5">
        {circles}
        {state.stats.currentStreak > maxCircles && (
          <span className="text-xs text-muted-foreground ml-1">
            +{state.stats.currentStreak - maxCircles}
          </span>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardContent className="p-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 bg-orange-500/10 p-3 rounded-full">
            <Flame className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Current Streak</h3>
            <div className="mt-1">
              {renderStreakCircles()}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">{state.stats.currentStreak}</span>
          <div className="text-xs text-muted-foreground">
            Longest: {state.stats.longestStreak}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakTracker;
