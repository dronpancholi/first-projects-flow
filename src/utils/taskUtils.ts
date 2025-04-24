
import { format, parseISO, isAfter, isBefore, isToday } from 'date-fns';
import { Task, TaskStatus, Priority } from '../context/TaskContext';

// Format date for display
export const formatTaskDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMM d, yyyy h:mm a');
  } catch (error) {
    console.error('Invalid date format:', error);
    return 'Invalid date';
  }
};

// Check if a task is overdue
export const isTaskOverdue = (dueDate: string): boolean => {
  try {
    const date = parseISO(dueDate);
    return isBefore(date, new Date()) && !isToday(date);
  } catch (error) {
    return false;
  }
};

// Get tasks due today
export const getTasksDueToday = (tasks: Task[]): Task[] => {
  return tasks.filter(task => {
    try {
      const dueDate = parseISO(task.dueDate);
      return isToday(dueDate) && task.status === 'Pending';
    } catch (error) {
      return false;
    }
  });
};

// Get upcoming tasks
export const getUpcomingTasks = (tasks: Task[]): Task[] => {
  return tasks.filter(task => {
    try {
      const dueDate = parseISO(task.dueDate);
      return isAfter(dueDate, new Date()) && task.status === 'Pending';
    } catch (error) {
      return false;
    }
  });
};

// Get completed tasks for today
export const getCompletedTasksToday = (tasks: Task[]): Task[] => {
  return tasks.filter(task => {
    if (!task.completedAt) return false;
    try {
      const completedDate = parseISO(task.completedAt);
      return isToday(completedDate);
    } catch (error) {
      return false;
    }
  });
};

// Get task status color class
export const getTaskStatusClass = (status: TaskStatus): string => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'Completed Late':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Pending':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'Postponed':
      return 'bg-purple-100 text-purple-800 border-purple-300';
    case 'Missed':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'Skipped':
    case 'Canceled':
      return 'bg-gray-100 text-gray-800 border-gray-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

// Get task priority badge class
export const getTaskPriorityClass = (priority: Priority): string => {
  switch (priority) {
    case 'Very High':
      return 'task-priority-very-high';
    case 'High':
      return 'task-priority-high';
    case 'Medium':
      return 'task-priority-medium';
    case 'Low':
      return 'task-priority-low';
    case 'Optional':
      return 'task-priority-optional';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

// Generate a unique ID for tasks
export const generateTaskId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Format estimated time for display
export const formatEstimatedTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }
  
  return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${remainingMinutes} min`;
};
