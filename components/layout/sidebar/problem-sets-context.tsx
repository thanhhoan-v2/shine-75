'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface Problem {
  title: string;
  difficulty: string;
  description: string;
  timeLimit: string;
  week: number;
  tags: string[];
  slug: string;
}

interface ProblemSet {
  id: string;
  name: string;
  problems: Problem[];
  createdAt: string;
  topic?: string;
  difficulty?: string;
}

interface ProblemSetsContextType {
  problemSets: ProblemSet[];
  addProblemSet: (problemSet: Omit<ProblemSet, 'id' | 'createdAt'>) => void;
  removeProblemSet: (id: string) => void;
  getProblemSet: (id: string) => ProblemSet | undefined;
  isLoaded: boolean;
}

const ProblemSetsContext = createContext<ProblemSetsContextType | null>(null);

const STORAGE_KEY = 'shine75-problem-sets';

// Helper function to load problem sets from localStorage
function loadProblemSetsFromStorage(): ProblemSet[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const problemSetsArray = JSON.parse(stored);
      return Array.isArray(problemSetsArray) ? problemSetsArray : [];
    }
  } catch (error) {
    console.error('Failed to load problem sets from localStorage:', error);
  }
  
  return [];
}

// Helper function to save problem sets to localStorage
function saveProblemSetsToStorage(problemSets: ProblemSet[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(problemSets));
  } catch (error) {
    console.error('Failed to save problem sets to localStorage:', error);
  }
}

export function ProblemSetsProvider({ children }: { children: ReactNode }) {
  const [problemSets, setProblemSets] = useState<ProblemSet[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load problem sets from localStorage on mount (client-side only)
  useEffect(() => {
    const storedProblemSets = loadProblemSetsFromStorage();
    setProblemSets(storedProblemSets);
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever problem sets change
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      saveProblemSetsToStorage(problemSets);
    }
  }, [problemSets, isLoaded]);

  const addProblemSet = (problemSetData: Omit<ProblemSet, 'id' | 'createdAt'>) => {
    const newProblemSet: ProblemSet = {
      ...problemSetData,
      id: `problem-set-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    
    setProblemSets(prev => [newProblemSet, ...prev]);
  };

  const removeProblemSet = (id: string) => {
    setProblemSets(prev => prev.filter(problemSet => problemSet.id !== id));
  };

  const getProblemSet = (id: string) => {
    return problemSets.find(problemSet => problemSet.id === id);
  };

  return (
    <ProblemSetsContext.Provider 
      value={{ 
        problemSets, 
        addProblemSet, 
        removeProblemSet, 
        getProblemSet,
        isLoaded
      }}
    >
      {children}
    </ProblemSetsContext.Provider>
  );
}

export function useProblemSets() {
  const context = useContext(ProblemSetsContext);
  if (!context) {
    throw new Error('useProblemSets must be used within a ProblemSetsProvider');
  }
  return context;
} 