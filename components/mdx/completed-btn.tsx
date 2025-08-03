'use client';

import { Button } from '@/components/ui/button';
import { CheckCircleIcon, CircleIcon, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CompletedBtnProps {
  problemTitle: string;
  topic?: string;
  variant?: 'just-icon' | 'icon-text';
  onAuthRequired?: () => boolean;
}

const CompletedBtn = ({ 
  problemTitle, 
  topic, 
  variant, 
  onAuthRequired 
}: CompletedBtnProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if this problem is already completed
    const checkCompletedStatus = async () => {
      try {
        const response = await fetch('/api/completed');
        if (response.ok) {
          const completed = await response.json();
          const isInCompleted = completed.includes(problemTitle);
          setIsCompleted(isInCompleted);
        }
      } catch (error) {
        console.error('Error checking completed status:', error);
      }
    };

    checkCompletedStatus();
  }, [problemTitle]);

  const handleToggleCompleted = async () => {
    // Temporarily disable authentication check for testing
    // TODO: Re-enable authentication check for production
    // if (onAuthRequired && onAuthRequired()) {
    //   return; // Authentication dialog was shown, don't proceed
    // }
    
    setIsLoading(true);
    try {
      if (isCompleted) {
        // Remove from completed
        await fetch('/api/completed', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: problemTitle }),
        });
        setIsCompleted(false);
      } else {
        // Add to completed
        await fetch('/api/completed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: problemTitle,
          }),
        });
        setIsCompleted(true);
      }
    } catch (error) {
      console.error('Error toggling completed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render until the status is loaded to prevent hydration mismatches
  if (isLoading && !isCompleted) {
    return (
      <Button color="outline" size="sm" disabled>
        <Loader2 className="w-4 h-4 animate-spin" />
      </Button>
    );
  }

  if (variant === 'just-icon') {
    return (
      <Button 
        onClick={handleToggleCompleted} 
        color="outline" 
        size="sm"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isCompleted ? (
          <CheckCircleIcon className="w-4 h-4 text-green-600" />
        ) : (
          <CircleIcon className="w-4 h-4 text-gray-400" />
        )}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleToggleCompleted}
      color="outline"
      size="sm"
      className="gap-2 px-2 py-3 w-[200px]"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <div>Updating...</div>
        </>
      ) : isCompleted ? (
        <>
          <CheckCircleIcon className="w-4 h-4 text-green-600" />
          <div>Mark as incomplete</div>
        </>
      ) : (
        <>
          <CircleIcon className="w-4 h-4 text-gray-400" />
          <div>Mark as completed</div>
        </>
      )}
    </Button>
  );
};

export default CompletedBtn;
