
import { create } from 'zustand';

interface TaskFormState {
  isOpen: boolean;
  openTaskForm: () => void;
  closeTaskForm: () => void;
}

export const useTaskForm = create<TaskFormState>((set) => ({
  isOpen: false,
  openTaskForm: () => set({ isOpen: true }),
  closeTaskForm: () => set({ isOpen: false }),
}));
