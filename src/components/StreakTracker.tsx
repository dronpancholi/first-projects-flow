
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTasks } from '@/context/TaskContext';
import { Flame } from 'lucide-react';

const StreakTracker: React.FC = () => {
  const { state } = useTasks();
  const { currentStreak } = state.stats;
  
  // Next milestone is the next multiple of 5
  const nextMilestone = Math.ceil((currentStreak + 1) / 5) * 5;
  const progress = (currentStreak / nextMilestone) * 100;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Current Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-4">
          <div className="text-4xl font-bold">
            {currentStreak}
            <span className="text-base font-normal text-muted-foreground ml-1">
              {currentStreak === 1 ? 'day' : 'days'}
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Current</span>
            <span>Next: {nextMilestone} days</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="mt-4 flex justify-center">
          <div className="flex gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div 
                key={i} 
                className={`streak-dot ${i < (currentStreak % 7) ? 'streak-active' : 'streak-inactive'}`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakTracker;
