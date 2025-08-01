'use client';

import { useCompleted } from '@/components/layout/sidebar/completed-context';
import { Button } from '@/components/ui/button';
import { CheckCircleIcon, CircleIcon } from 'lucide-react';

interface CompletedBtnProps {
  problemTitle: string;
  topic?: string;
}

const CompletedBtn = ({ problemTitle, topic }: CompletedBtnProps) => {
  const { isCompleted, toggleCompleted, isLoaded } = useCompleted();
  const isProblemCompleted = isCompleted(problemTitle);

  const handleToggleCompleted = () => {
    toggleCompleted(problemTitle);
  };

  // Don't render until the context is loaded to prevent hydration mismatches
  if (!isLoaded) {
    return null;
  }

  return (
    <Button
      onClick={handleToggleCompleted}
      color="outline"
      size="sm"
      className="gap-2 px-2 py-3 w-[200px]"
    >
      {isProblemCompleted ? (
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