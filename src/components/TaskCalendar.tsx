
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { useTasks } from '@/context/TaskContext';
import { parseISO, isSameDay, format } from 'date-fns';
import TaskCard from './TaskCard';

const TaskCalendar: React.FC = () => {
  const { state } = useTasks();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Get tasks for the selected date
  const tasksForSelectedDate = state.tasks.filter(task => 
    isSameDay(parseISO(task.dueDate), selectedDate)
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="p-4 flex-1">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border"
          />
        </Card>
        
        <Card className="p-4 flex-1">
          <h3 className="text-lg font-medium mb-4">
            Tasks for {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          
          <div className="space-y-4">
            {tasksForSelectedDate.length > 0 ? (
              tasksForSelectedDate.map(task => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <p className="text-muted-foreground">No tasks for this day.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TaskCalendar;
