
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTasks } from '@/context/TaskContext';
import { Award, Trophy } from 'lucide-react';

const PointsSummary: React.FC = () => {
  const { state } = useTasks();
  const { totalPoints, level, tasksCompleted } = state.stats;
  
  // Calculate points needed for next level (500 points per level)
  const pointsForNextLevel = level * 500;
  const currentLevelMinPoints = (level - 1) * 500;
  const pointsInCurrentLevel = totalPoints - currentLevelMinPoints;
  const progress = (pointsInCurrentLevel / 500) * 100;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Progress Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold">{totalPoints}</div>
            <div className="text-xs text-muted-foreground">Total Points</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold flex items-center justify-center">
              <Award className="h-5 w-5 mr-1 text-primary" />
              {level}
            </div>
            <div className="text-xs text-muted-foreground">Current Level</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Level {level}</span>
            <span>{pointsInCurrentLevel}/{500} points to Level {level + 1}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="mt-4 text-center">
          <div className="text-sm font-medium">Tasks Completed: {tasksCompleted}</div>
          {tasksCompleted >= 10 && (
            <div className="mt-2 text-xs text-primary">
              Achievement Unlocked: Task Master!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PointsSummary;
