
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTasks } from '@/context/TaskContext';
import { format, isSameDay, parseISO } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

const TaskCalendar: React.FC = () => {
  const { state } = useTasks();
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );
  
  // Function to get tasks for a specific date
  const getTasksForDate = (date: Date) => {
    return state.tasks.filter((task) => {
      const taskDate = parseISO(task.dueDate);
      return isSameDay(taskDate, date);
    });
  };
  
  // Get tasks for the selected date
  const tasksForSelectedDate = selectedDate 
    ? getTasksForDate(selectedDate) 
    : [];
  
  // Function to highlight dates with tasks
  const isDayWithTasks = (day: Date) => {
    const tasksForDay = getTasksForDate(day);
    return tasksForDay.length > 0;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Select Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="pointer-events-auto rounded-md border"
            modifiers={{
              withTasks: (date) => isDayWithTasks(date),
            }}
            modifiersClassNames={{
              withTasks: "bg-primary/10 font-bold",
            }}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tasksForSelectedDate.length > 0 ? (
            <div className="space-y-3">
              {tasksForSelectedDate.map((task) => (
                <div key={task.id} className="p-3 border rounded-md">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium">{task.title}</h3>
                    <Badge className={task.status === 'Pending' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                      {task.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {format(parseISO(task.dueDate), 'h:mm a')}
                  </div>
                  {task.description && (
                    <p className="text-sm mt-2 text-muted-foreground">{task.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <p className="text-muted-foreground">
                {selectedDate
                  ? 'No tasks scheduled for this date.'
                  : 'Select a date to view tasks.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskCalendar;
