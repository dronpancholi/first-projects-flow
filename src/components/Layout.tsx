
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTasks } from '@/context/TaskContext';
import { CalendarIcon, ListIcon, Award } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const { state, dispatch } = useTasks();
  
  const handleViewChange = (view: 'list' | 'calendar') => {
    dispatch({ type: 'SET_VIEW', payload: view });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6" />
            <h1 className="text-2xl font-bold">First Projects</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium bg-primary-foreground text-primary px-2 py-1 rounded-full">
              Level {state.stats.level}
            </span>
            <span className="text-sm font-medium bg-accent text-accent-foreground px-2 py-1 rounded-full">
              {state.stats.totalPoints} pts
            </span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex-1">
        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2">
            <TabsTrigger 
              value="tasks" 
              onClick={() => handleViewChange('list')} 
              className="flex items-center gap-2"
            >
              <ListIcon className="h-4 w-4" />
              <span>Tasks</span>
            </TabsTrigger>
            <TabsTrigger 
              value="calendar" 
              onClick={() => handleViewChange('calendar')} 
              className="flex items-center gap-2"
            >
              <CalendarIcon className="h-4 w-4" />
              <span>Calendar</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tasks" className="space-y-4">
            {children}
          </TabsContent>
          <TabsContent value="calendar" className="space-y-4">
            {children}
          </TabsContent>
        </Tabs>
      </div>

      <footer className="bg-muted py-4 px-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          <p>First Projects - Track tasks, earn points, build habits</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
