
import React from 'react';
import { useTasks } from '@/context/TaskContext';
import { Card, CardContent } from '@/components/ui/card';
import { Award, TrendingUp, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useIsMobile } from '@/hooks/use-mobile';

const PointsSummary: React.FC = () => {
  const { state } = useTasks();
  const isMobile = useIsMobile();

  // Calculate XP progress towards next level
  const xpForCurrentLevel = state.stats.level * 500;
  const xpProgress = Math.min(100, ((state.stats.xp - (state.stats.level - 1) * 500) / 500) * 100);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
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
        </div>
        
        {/* XP Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>XP Progress</span>
            <span>{state.stats.xp % 500}/{500} to Level {state.stats.level + 1}</span>
          </div>
          <Progress value={xpProgress} className="h-2" />
        </div>

        {/* Progress rings for mobile */}
        {isMobile && (
          <div className="mt-4 flex justify-around">
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#e6e6e6" strokeWidth="2" />
                  <circle 
                    cx="18" cy="18" r="16" fill="none" 
                    stroke="#4f46e5" strokeWidth="2" 
                    strokeDasharray={`${Math.min(100, state.stats.tasksCompleted/10 * 100)} 100`} 
                    strokeLinecap="round" 
                    transform="rotate(-90 18 18)" 
                  />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <span className="text-sm font-medium">{state.stats.tasksCompleted}</span>
                </div>
              </div>
              <span className="text-xs mt-1">Tasks Done</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#e6e6e6" strokeWidth="2" />
                  <circle 
                    cx="18" cy="18" r="16" fill="none" 
                    stroke="#10b981" strokeWidth="2" 
                    strokeDasharray={`${Math.min(100, state.stats.currentStreak * 10)} 100`} 
                    strokeLinecap="round" 
                    transform="rotate(-90 18 18)" 
                  />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <span className="text-sm font-medium">{state.stats.currentStreak}</span>
                </div>
              </div>
              <span className="text-xs mt-1">Day Streak</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#e6e6e6" strokeWidth="2" />
                  <circle 
                    cx="18" cy="18" r="16" fill="none" 
                    stroke="#f59e0b" strokeWidth="2" 
                    strokeDasharray={`${xpProgress} 100`} 
                    strokeLinecap="round" 
                    transform="rotate(-90 18 18)" 
                  />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <Target className="h-4 w-4" />
                </div>
              </div>
              <span className="text-xs mt-1">XP Level</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PointsSummary;
