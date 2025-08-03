'use client';

import { Button } from '@/components/ui/button';
import { useCompletedStatus, useToggleCompletedProblem } from '@/lib/hooks';
import { CheckCircleIcon, CircleIcon, Loader2 } from 'lucide-react';

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
  const { data: isCompleted = false, isLoading: statusLoading } = useCompletedStatus(problemTitle);
  const toggleCompletedMutation = useToggleCompletedProblem();

  const handleToggleCompleted = () => {
    // Temporarily disable authentication check for testing
    // TODO: Re-enable authentication check for production
    // if (onAuthRequired && onAuthRequired()) {
    //   return; // Authentication dialog was shown, don't proceed
    // }
    
    toggleCompletedMutation.mutate({ 
      title: problemTitle, 
      topic: topic || 'General', 
      isCompleted 
    });
  };

  // Don't render until the status is loaded to prevent hydration mismatches
  if (statusLoading) {
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
        disabled={toggleCompletedMutation.isPending}
      >
        {toggleCompletedMutation.isPending ? (
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
      disabled={toggleCompletedMutation.isPending}
    >
      {toggleCompletedMutation.isPending ? (
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
