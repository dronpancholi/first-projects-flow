
import React, { useState } from 'react';
import { useTasks } from '@/context/TaskContext';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  getTasksDueToday, 
  getUpcomingTasks, 
  getCompletedTasksToday 
} from '@/utils/taskUtils';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, ClockIcon } from 'lucide-react';

const TaskList: React.FC = () => {
  const { state } = useTasks();
  const [filter, setFilter] = useState<'today' | 'upcoming' | 'completed'>('today');

  const tasksDueToday = getTasksDueToday(state.tasks);
  const upcomingTasks = getUpcomingTasks(state.tasks);
  const completedTasks = getCompletedTasksToday(state.tasks);

  return (
    <div className="space-y-6">
      <TaskForm />
      
      <Tabs defaultValue="today" onValueChange={(v) => setFilter(v as any)}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="today" className="flex items-center gap-1">
            <ClockIcon className="h-4 w-4" />
            Today ({tasksDueToday.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Upcoming ({upcomingTasks.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            Completed ({completedTasks.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="today" className="space-y-4 mt-4">
          {tasksDueToday.length > 0 ? (
            tasksDueToday.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <p className="text-center text-muted-foreground">
                  No tasks due today. Add a new task to get started!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-4 mt-4">
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <p className="text-center text-muted-foreground">
                  No upcoming tasks. Plan ahead by adding tasks with future due dates.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4 mt-4">
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <p className="text-center text-muted-foreground">
                  No tasks completed today. Complete tasks to see them here.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskList;
