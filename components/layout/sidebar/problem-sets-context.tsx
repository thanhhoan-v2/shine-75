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
  id: number;
  name: string;
  problems: Problem[];
  createdAt: string;
  topic?: string;
  difficulty?: string;
  description?: string;
}

interface ProblemSetsContextType {
  problemSets: ProblemSet[];
  addProblemSet: (problemSet: Omit<ProblemSet, 'id' | 'createdAt'>) => Promise<void>;
  removeProblemSet: (id: number) => Promise<void>;
  getProblemSet: (id: number) => ProblemSet | undefined;
  isLoaded: boolean;
}

const ProblemSetsContext = createContext<ProblemSetsContextType | null>(null);

export function ProblemSetsProvider({ children }: { children: ReactNode }) {
  const [problemSets, setProblemSets] = useState<ProblemSet[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load problem sets from API on mount
  useEffect(() => {
    const loadProblemSets = async () => {
      try {
        const response = await fetch('/api/problem-sets');
        if (response.ok) {
          const dbProblemSets = await response.json();
          const formattedProblemSets: ProblemSet[] = dbProblemSets.map((dbSet: any) => {
            // Reconstruct Problem objects from stored data
            const problems: Problem[] = (dbSet.problems || []).map((problemTitle: string) => ({
              title: problemTitle,
              difficulty: 'Medium', // Default difficulty since we only store titles
              description: '',
              timeLimit: '',
              week: 1,
              tags: [],
              slug: problemTitle.toLowerCase().replace(/\s+/g, '-')
            }));
            
            return {
              id: dbSet.id,
              name: dbSet.name,
              problems: problems,
              createdAt: dbSet.created_at || new Date().toISOString(),
              description: dbSet.description,
              topic: dbSet.topic,
              difficulty: dbSet.difficulty
            };
          });
          setProblemSets(formattedProblemSets);
        }
      } catch (error) {
        console.error('Failed to load problem sets from API:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadProblemSets();
  }, []);

  const addProblemSet = async (problemSetData: Omit<ProblemSet, 'id' | 'createdAt'>) => {
    try {
      const problemTitles = problemSetData.problems.map(p => p.title);
      const response = await fetch('/api/problem-sets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: problemSetData.name,
          description: problemSetData.description,
          problems: problemTitles,
          topic: problemSetData.topic,
          difficulty: problemSetData.difficulty
        })
      });
      
      if (response.ok) {
        const { id } = await response.json();
        const newProblemSet: ProblemSet = {
          ...problemSetData,
          id,
          createdAt: new Date().toISOString(),
        };
        
        setProblemSets(prev => [newProblemSet, ...prev]);
      }
    } catch (error) {
      console.error('Failed to add problem set via API:', error);
    }
  };

  const removeProblemSet = async (id: number) => {
    try {
      const response = await fetch(`/api/problem-sets/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setProblemSets(prev => prev.filter(problemSet => problemSet.id !== id));
      }
    } catch (error) {
      console.error('Failed to remove problem set via API:', error);
    }
  };

  const getProblemSet = (id: number) => {
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