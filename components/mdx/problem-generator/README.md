# Problem Generator - Modular Structure

This directory contains the modularized version of the problem generator component, split into smaller, more manageable pieces.

## Structure

```
problem-generator/
├── index.tsx              # Main component that orchestrates everything
├── types.ts               # TypeScript interfaces and types
├── data-transformer.ts    # Data transformation utilities
├── use-problem-generator.ts # Custom hook for state management
├── filter-controls.tsx    # Topic and difficulty selection component
├── problem-list.tsx       # Component for displaying generated problems
└── README.md             # This documentation
```

## Components

### `index.tsx`
The main orchestrator component that combines all the smaller components and manages the overall layout.

### `types.ts`
Contains all TypeScript interfaces:
- `Problem` - Represents a coding problem
- `Topic` - Represents a problem topic/category
- `ProblemSet` - Represents a saved problem set

### `data-transformer.ts`
Contains utility functions for:
- `transformProblems()` - Transforms raw data into the component's expected format
- `getDifficultyColor()` - Returns CSS classes for difficulty styling
- `difficulties` - Array of available difficulty levels

### `use-problem-generator.ts`
Custom hook that manages all the state and logic:
- URL parameter handling
- Topic and difficulty selection
- Problem filtering and generation
- Problem set saving
- Authentication state

### `filter-controls.tsx`
Component for the filter UI:
- Topic selection buttons
- Difficulty selection buttons
- Handles user interactions

### `problem-list.tsx`
Component for displaying the generated problems:
- Problem cards with difficulty badges
- Action buttons (complete, favorite, view)
- Success message handling
- Empty state display

## Benefits of This Structure

1. **Separation of Concerns**: Each file has a single responsibility
2. **Reusability**: Components can be reused in other parts of the app
3. **Testability**: Smaller components are easier to test
4. **Maintainability**: Changes are isolated to specific files
5. **Type Safety**: Centralized type definitions
6. **Custom Hooks**: Logic is separated from UI components

## Usage

The original `problem-generator.tsx` file now simply re-exports the main component:

```tsx
export { default } from './problem-generator/index';
```

This maintains backward compatibility while providing a cleaner, more modular structure. 