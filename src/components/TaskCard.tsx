
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Task, 
  TaskStatus,
  useTasks 
} from '@/context/TaskContext';
import { 
  formatTaskDate, 
  formatEstimatedTime, 
  getTaskPriorityClass,
  getTaskStatusClass,
  isTaskOverdue
} from '@/utils/taskUtils';
import { CheckCircle, Clock, MoreVertical, AlertTriangle, Timer } from 'lucide-react';
import { toast } from 'sonner';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { dispatch } = useTasks();
  const [isCompleting, setIsCompleting] = useState(false);
  const isOverdue = isTaskOverdue(task.dueDate);

  const handleStatusChange = (status: TaskStatus) => {
    setIsCompleting(true);
    
    // Simulate a short delay for animation
    setTimeout(() => {
      dispatch({
        type: 'COMPLETE_TASK',
        payload: { id: task.id, status }
      });
      
      let message = '';
      switch (status) {
        case 'Completed':
          message = 'Task completed! Points added.';
          break;
        case 'Completed Late':
          message = 'Task completed late. Reduced points added.';
          break;
        case 'Postponed':
          message = 'Task postponed. No points change.';
          break;
        case 'Missed':
          message = 'Task marked as missed. Points deducted.';
          break;
        case 'Skipped':
          message = 'Optional task skipped. No points change.';
          break;
        case 'Canceled':
          message = 'Task canceled and removed from tracking.';
          break;
      }
      
      toast.success(message);
      setIsCompleting(false);
    }, 300);
  };

  const statusClass = getTaskStatusClass(task.status);
  const priorityClass = getTaskPriorityClass(task.priority);

  return (
    <Card 
      className={`task-card ${isCompleting ? 'completion-animation' : ''}`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{task.title}</h3>
          <p className="text-muted-foreground text-sm mb-2">
            {formatTaskDate(task.dueDate)}
            {isOverdue && task.status === 'Pending' && (
              <Badge variant="destructive" className="ml-2">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Overdue
              </Badge>
            )}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge className={priorityClass}>
            {task.priority}
          </Badge>
          
          {task.status !== 'Pending' && (
            <Badge className={statusClass}>
              {task.status}
            </Badge>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {task.status === 'Pending' && (
                <>
                  <DropdownMenuItem onClick={() => handleStatusChange('Completed')}>
                    Mark as Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange('Completed Late')}>
                    Mark as Completed Late
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange('Postponed')}>
                    Postpone Task
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange('Missed')}>
                    Mark as Missed
                  </DropdownMenuItem>
                  {task.priority === 'Optional' && (
                    <DropdownMenuItem onClick={() => handleStatusChange('Skipped')}>
                      Skip Task
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem 
                    onClick={() => handleStatusChange('Canceled')}
                    className="text-destructive"
                  >
                    Cancel Task
                  </DropdownMenuItem>
                </>
              )}
              {task.status !== 'Pending' && (
                <DropdownMenuItem
                  onClick={() => {
                    dispatch({ 
                      type: 'DELETE_TASK', 
                      payload: task.id 
                    });
                    toast.success('Task removed');
                  }}
                  className="text-destructive"
                >
                  Remove Task
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {task.description && (
        <p className="text-sm mb-3">{task.description}</p>
      )}

      <div className="flex flex-wrap gap-2 mt-2 text-xs text-muted-foreground">
        <Badge variant="outline" className="flex items-center gap-1">
          {task.category}
        </Badge>
        {task.estimatedTime > 0 && (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatEstimatedTime(task.estimatedTime)}
          </Badge>
        )}
        <Badge variant="outline" className="flex items-center gap-1">
          <Timer className="h-3 w-3" />
          {task.points} points
        </Badge>
      </div>
      
      {task.status === 'Pending' && (
        <div className="mt-4">
          <Button 
            onClick={() => handleStatusChange('Completed')}
            className="w-full flex items-center justify-center gap-2"
            variant="default"
          >
            <CheckCircle className="h-4 w-4" />
            Complete
          </Button>
        </div>
      )}
    </Card>
  );
};

export default TaskCard;
