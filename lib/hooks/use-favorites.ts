'use client';

import {
    addFavorite,
    getFavorites,
    getFavoritesWithDetails,
    isFavorite,
    removeFavorite
} from '@/lib/server-actions/favorites';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Query keys
export const favoritesKeys = {
  all: ['favorites'] as const,
  lists: () => [...favoritesKeys.all, 'list'] as const,
  list: (filters: string) => [...favoritesKeys.lists(), { filters }] as const,
  details: () => [...favoritesKeys.all, 'detail'] as const,
  detail: (title: string) => [...favoritesKeys.details(), title] as const,
};

// Hooks
export function useFavorites() {
  return useQuery({
    queryKey: favoritesKeys.lists(),
    queryFn: getFavorites,
  });
}

export function useFavoritesWithDetails() {
  return useQuery({
    queryKey: [...favoritesKeys.lists(), 'with-details'],
    queryFn: getFavoritesWithDetails,
  });
}

export function useFavoriteStatus(title: string) {
  return useQuery({
    queryKey: favoritesKeys.detail(title),
    queryFn: () => isFavorite(title),
    enabled: !!title,
  });
}

export function useAddFavorite() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ title, topic }: { title: string; topic: string }) =>
      addFavorite(title, topic),
    onSuccess: (_, { title }) => {
      queryClient.invalidateQueries({ queryKey: favoritesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: favoritesKeys.detail(title) });
    },
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: removeFavorite,
    onSuccess: (_, title) => {
      queryClient.invalidateQueries({ queryKey: favoritesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: favoritesKeys.detail(title) });
    },
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ title, topic, isFavorite }: { title: string; topic: string; isFavorite: boolean }) =>
      isFavorite ? removeFavorite(title) : addFavorite(title, topic),
    onSuccess: (_, { title }) => {
      queryClient.invalidateQueries({ queryKey: favoritesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: favoritesKeys.detail(title) });
    },
  });
} 