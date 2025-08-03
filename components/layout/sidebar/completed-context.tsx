'use client';

import { useCompletedProblems, useToggleCompletedProblem } from '@/lib/hooks';
import { createContext, useContext } from 'react';

interface CompletedContextType {
  completedProblems: string[];
  isCompleted: (problemTitle: string) => boolean;
  toggleCompleted: (problemTitle: string) => void;
  removeCompleted: (problemTitle: string) => void;
  isLoaded: boolean;
  isLoading: boolean;
}

const CompletedContext = createContext<CompletedContextType | undefined>(undefined);

export const CompletedProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: completedProblems = [], isLoading, error } = useCompletedProblems();
  const toggleCompletedMutation = useToggleCompletedProblem();

  const isCompleted = (problemTitle: string) => {
    return completedProblems.includes(problemTitle);
  };

  const toggleCompleted = (problemTitle: string) => {
    const currentlyCompleted = isCompleted(problemTitle);
    toggleCompletedMutation.mutate({ 
      title: problemTitle, 
      topic: 'General', 
      isCompleted: currentlyCompleted 
    });
  };

  const removeCompleted = (problemTitle: string) => {
    toggleCompletedMutation.mutate({ 
      title: problemTitle, 
      topic: 'General', 
      isCompleted: true 
    });
  };

  return (
    <CompletedContext.Provider value={{ 
      completedProblems, 
      isCompleted, 
      toggleCompleted, 
      removeCompleted, 
      isLoaded: !isLoading && !error,
      isLoading
    }}>
      {children}
    </CompletedContext.Provider>
  );
};

export const useCompletedContext = () => {
  const context = useContext(CompletedContext);
  if (context === undefined) {
    throw new Error('useCompletedContext must be used within a CompletedProvider');
  }
  return context;
}; 