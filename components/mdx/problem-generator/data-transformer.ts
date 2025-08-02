import { getAllPatterns, studyPlan } from '@/lib/db';
import { Problem, Topic } from './types';

// Pattern slug mapping
const patternSlugMap: Record<string, string> = {
  Backtracking: 'backtracking',
  'Bit Manipulation': 'bit-manipulation',
  'Cyclic Sort': 'cyclic-sort',
  'Fast & Slow Pointers': 'fast-slow-pointers',
  'Graph Traversal': 'graph-traversal',
  'Hash Table': 'hash-table',
  Heap: 'heap',
  'Linked List': 'linked-list',
  'Merge Intervals': 'merge-intervals',
  'Sliding Window': 'sliding-window',
  Stack: 'stack',
  'Topological Sort': 'topological-sort',
  'Tree Traversal': 'tree-traversal',
  'Two Pointers': 'two-pointers',
};

export const transformProblems = (): Topic[] => {
  const patterns = getAllPatterns();

  return patterns.map((patternName) => {
    const pattern = studyPlan[patternName];

    const slug =
      patternSlugMap[patternName] ||
      patternName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[&]/g, '')
        .replace(/[()]/g, '') // Remove parentheses
        .replace(/--/g, '-');

    // Transform problems to match our interface
    const problems: Problem[] = pattern.problems.map((problem, index) => ({
      title: problem.name,
      difficulty: problem.difficulty,
      description: `Practice ${problem.name} - ${problem.category} problem`, // Placeholder description
      timeLimit:
        problem.difficulty === 'Easy'
          ? '15 mins'
          : problem.difficulty === 'Medium'
          ? '25 mins'
          : '35 mins',
      week: Math.floor(index / 3) + 1, // Distribute across weeks
      tags: [problem.category, patternName],
      slug: `${slug}/${problem.name.toLowerCase().replace(/\s+/g, '-')}`,
    }));

    return {
      name: patternName,
      slug,
      problems,
    };
  });
};

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'Easy':
      return 'text-green-600 bg-green-100';
    case 'Medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'Hard':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export const difficulties = ['Easy', 'Medium', 'Hard'] as const; 