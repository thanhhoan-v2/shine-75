export interface Problem {
  id: number;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

export interface Pattern {
  name: string;
  description: string;
  totalProblems: number;
  completed: number;
  problems: Problem[];
}

export const studyPlan: Record<string, Pattern> = {
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
  'Graph Traversal': {
    name: 'Graph Traversal',
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
  'Bit Manipulation': {
    name: 'Bit Manipulation',
    description: 'Manipulate individual bits for efficient solutions',
    totalProblems: 5,
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
      { id: 39, name: 'Reverse Bits', difficulty: 'Easy', category: 'Binary' },
    ],
  },
  'Hash Table': {
    name: 'Hash Table',
    description: 'Fast lookups and frequency counting',
    totalProblems: 1,
    completed: 0,
    problems: [
      { id: 7, name: 'Valid Anagram', difficulty: 'Easy', category: 'String' },
    ],
  },
  'Heap': {
    name: 'Heap',
    description:
      'Maintain elements in sorted order for quick access to min/max',
    totalProblems: 1,
    completed: 0,
    problems: [
      {
        id: 8,
        name: 'Find K Closest Elements',
        difficulty: 'Medium',
        category: 'Heap',
      },
    ],
  },
  'Linked List': {
    name: 'Linked List',
    description: 'Pointer manipulation and linked list operations',
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
        id: 35,
        name: 'Remove Nth Node From End of List',
        difficulty: 'Medium',
        category: 'Linked List',
      },
      {
        id: 33,
        name: 'Reorder List',
        difficulty: 'Medium',
        category: 'Linked List',
      },
      {
        id: 21,
        name: 'Reverse Nodes in k-Group',
        difficulty: 'Hard',
        category: 'Linked List',
      },
    ],
  },
  'Stack': {
    name: 'Stack',
    description:
      'LIFO data structure for parsing, matching, and monotonic problems',
    totalProblems: 1,
    completed: 0,
    problems: [
      {
        id: 2,
        name: 'Trapping Rain Water',
        difficulty: 'Hard',
        category: 'Stack',
      },
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
  Backtracking: {
    name: 'Backtracking',
    description: 'Explore all possible solutions and backtrack when needed',
    totalProblems: 8,
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
};
