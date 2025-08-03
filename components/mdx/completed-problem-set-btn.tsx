'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle, Circle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CompletedProblemSetBtnProps {
  problemSetId: number;
  problemSetName: string;
  problemSetDescription?: string;
  problems: any[];
  userId?: string;
  variant?: 'default' | 'just-icon';
}

export default function CompletedProblemSetBtn({
  problemSetId,
  problemSetName,
  problemSetDescription,
  problems,
  userId,
  variant = 'default',
}: CompletedProblemSetBtnProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if this problem set is already completed
    const checkCompletedStatus = async () => {
      try {
        const response = await fetch('/api/completed-problem-sets');
        if (response.ok) {
          const completed = await response.json();
          const isInCompleted = completed.some(
            (comp: any) => comp.problem_set_id === problemSetId
          );
          setIsCompleted(isInCompleted);
        }
      } catch (error) {
        console.error('Error checking completed status:', error);
      }
    };

    checkCompletedStatus();
  }, [problemSetId]);

  const toggleCompleted = async () => {
    setIsLoading(true);
    try {
      if (isCompleted) {
        // Remove from completed
        await fetch('/api/completed-problem-sets', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            problem_set_id: problemSetId,
          }),
        });
        setIsCompleted(false);
      } else {
        // Add to completed
        await fetch('/api/completed-problem-sets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            problem_set_id: problemSetId,
            name: problemSetName,
            description: problemSetDescription,
            problems: problems,
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

  if (variant === 'just-icon') {
    return (
      <Button
        size="sm"
        onClick={toggleCompleted}
        disabled={isLoading}
        className="p-2 h-auto"
      >
        {isCompleted ? (
          <CheckCircle className="w-4 h-4 text-green-500" />
        ) : (
          <Circle className="w-4 h-4" />
        )}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      onClick={toggleCompleted}
      disabled={isLoading}
      className="gap-2"
    >
      {isCompleted ? (
        <>
          <CheckCircle className="w-4 h-4" />
          Mark as Incomplete
        </>
      ) : (
        <>
          <Circle className="w-4 h-4" />
          Mark as Completed
        </>
      )}
    </Button>
  );
}
