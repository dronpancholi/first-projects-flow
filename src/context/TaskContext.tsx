
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Define types
export type Priority = 'Very High' | 'High' | 'Medium' | 'Low' | 'Optional';

export type Category = 'Work' | 'Study' | 'Fitness' | 'Meetings' | 'Personal' | 'Projects' | 'Focus Sessions' | 'Chores' | 'Custom';

export type TaskStatus = 'Pending' | 'Completed' | 'Completed Late' | 'Postponed' | 'Missed' | 'Skipped' | 'Canceled';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  category: Category;
  priority: Priority;
  estimatedTime: number; // in minutes
  status: TaskStatus;
  createdAt: string;
  completedAt?: string;
  points: number;
}

export interface UserStats {
  totalPoints: number;
  tasksCompleted: number;
  tasksMissed: number;
  currentStreak: number;
  level: number;
}

interface State {
  tasks: Task[];
  stats: UserStats;
  currentView: 'list' | 'calendar';
}

type Action =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_VIEW'; payload: 'list' | 'calendar' }
  | { type: 'COMPLETE_TASK'; payload: { id: string; status: TaskStatus } };

const initialState: State = {
  tasks: [],
  stats: {
    totalPoints: 0,
    tasksCompleted: 0,
    tasksMissed: 0,
    currentStreak: 0,
    level: 1,
  },
  currentView: 'list',
};

// Helper function to calculate points based on priority
export const calculatePoints = (priority: Priority): number => {
  switch (priority) {
    case 'Very High':
      return 50;
    case 'High':
      return 30;
    case 'Medium':
      return 20;
    case 'Low':
      return 10;
    case 'Optional':
      return 5;
    default:
      return 0;
  }
};

// Helper function to calculate bonus/penalty based on status
export const calculatePointsAdjustment = (
  status: TaskStatus, 
  basePoints: number
): number => {
  switch (status) {
    case 'Completed':
      return basePoints * 1.1; // 10% bonus for on-time completion
    case 'Completed Late':
      return basePoints * 0.75; // 25% penalty for late completion
    case 'Postponed':
      return 0;
    case 'Missed':
      return basePoints * -0.5; // 50% penalty for missing a task
    case 'Skipped':
    case 'Canceled':
      return 0;
    default:
      return basePoints;
  }
};

// Load data from localStorage
const loadFromLocalStorage = (): State => {
  try {
    const savedState = localStorage.getItem('firstProjectsState');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
  }
  return initialState;
};

// Save data to localStorage
const saveToLocalStorage = (state: State) => {
  try {
    localStorage.setItem('firstProjectsState', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TASK': {
      const newTasks = [...state.tasks, action.payload];
      return { ...state, tasks: newTasks };
    }
    case 'UPDATE_TASK': {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      return { ...state, tasks: updatedTasks };
    }
    case 'DELETE_TASK': {
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      return { ...state, tasks: filteredTasks };
    }
    case 'SET_VIEW': {
      return { ...state, currentView: action.payload };
    }
    case 'COMPLETE_TASK': {
      const { id, status } = action.payload;
      const taskToUpdate = state.tasks.find(task => task.id === id);
      
      if (!taskToUpdate) return state;
      
      const basePoints = taskToUpdate.points;
      const adjustedPoints = calculatePointsAdjustment(status, basePoints);
      
      // Update task status
      const updatedTasks = state.tasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            status,
            completedAt: status === 'Completed' || status === 'Completed Late' 
              ? new Date().toISOString() 
              : undefined
          };
        }
        return task;
      });
      
      // Update stats
      const updatedStats = { ...state.stats };
      updatedStats.totalPoints += Math.round(adjustedPoints);
      
      if (status === 'Completed' || status === 'Completed Late') {
        updatedStats.tasksCompleted += 1;
        updatedStats.currentStreak += 1;
      } else if (status === 'Missed') {
        updatedStats.tasksMissed += 1;
        updatedStats.currentStreak = 0; // Reset streak
      }
      
      // Update level based on points
      updatedStats.level = Math.floor(updatedStats.totalPoints / 500) + 1;
      
      return {
        ...state,
        tasks: updatedTasks,
        stats: updatedStats
      };
    }
    default:
      return state;
  }
};

// Create Context
const TaskContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, loadFromLocalStorage);

  useEffect(() => {
    saveToLocalStorage(state);
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
