'use client';

import {
    addCompletedProblem,
    addCompletedProblemSet,
    getCompletedProblems,
    getCompletedProblemSets,
    getCompletedProblemsWithDetails,
    isCompleted,
    removeCompletedProblem
} from '@/lib/server-actions/completed';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Query keys
export const completedKeys = {
  all: ['completed'] as const,
  lists: () => [...completedKeys.all, 'list'] as const,
  list: (filters: string) => [...completedKeys.lists(), { filters }] as const,
  details: () => [...completedKeys.all, 'detail'] as const,
  detail: (title: string) => [...completedKeys.details(), title] as const,
  problemSets: () => [...completedKeys.all, 'problem-sets'] as const,
};

// Hooks
export function useCompletedProblems() {
  return useQuery({
    queryKey: completedKeys.lists(),
    queryFn: getCompletedProblems,
  });
}

export function useCompletedProblemsWithDetails() {
  return useQuery({
    queryKey: [...completedKeys.lists(), 'with-details'],
    queryFn: getCompletedProblemsWithDetails,
  });
}

export function useCompletedStatus(title: string) {
  return useQuery({
    queryKey: completedKeys.detail(title),
    queryFn: () => isCompleted(title),
    enabled: !!title,
  });
}

export function useAddCompletedProblem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ title, topic }: { title: string; topic: string }) =>
      addCompletedProblem(title, topic),
    onSuccess: (_, { title }) => {
      queryClient.invalidateQueries({ queryKey: completedKeys.lists() });
      queryClient.invalidateQueries({ queryKey: completedKeys.detail(title) });
    },
  });
}

export function useRemoveCompletedProblem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: removeCompletedProblem,
    onSuccess: (_, title) => {
      queryClient.invalidateQueries({ queryKey: completedKeys.lists() });
      queryClient.invalidateQueries({ queryKey: completedKeys.detail(title) });
    },
  });
}

export function useToggleCompletedProblem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ title, topic, isCompleted }: { title: string; topic: string; isCompleted: boolean }) =>
      isCompleted ? removeCompletedProblem(title) : addCompletedProblem(title, topic),
    onSuccess: (_, { title }) => {
      queryClient.invalidateQueries({ queryKey: completedKeys.lists() });
      queryClient.invalidateQueries({ queryKey: completedKeys.detail(title) });
    },
  });
}

export function useCompletedProblemSets() {
  return useQuery({
    queryKey: completedKeys.problemSets(),
    queryFn: getCompletedProblemSets,
  });
}

export function useAddCompletedProblemSet() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addCompletedProblemSet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: completedKeys.problemSets() });
    },
  });
} 