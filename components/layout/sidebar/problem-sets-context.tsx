'use client';

import { studyPlan } from '@/lib/data/patterns';
import { useCreateProblemSet, useDeleteProblemSet, useProblemSets as useProblemSetsQuery } from '@/lib/hooks';
import { createContext, ReactNode, useContext } from 'react';

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
  userId?: string;
}

interface ProblemSetsContextType {
  problemSets: ProblemSet[];
  addProblemSet: (problemSet: Omit<ProblemSet, 'id' | 'createdAt'>) => Promise<void>;
  removeProblemSet: (id: number) => Promise<void>;
  getProblemSet: (id: number) => ProblemSet | undefined;
  isLoaded: boolean;
  isLoading: boolean;
}

const ProblemSetsContext = createContext<ProblemSetsContextType | null>(null);

// Helper function to find the actual difficulty of a problem
const findProblemDifficulty = (problemTitle: string): string => {
  for (const pattern of Object.values(studyPlan)) {
    const problem = pattern.problems.find(p => p.name === problemTitle);
    if (problem) {
      return problem.difficulty;
    }
  }
  return 'Medium'; // Fallback if problem not found
};

export function ProblemSetsProvider({ children }: { children: ReactNode }) {
  const { data: dbProblemSets = [], isLoading, error } = useProblemSetsQuery();
  const createProblemSetMutation = useCreateProblemSet();
  const deleteProblemSetMutation = useDeleteProblemSet();

  // Transform database problem sets to our internal format
  const problemSets: ProblemSet[] = dbProblemSets.map((dbSet: any) => {
    // Reconstruct Problem objects from stored data with actual difficulties
    const problems: Problem[] = (dbSet.problems || []).map((problemTitle: string) => ({
      title: problemTitle,
      difficulty: findProblemDifficulty(problemTitle), // Use actual difficulty
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
      difficulty: dbSet.difficulty,
      userId: dbSet.user_id
    };
  });

  const addProblemSet = async (problemSetData: Omit<ProblemSet, 'id' | 'createdAt'>) => {
    await createProblemSetMutation.mutateAsync({
      name: problemSetData.name,
      description: problemSetData.description || '',
      problems: problemSetData.problems,
      topic: problemSetData.topic || '',
      difficulty: problemSetData.difficulty || ''
    });
  };

  const removeProblemSet = async (id: number) => {
    await deleteProblemSetMutation.mutateAsync(id);
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
        isLoaded: !isLoading && !error,
        isLoading
      }}
    >
      {children}
    </ProblemSetsContext.Provider>
  );
}

export function useProblemSetsContext() {
  const context = useContext(ProblemSetsContext);
  if (!context) {
    throw new Error('useProblemSetsContext must be used within a ProblemSetsProvider');
  }
  return context;
} 