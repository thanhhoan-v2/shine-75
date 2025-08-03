'use client';

import {
    createProblemSet,
    deleteProblemSet,
    getProblemSet,
    getProblemSets,
    updateProblemSet,
    type CreateProblemSetData
} from '@/lib/server-actions/problem-sets';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Query keys
export const problemSetsKeys = {
  all: ['problem-sets'] as const,
  lists: () => [...problemSetsKeys.all, 'list'] as const,
  list: (filters: string) => [...problemSetsKeys.lists(), { filters }] as const,
  details: () => [...problemSetsKeys.all, 'detail'] as const,
  detail: (id: number) => [...problemSetsKeys.details(), id] as const,
};

// Hooks
export function useProblemSets() {
  return useQuery({
    queryKey: problemSetsKeys.lists(),
    queryFn: getProblemSets,
    staleTime: 0, // Always consider data stale to ensure fresh data
    refetchOnMount: true, // Refetch when component mounts
  });
}

export function useProblemSet(id: number) {
  return useQuery({
    queryKey: problemSetsKeys.detail(id),
    queryFn: () => getProblemSet(id),
    enabled: !!id,
  });
}

export function useCreateProblemSet() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createProblemSet,
    onSuccess: (data) => {
      // Invalidate and refetch the problem sets list
      console.log('Problem set created successfully, invalidating cache...');
      queryClient.invalidateQueries({ queryKey: problemSetsKeys.lists() });
      // Also invalidate any specific problem set queries
      queryClient.invalidateQueries({ queryKey: problemSetsKeys.all });
    },
    onError: (error) => {
      console.error('Failed to create problem set:', error);
    },
  });
}

export function useUpdateProblemSet() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateProblemSetData> }) =>
      updateProblemSet(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: problemSetsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: problemSetsKeys.detail(id) });
    },
  });
}

export function useDeleteProblemSet() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteProblemSet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: problemSetsKeys.lists() });
    },
  });
} 