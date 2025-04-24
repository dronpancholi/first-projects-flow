
import { format, isAfter, isBefore, startOfDay, endOfDay, isToday, parseISO, addDays } from 'date-fns';
import { Task, TaskStatus, Priority } from '@/context/TaskContext';

// Generate a unique task ID
export const generateTaskId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Format a task date for display
export const formatTaskDate = (dateString: string): string => {
  const date = parseISO(dateString);
  if (isToday(date)) {
    return `Today, ${format(date, 'h:mm a')}`;
  }
  return format(date, 'MMM d, yyyy h:mm a');
};

// Format estimated time for display
export const formatEstimatedTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}m`;
};

// Check if a task is overdue
export const isTaskOverdue = (dueDate: string): boolean => {
  return isBefore(parseISO(dueDate), new Date()) && isAfter(parseISO(dueDate), new Date(0));
};

// Get tasks due today
export const getTasksDueToday = (tasks: Task[]): Task[] => {
  const today = new Date();
  const start = startOfDay(today);
  const end = endOfDay(today);
  
  return tasks.filter(task => {
    const dueDate = parseISO(task.dueDate);
    return isAfter(dueDate, start) && 
           isBefore(dueDate, end) && 
           task.status === 'Pending';
  });
};

// Get upcoming tasks
export const getUpcomingTasks = (tasks: Task[]): Task[] => {
  const today = new Date();
  const startOfTomorrow = startOfDay(addDays(today, 1));
  
  return tasks.filter(task => {
    const dueDate = parseISO(task.dueDate);
    return isAfter(dueDate, startOfTomorrow) && 
           task.status === 'Pending';
  }).sort((a, b) => 
    parseISO(a.dueDate).getTime() - parseISO(b.dueDate).getTime()
  );
};

// Get completed tasks for today
export const getCompletedTasksToday = (tasks: Task[]): Task[] => {
  const today = new Date();
  const start = startOfDay(today);
  const end = endOfDay(today);
  
  return tasks.filter(task => {
    return (task.status === 'Completed' || 
            task.status === 'Completed Late' ||
            task.status === 'Skipped') &&
           isAfter(parseISO(task.createdAt), start) &&
           isBefore(parseISO(task.createdAt), end);
  });
};

// Get CSS class for task status
export const getTaskStatusClass = (status: TaskStatus): string => {
  switch (status) {
    case 'Completed':
      return 'bg-green-500 text-white';
    case 'Completed Late':
      return 'bg-amber-500 text-white';
    case 'Missed':
      return 'bg-red-500 text-white';
    case 'Postponed':
      return 'bg-blue-500 text-white';
    case 'Skipped':
      return 'bg-gray-500 text-white';
    case 'Canceled':
      return 'bg-gray-700 text-white';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

// Get CSS class for task priority
export const getTaskPriorityClass = (priority: Priority): string => {
  switch (priority) {
    case 'Very High':
      return 'bg-red-500 text-white';
    case 'High':
      return 'bg-orange-500 text-white';
    case 'Medium':
      return 'bg-blue-500 text-white';
    case 'Low':
      return 'bg-green-500 text-white';
    case 'Optional':
      return 'bg-gray-500 text-white';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};
