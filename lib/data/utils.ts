import { studyPlan } from './patterns';

// Helper functions to work with the data
export const getAllPatterns = (): string[] => {
  return Object.keys(studyPlan);
};

export const getTotalProblemsByPattern = (patternName: string): number => {
  return studyPlan[patternName]?.totalProblems || 0;
};

export const getTotalProblems = (): number => {
  return Object.values(studyPlan).reduce(
    (total, pattern) => total + pattern.totalProblems,
    0
  );
};

export const getTotalCompleted = (): number => {
  return Object.values(studyPlan).reduce(
    (total, pattern) => total + pattern.completed,
    0
  );
};

export const getProblemsByDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
  return Object.values(studyPlan).flatMap((pattern) =>
    pattern.problems.filter((problem) => problem.difficulty === difficulty)
  );
};

export const getPatternProgress = (
  patternName: string
): { completed: number; total: number; percentage: number } => {
  const pattern = studyPlan[patternName];
  if (!pattern) return { completed: 0, total: 0, percentage: 0 };

  const percentage =
    pattern.totalProblems > 0
      ? (pattern.completed / pattern.totalProblems) * 100
      : 0;
  return {
    completed: pattern.completed,
    total: pattern.totalProblems,
    percentage: Math.round(percentage * 100) / 100,
  };
};

export const getPatternsByDifficultyDistribution = () => {
  const distribution: Record<
    string,
    { Easy: number; Medium: number; Hard: number }
  > = {};

  Object.entries(studyPlan).forEach(([patternName, pattern]) => {
    distribution[patternName] = { Easy: 0, Medium: 0, Hard: 0 };
    pattern.problems.forEach((problem) => {
      distribution[patternName][problem.difficulty]++;
    });
  });

  return distribution;
};

export const getRecommendedStudyOrder = (): string[] => {
  // Recommended order based on difficulty and foundational concepts
  return [
    'Two Pointers',
    'Fast & Slow Pointers',
    'Sliding Window',
    'Hash Table',
    'Binary Search',
    'Stack',
    'Linked List',
    'Tree Traversal',
    'Cyclic Sort',
    'Merge Intervals',
    'Bit Manipulation',
    'Math',
    'Graph Traversal (BFS/DFS)',
    'Topological Sort',
    'Dynamic Programming',
    'Backtracking',
    'Heap (Priority Queue)',
    'Trie',
  ];
};

/**
 * Get difficulty from problem name
 * @param problemName - Problem name like "Two Sum", "Valid Palindrome", etc.
 * @returns The difficulty of the problem or null if not found
 */
export const getDifficultyFromPathname = (problemName: string): 'Easy' | 'Medium' | 'Hard' | null => {
  // Search through all patterns to find the problem by name
  for (const pattern of Object.values(studyPlan)) {
    const problem = pattern.problems.find(p => p.name === problemName);
    if (problem) {
      return problem.difficulty;
    }
  }
  
  return null;
}; 