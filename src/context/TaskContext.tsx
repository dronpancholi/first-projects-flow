
import { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
export type Priority = 'Very High' | 'High' | 'Medium' | 'Low' | 'Optional';
export type Category = 'Work' | 'Study' | 'Fitness' | 'Meetings' | 'Personal' | 'Projects' | 'Focus Sessions' | 'Chores' | 'Custom';
export type TaskStatus = 'Pending' | 'Completed' | 'Completed Late' | 'Postponed' | 'Missed' | 'Skipped' | 'Canceled';

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: Category;
  priority: Priority;
  dueDate: string;
  estimatedTime: number; // in minutes
  status: TaskStatus;
  points: number;
  createdAt: string;
}

interface Stats {
  dailyPoints: number;
  weeklyPoints: number;
  monthlyPoints: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  tasksCompleted: number;
  tasksMissed: number;
  level: number;
  xp: number;
}

type AppView = 'list' | 'calendar';

interface TaskState {
  tasks: Task[];
  stats: Stats;
  currentView: AppView;
}

type TaskAction = 
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'COMPLETE_TASK'; payload: { id: string, status: TaskStatus } }
  | { type: 'SET_VIEW'; payload: AppView };

// Calculate points based on priority
export const calculatePoints = (priority: Priority): number => {
  switch (priority) {
    case 'Very High': return 50;
    case 'High': return 30;
    case 'Medium': return 20;
    case 'Low': return 10;
    case 'Optional': return 5;
    default: return 0;
  }
};

// Initial state
const initialStats: Stats = {
  dailyPoints: 0,
  weeklyPoints: 0,
  monthlyPoints: 0,
  totalPoints: 0,
  currentStreak: 0,
  longestStreak: 0,
  tasksCompleted: 0,
  tasksMissed: 0,
  level: 1,
  xp: 0
};

const initialState: TaskState = {
  tasks: [],
  stats: initialStats,
  currentView: 'list'
};

// Create context
const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
}>({
  state: initialState,
  dispatch: () => null
});

// Reducer
const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
      
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
      
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };
      
    case 'COMPLETE_TASK': {
      const { id, status } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      
      if (!task) return state;
      
      let pointsChange = 0;
      let xpChange = 0;
      let tasksCompleted = state.stats.tasksCompleted;
      let tasksMissed = state.stats.tasksMissed;
      let currentStreak = state.stats.currentStreak;
      let longestStreak = state.stats.longestStreak;
      
      // Handle points and stats based on completion status
      switch (status) {
        case 'Completed':
          pointsChange = Math.floor(task.points * 1.1); // 10% bonus
          xpChange = 10;
          tasksCompleted++;
          currentStreak++;
          if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
          }
          break;
          
        case 'Completed Late':
          pointsChange = Math.floor(task.points * 0.75); // 25% penalty
          xpChange = 5;
          tasksCompleted++;
          break;
          
        case 'Missed':
          pointsChange = Math.floor(task.points * -0.5); // 50% penalty
          tasksMissed++;
          currentStreak = 0; // Reset streak
          break;
          
        default:
          // No points change for other statuses
          break;
      }
      
      // Calculate level (every 500 XP)
      const newXp = state.stats.xp + xpChange;
      const newLevel = 1 + Math.floor(newXp / 500);
      
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === id ? { ...t, status } : t
        ),
        stats: {
          ...state.stats,
          totalPoints: state.stats.totalPoints + pointsChange,
          dailyPoints: state.stats.dailyPoints + pointsChange,
          weeklyPoints: state.stats.weeklyPoints + pointsChange,
          monthlyPoints: state.stats.monthlyPoints + pointsChange,
          tasksCompleted,
          tasksMissed,
          currentStreak,
          longestStreak,
          xp: newXp,
          level: newLevel
        }
      };
    }
    
    case 'SET_VIEW':
      return {
        ...state,
        currentView: action.payload
      };
      
    default:
      return state;
  }
};

// Provider component
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
