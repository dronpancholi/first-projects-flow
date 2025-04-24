
import React, { useState } from 'react';
import { useTasks, Priority, Category, calculatePoints } from '@/context/TaskContext';
import { generateTaskId } from '@/utils/taskUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Clock } from 'lucide-react';
import { toast } from 'sonner';

const TaskForm: React.FC = () => {
  const { dispatch } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState<Category>('Personal');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [estimatedHours, setEstimatedHours] = useState('');
  const [estimatedMinutes, setEstimatedMinutes] = useState('');

  const categories: Category[] = [
    'Work', 'Study', 'Fitness', 'Meetings', 
    'Personal', 'Projects', 'Focus Sessions', 'Chores', 'Custom'
  ];
  
  const priorities: Priority[] = [
    'Very High', 'High', 'Medium', 'Low', 'Optional'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !dueDate) {
      toast.error('Please fill in required fields: title and due date');
      return;
    }

    const estimatedTimeInMinutes = 
      (parseInt(estimatedHours || '0') * 60) + 
      parseInt(estimatedMinutes || '0');
    
    const points = calculatePoints(priority);
    
    const newTask = {
      id: generateTaskId(),
      title,
      description,
      dueDate,
      category,
      priority,
      estimatedTime: estimatedTimeInMinutes,
      status: 'Pending' as const,
      createdAt: new Date().toISOString(),
      points
    };

    dispatch({ type: 'ADD_TASK', payload: newTask });
    toast.success('Task added successfully');
    
    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setCategory('Personal');
    setPriority('Medium');
    setEstimatedHours('');
    setEstimatedMinutes('');
    setIsFormOpen(false);
  };

  if (!isFormOpen) {
    return (
      <Button 
        onClick={() => setIsFormOpen(true)}
        className="w-full flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        Add New Task
      </Button>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create New Task</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task details"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date & Time *</Label>
              <Input
                id="dueDate"
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value as Category)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={priority}
                onValueChange={(value) => setPriority(value as Priority)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {priorities.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Estimated Time</Label>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div className="flex gap-2 items-center flex-1">
                  <Input
                    type="number"
                    min="0"
                    max="24"
                    placeholder="Hours"
                    value={estimatedHours}
                    onChange={(e) => setEstimatedHours(e.target.value)}
                    className="w-full"
                  />
                  <span>h</span>
                  <Input
                    type="number"
                    min="0"
                    max="59"
                    placeholder="Minutes"
                    value={estimatedMinutes}
                    onChange={(e) => setEstimatedMinutes(e.target.value)}
                    className="w-full"
                  />
                  <span>m</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setIsFormOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit">Create Task</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TaskForm;
