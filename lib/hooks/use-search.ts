'use client';

import {
    searchCompleted,
    searchFavorites,
    searchProblems,
    searchProblemSets
} from '@/lib/server-actions/search';
import { useQuery } from '@tanstack/react-query';

// Query keys
export const searchKeys = {
  all: ['search'] as const,
  problems: (query: string) => [...searchKeys.all, 'problems', query] as const,
  problemSets: (query: string) => [...searchKeys.all, 'problem-sets', query] as const,
  favorites: (query: string) => [...searchKeys.all, 'favorites', query] as const,
  completed: (query: string) => [...searchKeys.all, 'completed', query] as const,
};

// Hooks
export function useSearchProblems(query: string) {
  return useQuery({
    queryKey: searchKeys.problems(query),
    queryFn: () => searchProblems(query),
    enabled: !!query && query.length >= 2,
  });
}

export function useSearchProblemSets(query: string) {
  return useQuery({
    queryKey: searchKeys.problemSets(query),
    queryFn: () => searchProblemSets(query),
    enabled: !!query && query.length >= 2,
  });
}

export function useSearchFavorites(query: string) {
  return useQuery({
    queryKey: searchKeys.favorites(query),
    queryFn: () => searchFavorites(query),
    enabled: !!query && query.length >= 2,
  });
}

export function useSearchCompleted(query: string) {
  return useQuery({
    queryKey: searchKeys.completed(query),
    queryFn: () => searchCompleted(query),
    enabled: !!query && query.length >= 2,
  });
} 