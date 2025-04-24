
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const timezones = [
  'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'Europe/London', 'Europe/Paris', 'Asia/Tokyo', 'Asia/Dubai', 'Australia/Sydney'
];

const Onboarding: React.FC = () => {
  const [username, setUsername] = useState('');
  const [timezone, setTimezone] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleCompleteOnboarding = async () => {
    if (!username || !timezone) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Please log in first');
        return;
      }

      // Update user profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({ 
          username, 
          timezone,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        toast.error(error.message);
        return;
      }

      // Update user settings
      const { error: settingsError } = await supabase
        .from('user_settings')
        .update({ 
          language: 'en', // Default to English
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (settingsError) {
        toast.error(settingsError.message);
        return;
      }

      toast.success('Profile setup complete!');
      navigate('/');
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error(error);
    }
  };

  const availableInterests = [
    'Productivity', 'Fitness', 'Learning', 
    'Personal Development', 'Career', 'Health'
  ];

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome to First Projects</h1>
          <p className="text-muted-foreground">
            Let's personalize your experience
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <Input
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Timezone</label>
            <Select 
              value={timezone}
              onValueChange={setTimezone}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Select your interests (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {availableInterests.map((interest) => (
                <Button
                  key={interest}
                  variant={interests.includes(interest) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </Button>
              ))}
            </div>
          </div>

          <Button 
            className="w-full mt-4" 
            onClick={handleCompleteOnboarding}
          >
            Complete Setup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
