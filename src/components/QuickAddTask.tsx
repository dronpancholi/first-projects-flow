
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useTaskForm } from '@/hooks/use-task-form';

const QuickAddTask: React.FC = () => {
  const { openTaskForm } = useTaskForm();

  return (
    <Button 
      onClick={openTaskForm}
      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
    >
      <Plus size={20} />
      Quick Add Task
    </Button>
  );
};

export default QuickAddTask;
