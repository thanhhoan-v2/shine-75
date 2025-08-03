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
    // Load completed problems from API
    const loadCompletedProblems = async () => {
      try {
        const response = await fetch('/api/completed');
        if (response.ok) {
          const problems = await response.json();
          setCompletedProblems(problems);
        } else if (response.status === 401) {
          // User is not authenticated, set empty completed problems
          setCompletedProblems([]);
        }
      } catch (error) {
        console.error('Error loading completed problems from API:', error);
        setCompletedProblems([]);
      } finally {
        setIsLoaded(true);
      }
    };

    loadCompletedProblems();
  }, []);

  const isCompleted = (problemTitle: string) => {
    return completedProblems.includes(problemTitle);
  };

  const toggleCompleted = async (problemTitle: string) => {
    try {
      if (isCompleted(problemTitle)) {
        const response = await fetch('/api/completed', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: problemTitle })
        });
        
        if (response.ok) {
          setCompletedProblems(prev => prev.filter(title => title !== problemTitle));
        } else if (response.status === 401) {
          console.log('User needs to authenticate to manage completed problems');
        }
      } else {
        const response = await fetch('/api/completed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: problemTitle })
        });
        
        if (response.ok) {
          setCompletedProblems(prev => [...prev, problemTitle]);
        } else if (response.status === 401) {
          console.log('User needs to authenticate to manage completed problems');
        }
      }
    } catch (error) {
      console.error('Error toggling completed problem:', error);
    }
  };

  const removeCompleted = async (problemTitle: string) => {
    try {
      const response = await fetch('/api/completed', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: problemTitle })
      });
      
      if (response.ok) {
        setCompletedProblems(prev => prev.filter(title => title !== problemTitle));
      } else if (response.status === 401) {
        console.log('User needs to authenticate to manage completed problems');
      }
    } catch (error) {
      console.error('Error removing completed problem:', error);
    }
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