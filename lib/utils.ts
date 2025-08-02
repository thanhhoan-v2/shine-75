import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Category mapping based on the meta.json structure
const CATEGORY_MAPPING: Record<string, string> = {
  'two-pointers': 'Two Pointers',
  'fast-slow-pointers': 'Fast & Slow Pointers',
  'sliding-window': 'Sliding Window',
  'tree-traversal': 'Tree Traversal',
  'cyclic-sort': 'Cyclic Sort',
  'merge-intervals': 'Merge Intervals',
  'bit-manipulation': 'Bit Manipulation',
  'graph-traversal': 'Graph Traversal (BFS/DFS)',
  'topological-sort': 'Topological Sort',
  backtracking: 'Backtracking',
  'hash-table': 'Hash Table',
  'binary-search': 'Binary Search',
  'linked-list': 'Linked List',
  'dynamic-programming': 'Dynamic Programming',
  heap: 'Heap',
};

export function getCategoryFromTitle(title: string): string {
  // Try to find the category by checking the URL structure
  // This is a simplified approach - in a real app, you might want to store category info with favorites
  const normalizedTitle = title.toLowerCase().replace(/\s+/g, '-');

  // Check if the title matches any category pattern
  for (const [categoryKey, categoryName] of Object.entries(CATEGORY_MAPPING)) {
    // This is a basic check - you might want to implement a more sophisticated mapping
    if (
      normalizedTitle.includes(categoryKey) ||
      categoryKey.includes(normalizedTitle)
    ) {
      return categoryName;
    }
  }

  return 'Other';
}

export function getCategoryFromPath(path: string): string {
  if (!path) return 'Other';

  // Extract category from path like "two-pointers/two-sum"
  const pathParts = path.split('/');
  const categoryKey = pathParts[0];

  return CATEGORY_MAPPING[categoryKey] || 'Other';
}

export function getAvailableCategories(): string[] {
  return Object.values(CATEGORY_MAPPING);
}

// Pages that should not show the AddToFavoriteBtn component
const EXCLUDED_FROM_FAVORITES = [
  'index.mdx', // /docs
  'problem-generator.mdx', // /docs/problem-generator
  'easy-problems.mdx', // /docs/easy-problems
  'template.mdx', // /docs/template (if it exists)
];

export function shouldShowFavoriteButton(pagePath: string): boolean {
  if (!pagePath) return false;

  // Check if the page path matches any excluded pages
  const pathParts = pagePath.split('/');
  const pageName = pathParts[0]; // Get the first part of the path

  return !EXCLUDED_FROM_FAVORITES.includes(pageName);
}

// Extract problem title from href
export function getTitleFromHref(href?: string): string | null {
  if (!href) return null;

  // Handle URLs like /docs/two-pointers/two-sum -> "Two Sum"
  const pathParts = href.split('/');
  const lastPart = pathParts[pathParts.length - 1];

  if (!lastPart) return null;

  // Convert kebab-case to Title Case
  // e.g., "two-sum" -> "Two Sum"
  return lastPart
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
