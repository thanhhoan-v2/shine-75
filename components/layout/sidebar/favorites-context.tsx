'use client';

import { useFavorites, useToggleFavorite } from '@/lib/hooks';
import { createContext, ReactNode, useContext } from 'react';

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (title: string) => void;
  removeFavorite: (title: string) => void;
  isFavorite: (title: string) => boolean;
  toggleFavorite: (title: string) => void;
  isLoaded: boolean;
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { data: favorites = [], isLoading, error } = useFavorites();
  const toggleFavoriteMutation = useToggleFavorite();

  const addFavorite = (title: string) => {
    toggleFavoriteMutation.mutate({ title, topic: 'General', isFavorite: false });
  };

  const removeFavorite = (title: string) => {
    toggleFavoriteMutation.mutate({ title, topic: 'General', isFavorite: true });
  };

  const isFavorite = (title: string) => {
    return favorites.includes(title);
  };

  const toggleFavorite = (title: string) => {
    const currentlyFavorite = isFavorite(title);
    toggleFavoriteMutation.mutate({ 
      title, 
      topic: 'General', 
      isFavorite: currentlyFavorite 
    });
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addFavorite, 
        removeFavorite, 
        isFavorite, 
        toggleFavorite,
        isLoaded: !isLoading && !error,
        isLoading
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
} 