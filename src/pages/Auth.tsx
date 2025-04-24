
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type AuthMode = 'login' | 'signup';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast.error(error.message);
          return;
        }

        toast.success('Logged in successfully');
        navigate('/');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: email.split('@')[0], // Use email username as default
            }
          }
        });

        if (error) {
          toast.error(error.message);
          return;
        }

        toast.success('Account created successfully');
        navigate('/onboarding');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">First Projects</h1>
          <p className="text-muted-foreground">
            {mode === 'login' ? 'Welcome back!' : 'Create your account'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-sm text-primary hover:underline"
            >
              {mode === 'login' 
                ? "Don't have an account? Sign Up" 
                : "Already have an account? Log In"}
            </button>
          </div>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-muted-foreground"></div>
          <span className="mx-4 text-muted-foreground">or</span>
          <div className="flex-grow border-t border-muted-foreground"></div>
        </div>

        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2"
          onClick={handleGoogleSignIn}
        >
          <img 
            src="/google-icon.svg" 
            alt="Google" 
            className="h-5 w-5" 
          />
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

export default Auth;
