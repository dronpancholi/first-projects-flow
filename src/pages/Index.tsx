
import React from 'react';
import Layout from '@/components/Layout';
import TaskList from '@/components/TaskList';
import TaskCalendar from '@/components/TaskCalendar';
import PointsSummary from '@/components/PointsSummary';
import StreakTracker from '@/components/StreakTracker';
import DailyMotivation from '@/components/DailyMotivation';
import QuickAddTask from '@/components/QuickAddTask';
import { TaskProvider, useTasks } from '@/context/TaskContext';

const TaskContent = () => {
  const { state } = useTasks();

  return (
    <>
      <div className="mb-6">
        <QuickAddTask />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <PointsSummary />
        <StreakTracker />
      </div>
      
      <div className="mb-6">
        <DailyMotivation />
      </div>
      
      {state.currentView === 'list' ? <TaskList /> : <TaskCalendar />}
    </>
  );
};

const Index = () => {
  return (
    <TaskProvider>
      <Layout>
        <TaskContent />
      </Layout>
    </TaskProvider>
  );
};

export default Index;
