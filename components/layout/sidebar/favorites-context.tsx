'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface FavoritesContextType {
  favorites: Set<string>;
  addFavorite: (title: string) => void;
  removeFavorite: (title: string) => void;
  isFavorite: (title: string) => boolean;
  toggleFavorite: (title: string) => void;
  isLoaded: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from API on mount
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const response = await fetch('/api/favorites');
        if (response.ok) {
          const favoritesArray = await response.json();
          setFavorites(new Set(favoritesArray));
        } else if (response.status === 401) {
          // User is not authenticated, set empty favorites
          setFavorites(new Set());
        }
      } catch (error) {
        console.error('Failed to load favorites from API:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadFavorites();
  }, []);

  const addFavorite = async (title: string) => {
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, topic: 'General' })
      });
      
      if (response.ok) {
        setFavorites(prev => new Set([...prev, title]));
      } else if (response.status === 401) {
        // User is not authenticated, show auth dialog or redirect
        console.log('User needs to authenticate to add favorites');
      }
    } catch (error) {
      console.error('Failed to add favorite via API:', error);
    }
  };

  const removeFavorite = async (title: string) => {
    try {
      const response = await fetch('/api/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      
      if (response.ok) {
        setFavorites(prev => {
          const newSet = new Set(prev);
          newSet.delete(title);
          return newSet;
        });
      } else if (response.status === 401) {
        // User is not authenticated, show auth dialog or redirect
        console.log('User needs to authenticate to remove favorites');
      }
    } catch (error) {
      console.error('Failed to remove favorite via API:', error);
    }
  };

  const isFavorite = (title: string) => {
    return favorites.has(title);
  };

  const toggleFavorite = async (title: string) => {
    if (isFavorite(title)) {
      await removeFavorite(title);
    } else {
      await addFavorite(title);
    }
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addFavorite, 
        removeFavorite, 
        isFavorite, 
        toggleFavorite,
        isLoaded
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
} 