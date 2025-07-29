interface Problem {
  id: number;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

interface Pattern {
  name: string;
  description: string;
  totalProblems: number;
  completed: number;
  problems: Problem[];
}

const studyPlan: Record<string, Pattern> = {
  'Two Pointers': {
    name: 'Two Pointers',
    description:
      'Use two pointers moving towards each other or in same direction',
    totalProblems: 12,
    completed: 0,
    problems: [
      { id: 1, name: 'Two Sum', difficulty: 'Easy', category: 'Array' },
      {
        id: 5,
        name: 'Valid Palindrome',
        difficulty: 'Easy',
        category: 'String',
      },
      { id: 34, name: 'Move Zeroes', difficulty: 'Easy', category: 'Array' },
      {
        id: 41,
        name: 'Squares of a Sorted Array',
        difficulty: 'Easy',
        category: 'Array',
      },
      { id: 47, name: '3Sum', difficulty: 'Medium', category: 'Array' },
      {
        id: 18,
        name: 'Container With Most Water',
        difficulty: 'Medium',
        category: 'Array',
      },
      { id: 8, name: 'Sort Colors', difficulty: 'Medium', category: 'Array' },
      {
        id: 35,
        name: 'Remove Nth Node From End of List',
        difficulty: 'Medium',
        category: 'Linked List',
      },
      { id: 3, name: 'Rotate Array', difficulty: 'Medium', category: 'Array' },
      { id: 37, name: '3Sum Closest', difficulty: 'Medium', category: 'Array' },
      {
        id: 33,
        name: 'Reorder List',
        difficulty: 'Medium',
        category: 'Linked List',
      },
      {
        id: 2,
        name: 'Trapping Rain Water',
        difficulty: 'Hard',
        category: 'Stack',
      },
    ],
  },
  'Sliding Window': {
    name: 'Sliding Window',
    description:
      'Maintain a window of elements and slide it across the array/string',
    totalProblems: 8,
    completed: 0,
    problems: [
      {
        id: 4,
        name: 'Best Time to Buy and Sell Stock',
        difficulty: 'Easy',
        category: 'Array',
      },
      {
        id: 46,
        name: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        category: 'String',
      },
      {
        id: 21,
        name: 'Find All Anagrams in a String',
        difficulty: 'Medium',
        category: 'String',
      },
      {
        id: 9,
        name: 'Longest Repeating Character Replacement',
        difficulty: 'Medium',
        category: 'String',
      },
      {
        id: 8,
        name: 'Find K Closest Elements',
        difficulty: 'Medium',
        category: 'Heap',
      },
      {
        id: 17,
        name: 'Subarray Sum Equals K',
        difficulty: 'Medium',
        category: 'Array',
      },
      {
        id: 44,
        name: 'Minimum Window Substring',
        difficulty: 'Hard',
        category: 'String',
      },
      {
        id: 19,
        name: 'Sliding Window Maximum',
        difficulty: 'Hard',
        category: 'Array',
      },
    ],
  },
  'Fast & Slow Pointers': {
    name: 'Fast & Slow Pointers',
    description:
      "Use two pointers moving at different speeds (Floyd's algorithm)",
    totalProblems: 6,
    completed: 0,
    problems: [
      {
        id: 12,
        name: 'Linked List Cycle',
        difficulty: 'Easy',
        category: 'Linked List',
      },
      {
        id: 22,
        name: 'Middle of the Linked List',
        difficulty: 'Easy',
        category: 'Linked List',
      },
      {
        id: 33,
        name: 'Palindrome Linked List',
        difficulty: 'Easy',
        category: 'Linked List',
      },
      {
        id: 37,
        name: 'Find the Duplicate Number',
        difficulty: 'Medium',
        category: 'Binary',
      },
      {
        id: 2,
        name: 'Longest Consecutive Sequence',
        difficulty: 'Medium',
        category: 'Array',
      },
      {
        id: 21,
        name: 'Reverse Nodes in k-Group',
        difficulty: 'Hard',
        category: 'Linked List',
      },
    ],
  },
  'Merge Intervals': {
    name: 'Merge Intervals',
    description: 'Deal with overlapping intervals',
    totalProblems: 6,
    completed: 0,
    problems: [
      { id: 25, name: 'Meeting Rooms', difficulty: 'Easy', category: 'Array' },
      {
        id: 43,
        name: 'Insert Interval',
        difficulty: 'Medium',
        category: 'Array',
      },
      {
        id: 4,
        name: 'Merge Intervals',
        difficulty: 'Medium',
        category: 'Array',
      },
      {
        id: 30,
        name: 'Meeting Rooms II',
        difficulty: 'Medium',
        category: 'Array',
      },
      {
        id: 43,
        name: 'Non-overlapping Intervals',
        difficulty: 'Medium',
        category: 'Array',
      },
      {
        id: 15,
        name: 'Employee Free Time',
        difficulty: 'Hard',
        category: 'Array',
      },
    ],
  },
  'Cyclic Sort': {
    name: 'Cyclic Sort',
    description: 'Sort array where numbers are in a given range',
    totalProblems: 3,
    completed: 0,
    problems: [
      {
        id: 24,
        name: 'Contains Duplicate',
        difficulty: 'Easy',
        category: 'Array',
      },
      {
        id: 36,
        name: 'Missing Number',
        difficulty: 'Easy',
        category: 'Binary',
      },
      {
        id: 23,
        name: 'First Missing Positive',
        difficulty: 'Hard',
        category: 'Hash Table',
      },
    ],
  },
  'Binary Search': {
    name: 'Binary Search',
    description: 'Search in sorted arrays or search spaces',
    totalProblems: 8,
    completed: 0,
    problems: [
      {
        id: 8,
        name: 'Binary Search',
        difficulty: 'Easy',
        category: 'Binary Search',
      },
      {
        id: 14,
        name: 'First Bad Version',
        difficulty: 'Easy',
        category: 'Binary Search',
      },
      {
        id: 1,
        name: 'Search in Rotated Sorted Array',
        difficulty: 'Medium',
        category: 'Binary Search',
      },
      {
        id: 6,
        name: 'Time Based Key-Value Store',
        difficulty: 'Medium',
        category: 'Binary Search',
      },
      {
        id: 27,
        name: 'Search a 2D Matrix',
        difficulty: 'Medium',
        category: 'Binary Search',
      },
      {
        id: 39,
        name: 'Find Minimum in Rotated Sorted Array',
        difficulty: 'Medium',
        category: 'Binary Search',
      },
      {
        id: 6,
        name: 'Maximum Profit in Job Scheduling',
        difficulty: 'Hard',
        category: 'Binary Search',
      },
      {
        id: 11,
        name: 'Median of Two Sorted Arrays',
        difficulty: 'Hard',
        category: 'Binary Search',
      },
    ],
  },
  'Tree Traversal': {
    name: 'Tree Traversal',
    description: 'DFS and BFS on trees',
    totalProblems: 18,
    completed: 0,
    problems: [
      {
        id: 6,
        name: 'Invert Binary Tree',
        difficulty: 'Easy',
        category: 'Binary Tree',
      },
      {
        id: 11,
        name: 'Balanced Binary Tree',
        difficulty: 'Easy',
        category: 'Binary Tree',
      },
      {
        id: 21,
        name: 'Diameter of Binary Tree',
        difficulty: 'Easy',
        category: 'Binary Tree',
      },
      {
        id: 23,
        name: 'Maximum Depth of Binary Tree',
        difficulty: 'Easy',
        category: 'Binary Tree',
      },
      {
        id: 29,
        name: 'Same Tree',
        difficulty: 'Easy',
        category: 'Binary Tree',
      },
      {
        id: 35,
        name: 'Symmetric Tree',
        difficulty: 'Easy',
        category: 'Binary Tree',
      },
      {
        id: 40,
        name: 'Subtree of Another Tree',
        difficulty: 'Easy',
        category: 'Binary Tree',
      },
      {
        id: 10,
        name: 'Lowest Common Ancestor of a Binary Search Tree',
        difficulty: 'Easy',
        category: 'Binary Search Tree',
      },
      {
        id: 38,
        name: 'Convert Sorted Array to Binary Search Tree',
        difficulty: 'Easy',
        category: 'Binary Search Tree',
      },
      {
        id: 48,
        name: 'Binary Tree Level Order Traversal',
        difficulty: 'Medium',
        category: 'Binary Tree',
      },
      {
        id: 56,
        name: 'Validate Binary Search Tree',
        difficulty: 'Medium',
        category: 'Binary Search Tree',
      },
      {
        id: 5,
        name: 'Lowest Common Ancestor of a Binary Tree',
        difficulty: 'Medium',
        category: 'Binary Tree',
      },
      {
        id: 14,
        name: 'Binary Tree Right Side View',
        difficulty: 'Medium',
        category: 'Binary Tree',
      },
      {
        id: 17,
        name: 'Construct Binary Tree from Preorder and Inorder Traversal',
        difficulty: 'Medium',
        category: 'Binary Tree',
      },
      {
        id: 25,
        name: 'Kth Smallest Element in a BST',
        difficulty: 'Medium',
        category: 'Binary Search Tree',
      },
      {
        id: 1,
        name: 'Path Sum II',
        difficulty: 'Medium',
        category: 'Binary Tree',
      },
      {
        id: 1,
        name: 'Serialize and Deserialize Binary Tree',
        difficulty: 'Hard',
        category: 'Binary Tree',
      },
      {
        id: 9,
        name: 'Binary Tree Maximum Path Sum',
        difficulty: 'Hard',
        category: 'Binary Tree',
      },
    ],
  },
  'Graph Traversal (BFS/DFS)': {
    name: 'Graph Traversal (BFS/DFS)',
    description: 'Breadth-First Search and Depth-First Search on graphs',
    totalProblems: 15,
    completed: 0,
    problems: [
      { id: 9, name: 'Flood Fill', difficulty: 'Easy', category: 'Graph' },
      { id: 44, name: '01 Matrix', difficulty: 'Medium', category: 'Graph' },
      { id: 49, name: 'Clone Graph', difficulty: 'Medium', category: 'Graph' },
      {
        id: 57,
        name: 'Number of Islands',
        difficulty: 'Medium',
        category: 'Graph',
      },
      {
        id: 58,
        name: 'Rotting Oranges',
        difficulty: 'Medium',
        category: 'Graph',
      },
      {
        id: 7,
        name: 'Accounts Merge',
        difficulty: 'Medium',
        category: 'Graph',
      },
      { id: 20, name: 'Word Search', difficulty: 'Medium', category: 'Graph' },
      {
        id: 34,
        name: 'Pacific Atlantic Water Flow',
        difficulty: 'Medium',
        category: 'Graph',
      },
      {
        id: 36,
        name: 'Shortest Path to Get Food',
        difficulty: 'Medium',
        category: 'Graph',
      },
      {
        id: 40,
        name: 'Graph Valid Tree',
        difficulty: 'Medium',
        category: 'Graph',
      },
      {
        id: 15,
        name: 'Number of Connected Components in an Undirected Graph',
        difficulty: 'Medium',
        category: 'Graph',
      },
      {
        id: 16,
        name: 'Minimum Knight Moves',
        difficulty: 'Medium',
        category: 'Graph',
      },
      { id: 4, name: 'Word Ladder', difficulty: 'Hard', category: 'Graph' },
      {
        id: 12,
        name: 'Longest Increasing Path in a Matrix',
        difficulty: 'Hard',
        category: 'Graph',
      },
      { id: 18, name: 'Bus Routes', difficulty: 'Hard', category: 'Graph' },
    ],
  },
  'Topological Sort': {
    name: 'Topological Sort',
    description: 'Linear ordering of vertices in a directed graph',
    totalProblems: 3,
    completed: 0,
    problems: [
      {
        id: 51,
        name: 'Course Schedule',
        difficulty: 'Medium',
        category: 'Graph',
      },
      {
        id: 41,
        name: 'Course Schedule II',
        difficulty: 'Medium',
        category: 'Graph',
      },
      {
        id: 17,
        name: 'Alien Dictionary',
        difficulty: 'Hard',
        category: 'Graph',
      },
    ],
  },
  'Dynamic Programming': {
    name: 'Dynamic Programming',
    description: 'Break down problems into overlapping subproblems',
    totalProblems: 12,
    completed: 0,
    problems: [
      {
        id: 16,
        name: 'Climbing Stairs',
        difficulty: 'Easy',
        category: 'Dynamic Programming',
      },
      {
        id: 42,
        name: 'Maximum Subarray',
        difficulty: 'Medium',
        category: 'Dynamic Programming',
      },
      {
        id: 53,
        name: 'Coin Change',
        difficulty: 'Medium',
        category: 'Dynamic Programming',
      },
      {
        id: 10,
        name: 'Partition Equal Subset Sum',
        difficulty: 'Medium',
        category: 'Dynamic Programming',
      },
      {
        id: 16,
        name: 'Unique Paths',
        difficulty: 'Medium',
        category: 'Dynamic Programming',
      },
      {
        id: 27,
        name: 'House Robber',
        difficulty: 'Medium',
        category: 'Dynamic Programming',
      },
      {
        id: 32,
        name: 'Maximum Product Subarray',
        difficulty: 'Medium',
        category: 'Dynamic Programming',
      },
      {
        id: 39,
        name: 'Longest Increasing Subsequence',
        difficulty: 'Medium',
        category: 'Dynamic Programming',
      },
      {
        id: 11,
        name: 'Jump Game',
        difficulty: 'Medium',
        category: 'Dynamic Programming',
      },
      {
        id: 21,
        name: 'Maximal Square',
        difficulty: 'Medium',
        category: 'Dynamic Programming',
      },
      {
        id: 29,
        name: 'Decode Ways',
        difficulty: 'Medium',
        category: 'Dynamic Programming',
      },
      {
        id: 41,
        name: 'Combination Sum IV',
        difficulty: 'Medium',
        category: 'Dynamic Programming',
      },
    ],
  },
  Backtracking: {
    name: 'Backtracking',
    description: 'Explore all possible solutions and backtrack when needed',
    totalProblems: 9,
    completed: 0,
    problems: [
      {
        id: 2,
        name: 'Combination Sum',
        difficulty: 'Medium',
        category: 'Array',
      },
      {
        id: 3,
        name: 'Permutations',
        difficulty: 'Medium',
        category: 'Recursion',
      },
      { id: 13, name: 'Subsets', difficulty: 'Medium', category: 'Recursion' },
      {
        id: 19,
        name: 'Letter Combinations of a Phone Number',
        difficulty: 'Medium',
        category: 'Recursion',
      },
      { id: 20, name: 'Word Search', difficulty: 'Medium', category: 'Graph' },
      {
        id: 13,
        name: 'Generate Parentheses',
        difficulty: 'Medium',
        category: 'Recursion',
      },
      { id: 16, name: 'Word Search II', difficulty: 'Hard', category: 'Graph' },
      { id: 22, name: 'Sudoku Solver', difficulty: 'Hard', category: 'Matrix' },
      { id: 24, name: 'N-Queens', difficulty: 'Hard', category: 'Recursion' },
    ],
  },
  Stack: {
    name: 'Stack',
    description:
      'LIFO data structure for parsing, matching, and monotonic problems',
    totalProblems: 12,
    completed: 0,
    problems: [
      {
        id: 2,
        name: 'Valid Parentheses',
        difficulty: 'Easy',
        category: 'Stack',
      },
      {
        id: 13,
        name: 'Implement Queue using Stacks',
        difficulty: 'Easy',
        category: 'Stack',
      },
      {
        id: 27,
        name: 'Backspace String Compare',
        difficulty: 'Easy',
        category: 'Stack',
      },
      {
        id: 50,
        name: 'Evaluate Reverse Polish Notation',
        difficulty: 'Medium',
        category: 'Stack',
      },
      { id: 55, name: 'Min Stack', difficulty: 'Medium', category: 'Stack' },
      {
        id: 26,
        name: 'Daily Temperatures',
        difficulty: 'Medium',
        category: 'Stack',
      },
      { id: 5, name: 'Decode String', difficulty: 'Medium', category: 'Stack' },
      {
        id: 18,
        name: 'Asteroid Collision',
        difficulty: 'Medium',
        category: 'Stack',
      },
      {
        id: 40,
        name: 'Basic Calculator II',
        difficulty: 'Medium',
        category: 'Stack',
      },
      {
        id: 5,
        name: 'Basic Calculator',
        difficulty: 'Hard',
        category: 'Stack',
      },
      {
        id: 8,
        name: 'Largest Rectangle in Histogram',
        difficulty: 'Hard',
        category: 'Stack',
      },
      {
        id: 13,
        name: 'Longest Valid Parentheses',
        difficulty: 'Hard',
        category: 'Stack',
      },
    ],
  },
  'Heap (Priority Queue)': {
    name: 'Heap (Priority Queue)',
    description:
      'Maintain elements in sorted order for quick access to min/max',
    totalProblems: 8,
    completed: 0,
    problems: [
      {
        id: 45,
        name: 'K Closest Points to Origin',
        difficulty: 'Medium',
        category: 'Heap',
      },
      {
        id: 23,
        name: 'Task Scheduler',
        difficulty: 'Medium',
        category: 'Heap',
      },
      {
        id: 38,
        name: 'Top K Frequent Words',
        difficulty: 'Medium',
        category: 'Heap',
      },
      {
        id: 20,
        name: 'Kth Largest Element in an Array',
        difficulty: 'Medium',
        category: 'Heap',
      },
      {
        id: 3,
        name: 'Find Median from Data Stream',
        difficulty: 'Hard',
        category: 'Heap',
      },
      {
        id: 7,
        name: 'Merge k Sorted Lists',
        difficulty: 'Hard',
        category: 'Heap',
      },
      {
        id: 10,
        name: 'Maximum Frequency Stack',
        difficulty: 'Hard',
        category: 'Stack',
      },
      {
        id: 25,
        name: 'Smallest Range Covering Elements from K Lists',
        difficulty: 'Hard',
        category: 'Heap',
      },
    ],
  },
  Trie: {
    name: 'Trie',
    description: 'Prefix tree for string searching and word problems',
    totalProblems: 4,
    completed: 0,
    problems: [
      {
        id: 52,
        name: 'Implement Trie (Prefix Tree)',
        difficulty: 'Medium',
        category: 'Trie',
      },
      { id: 9, name: 'Word Break', difficulty: 'Medium', category: 'Trie' },
      {
        id: 33,
        name: 'Design Add and Search Words Data Structure',
        difficulty: 'Medium',
        category: 'Trie',
      },
      {
        id: 14,
        name: 'Design In-Memory File System',
        difficulty: 'Hard',
        category: 'Trie',
      },
    ],
  },
  'Hash Table': {
    name: 'Hash Table',
    description: 'Fast lookups and frequency counting',
    totalProblems: 6,
    completed: 0,
    problems: [
      {
        id: 15,
        name: 'Ransom Note',
        difficulty: 'Easy',
        category: 'Hash Table',
      },
      {
        id: 19,
        name: 'Majority Element',
        difficulty: 'Easy',
        category: 'Array',
      },
      { id: 7, name: 'Valid Anagram', difficulty: 'Easy', category: 'String' },
      {
        id: 31,
        name: 'Group Anagrams',
        difficulty: 'Medium',
        category: 'String',
      },
      {
        id: 6,
        name: 'Contiguous Array',
        difficulty: 'Medium',
        category: 'Array',
      },
      {
        id: 42,
        name: 'Insert Delete GetRandom O(1)',
        difficulty: 'Medium',
        category: 'Hash Table',
      },
    ],
  },
  'Bit Manipulation': {
    name: 'Bit Manipulation',
    description: 'Manipulate individual bits for efficient solutions',
    totalProblems: 6,
    completed: 0,
    problems: [
      { id: 20, name: 'Add Binary', difficulty: 'Easy', category: 'Binary' },
      { id: 28, name: 'Counting Bits', difficulty: 'Easy', category: 'Binary' },
      {
        id: 30,
        name: 'Number of 1 Bits',
        difficulty: 'Easy',
        category: 'Binary',
      },
      { id: 32, name: 'Single Number', difficulty: 'Easy', category: 'Binary' },
      {
        id: 36,
        name: 'Missing Number',
        difficulty: 'Easy',
        category: 'Binary',
      },
      { id: 39, name: 'Reverse Bits', difficulty: 'Easy', category: 'Binary' },
    ],
  },
  Math: {
    name: 'Math',
    description: 'Mathematical algorithms and number theory',
    totalProblems: 5,
    completed: 0,
    problems: [
      {
        id: 26,
        name: 'Roman to Integer',
        difficulty: 'Easy',
        category: 'Math',
      },
      {
        id: 37,
        name: 'Palindrome Number',
        difficulty: 'Easy',
        category: 'Math',
      },
      {
        id: 19,
        name: 'Random Pick with Weight',
        difficulty: 'Medium',
        category: 'Math',
      },
      { id: 26, name: 'Pow(x, n)', difficulty: 'Medium', category: 'Math' },
      {
        id: 31,
        name: 'Reverse Integer',
        difficulty: 'Medium',
        category: 'Math',
      },
    ],
  },
  'Linked List': {
    name: 'Linked List',
    description: 'Pointer manipulation and linked list operations',
    totalProblems: 8,
    completed: 0,
    problems: [
      {
        id: 3,
        name: 'Merge Two Sorted Lists',
        difficulty: 'Easy',
        category: 'Linked List',
      },
      {
        id: 18,
        name: 'Reverse Linked List',
        difficulty: 'Easy',
        category: 'Linked List',
      },
      {
        id: 24,
        name: 'LRU Cache',
        difficulty: 'Medium',
        category: 'Linked List',
      },
      {
        id: 42,
        name: 'Swap Nodes in Pairs',
        difficulty: 'Medium',
        category: 'Linked List',
      },
      {
        id: 4,
        name: 'Odd Even Linked List',
        difficulty: 'Medium',
        category: 'Linked List',
      },
      {
        id: 12,
        name: 'Add Two Numbers',
        difficulty: 'Medium',
        category: 'Linked List',
      },
      {
        id: 14,
        name: 'Sort List',
        difficulty: 'Medium',
        category: 'Linked List',
      },
      {
        id: 38,
        name: 'Rotate List',
        difficulty: 'Medium',
        category: 'Linked List',
      },
    ],
  },
};

// Helper functions to work with the data
const getAllPatterns = (): string[] => {
  return Object.keys(studyPlan);
};

const getTotalProblemsByPattern = (patternName: string): number => {
  return studyPlan[patternName]?.totalProblems || 0;
};

const getTotalProblems = (): number => {
  return Object.values(studyPlan).reduce(
    (total, pattern) => total + pattern.totalProblems,
    0
  );
};

const getTotalCompleted = (): number => {
  return Object.values(studyPlan).reduce(
    (total, pattern) => total + pattern.completed,
    0
  );
};

const getProblemsByDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
  return Object.values(studyPlan).flatMap((pattern) =>
    pattern.problems.filter((problem) => problem.difficulty === difficulty)
  );
};

