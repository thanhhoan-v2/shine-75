# React Query Setup and Usage

This document describes the React Query (TanStack Query) setup and how to use it in the Shine75 application.

## Overview

We've migrated from API routes to server actions and implemented React Query for better data fetching, caching, and state management.

## Architecture

### 1. Server Actions (`lib/server-actions/`)

All database operations are now handled through server actions instead of API routes:

- `problem-sets.ts` - Problem set operations
- `favorites.ts` - Favorite problems operations  
- `completed.ts` - Completed problems operations
- `search.ts` - Search functionality

### 2. React Query Hooks (`lib/hooks/`)

Feature-specific hooks that wrap server actions with React Query:

- `use-problem-sets.ts` - Problem sets queries and mutations
- `use-favorites.ts` - Favorites queries and mutations
- `use-completed.ts` - Completed problems queries and mutations
- `use-search.ts` - Search queries

### 3. Query Provider

The `QueryProvider` is configured in `app/layout.tsx` to wrap the entire application.

## Usage Examples

### Basic Query

```tsx
import { useProblemSets } from '@/lib/hooks';

function MyComponent() {
  const { data: problemSets = [], isLoading, error } = useProblemSets();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {problemSets.map(problemSet => (
        <div key={problemSet.id}>{problemSet.name}</div>
      ))}
    </div>
  );
}
```

### Mutation with Optimistic Updates

```tsx
import { useCreateProblemSet } from '@/lib/hooks';

function CreateProblemSetForm() {
  const createMutation = useCreateProblemSet();
  
  const handleSubmit = (data) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        // Query cache is automatically invalidated
        toast.success('Problem set created!');
      },
      onError: (error) => {
        toast.error('Failed to create problem set');
      }
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

### Optimistic Updates

```tsx
import { useToggleFavorite } from '@/lib/hooks';

function FavoriteButton({ title, topic, isFavorite }) {
  const toggleMutation = useToggleFavorite();
  
  const handleToggle = () => {
    toggleMutation.mutate({
      title,
      topic,
      isFavorite
    });
  };
  
  return (
    <button onClick={handleToggle}>
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
}
```

## Query Keys

Each feature has its own query key structure:

```tsx
// Problem Sets
problemSetsKeys = {
  all: ['problem-sets'],
  lists: () => [...problemSetsKeys.all, 'list'],
  detail: (id: number) => [...problemSetsKeys.all, 'detail', id]
}

// Favorites
favoritesKeys = {
  all: ['favorites'],
  lists: () => [...favoritesKeys.all, 'list'],
  detail: (title: string) => [...favoritesKeys.all, 'detail', title]
}
```

## Configuration

React Query is configured with the following defaults:

- **Stale Time**: 5 minutes
- **Cache Time**: 10 minutes  
- **Retry**: 1 attempt
- **Refetch on Window Focus**: Disabled

## Migration from Context

### Before (Context)
```tsx
const { problemSets, addProblemSet, removeProblemSet } = useProblemSets();
```

### After (React Query)
```tsx
const { data: problemSets = [] } = useProblemSets();
const createMutation = useCreateProblemSet();
const deleteMutation = useDeleteProblemSet();
```

## Benefits

1. **Automatic Caching**: Data is cached and shared across components
2. **Background Updates**: Data stays fresh automatically
3. **Optimistic Updates**: UI updates immediately while mutations happen in background
4. **Error Handling**: Built-in error states and retry logic
5. **Loading States**: Automatic loading states for better UX
6. **DevTools**: React Query DevTools for debugging

## Best Practices

1. **Use the hooks from `@/lib/hooks`** instead of calling server actions directly
2. **Handle loading and error states** in your components
3. **Use mutations for data changes** and let React Query handle cache invalidation
4. **Keep query keys consistent** across your application
5. **Use the DevTools** during development to inspect cache state

## Troubleshooting

### Common Issues

1. **Data not updating**: Check if query keys are invalidated properly
2. **Stale data**: Adjust stale time or manually invalidate queries
3. **Network errors**: Check server action error handling

### Debugging

Use React Query DevTools (included in QueryProvider) to:
- Inspect cache state
- See query status
- Manually invalidate queries
- Monitor network requests 