
import React from 'react';
import { useTasks } from '@/context/TaskContext';
import { Card, CardContent } from '@/components/ui/card';
import { Award, TrendingUp } from 'lucide-react';

const PointsSummary: React.FC = () => {
  const { state } = useTasks();

  return (
    <Card>
      <CardContent className="p-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 bg-primary/10 p-3 rounded-full">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Points Summary</h3>
            <div className="text-sm text-muted-foreground">
              Level {state.stats.level} • {state.stats.xp} XP
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-bold">{state.stats.totalPoints}</span>
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>+{state.stats.dailyPoints} today</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PointsSummary;