const getPatternProgress = (
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

const getPatternsByDifficultyDistribution = () => {
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

const getRecommendedStudyOrder = (): string[] => {
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
 * Get difficulty from pathname
 * @param pathname - Pathname like "docs/two-pointers/3sum", "/docs/two-pointers/3sum", or "two-pointers/squares-of-a-sorted-array"
 * @returns The difficulty of the problem or null if not found
 */
const getDifficultyFromPathname = (pathname: string): 'Easy' | 'Medium' | 'Hard' | null => {
  // Remove leading slash and "docs/" prefix if present
  const cleanPath = pathname.replace(/^\/?docs\//, '');
  
  // Split the path to get pattern and problem name
  const pathParts = cleanPath.split('/');
  if (pathParts.length < 2) return null;
  
  const directoryName = pathParts[0];
  const problemSlug = pathParts[1];
  
  // Mapping from directory names to pattern names
  const directoryToPatternMap: Record<string, string> = {
    'two-pointers': 'Two Pointers',
    'sliding-window': 'Sliding Window',
    'fast-slow-pointers': 'Fast & Slow Pointers',
    'merge-intervals': 'Merge Intervals',
    'cyclic-sort': 'Cyclic Sort',
    'binary-search': 'Binary Search',
    'tree-traversal': 'Tree Traversal',
    'graph-traversal': 'Graph Traversal (BFS/DFS)',
    'topological-sort': 'Topological Sort',
    'backtracking': 'Backtracking',
    'hash-table': 'Hash Table',
    'bit-manipulation': 'Bit Manipulation',
    'linked-list': 'Linked List',
    'dynamic-programming': 'Dynamic Programming',
    'heap': 'Heap (Priority Queue)',
  };
  
  const patternName = directoryToPatternMap[directoryName];
  if (!patternName) return null;
  
  // Find the pattern in study plan
  const pattern = studyPlan[patternName];
  if (!pattern) return null;
  
  // Find the problem by matching the slug
  const problem = pattern.problems.find(p => {
    // Convert problem name to slug format (lowercase, hyphenated)
    const problemSlugFromName = p.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    return problemSlugFromName === problemSlug;
  });
  
  return problem?.difficulty || null;
};

// Export the main object and helper functions
export {
  getAllPatterns, getDifficultyFromPathname, getPatternProgress,
  getPatternsByDifficultyDistribution,
  getProblemsByDifficulty,
  getRecommendedStudyOrder,
  getTotalCompleted,
  getTotalProblems,
  getTotalProblemsByPattern, studyPlan
};

  export type { Pattern, Problem };

