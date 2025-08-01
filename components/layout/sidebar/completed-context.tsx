'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface CompletedContextType {
  completedProblems: string[];
  isCompleted: (problemTitle: string) => boolean;
  toggleCompleted: (problemTitle: string) => void;
  removeCompleted: (problemTitle: string) => void;
  isLoaded: boolean;
}

const CompletedContext = createContext<CompletedContextType | undefined>(undefined);

export const CompletedProvider = ({ children }: { children: React.ReactNode }) => {
  const [completedProblems, setCompletedProblems] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load completed problems from localStorage
    const stored = localStorage.getItem('completed-problems');
    if (stored) {
      try {
        setCompletedProblems(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing completed problems:', error);
        setCompletedProblems([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Save completed problems to localStorage whenever it changes
    if (isLoaded) {
      localStorage.setItem('completed-problems', JSON.stringify(completedProblems));
    }
  }, [completedProblems, isLoaded]);

  const isCompleted = (problemTitle: string) => {
    return completedProblems.includes(problemTitle);
  };

  const toggleCompleted = (problemTitle: string) => {
    setCompletedProblems(prev => {
      if (prev.includes(problemTitle)) {
        return prev.filter(title => title !== problemTitle);
      } else {
        return [...prev, problemTitle];
      }
    });
  };

  const removeCompleted = (problemTitle: string) => {
    setCompletedProblems(prev => prev.filter(title => title !== problemTitle));
  };

  return (
    <CompletedContext.Provider value={{ completedProblems, isCompleted, toggleCompleted, removeCompleted, isLoaded }}>
      {children}
    </CompletedContext.Provider>
  );
};

export const useCompleted = () => {
  const context = useContext(CompletedContext);
  if (context === undefined) {
    throw new Error('useCompleted must be used within a CompletedProvider');
  }
  return context;
}; 