
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

// Sample quotes - in a real app, these would come from Supabase
const motivationalQuotes = [
  {
    quote: "Focus on being productive instead of busy.",
    author: "Tim Ferriss"
  },
  {
    quote: "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
    author: "Stephen Covey"
  },
  {
    quote: "Action is the foundational key to all success.",
    author: "Pablo Picasso"
  },
  {
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    quote: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
  {
    quote: "Don't count the days, make the days count.",
    author: "Muhammad Ali"
  },
  {
    quote: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar"
  },
  {
    quote: "Either you run the day or the day runs you.",
    author: "Jim Rohn"
  }
];

const DailyMotivation: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  
  useEffect(() => {
    // In a real app, we would determine the quote based on the date
    // For now, we'll just use a random quote
    const index = Math.floor(Math.random() * motivationalQuotes.length);
    setQuoteIndex(index);
  }, []);
  
  const { quote, author } = motivationalQuotes[quoteIndex];

  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950">
      <CardContent className="p-6">
        <div className="flex items-start">
          <div className="mt-1 mr-4 bg-yellow-500/10 p-2 rounded-full">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
          </div>
          <div>
            <h3 className="font-medium text-lg text-muted-foreground mb-2">Today's Insight</h3>
            <p className="italic mb-2">"{quote}"</p>
            <p className="text-sm text-muted-foreground">— {author}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyMotivation;
