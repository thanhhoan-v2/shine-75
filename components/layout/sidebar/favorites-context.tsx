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

const STORAGE_KEY = 'shine75-favorites';

// Helper function to load favorites from localStorage
function loadFavoritesFromStorage(): Set<string> {
  if (typeof window === 'undefined') {
    return new Set();
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const favoritesArray = JSON.parse(stored);
      return new Set(Array.isArray(favoritesArray) ? favoritesArray : []);
    }
  } catch (error) {
    console.error('Failed to load favorites from localStorage:', error);
  }
  
  return new Set();
}

// Helper function to save favorites to localStorage
function saveFavoritesToStorage(favorites: Set<string>): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favorites)));
  } catch (error) {
    console.error('Failed to save favorites to localStorage:', error);
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount (client-side only)
  useEffect(() => {
    const storedFavorites = loadFavoritesFromStorage();
    setFavorites(storedFavorites);
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    if (isLoaded) {
      saveFavoritesToStorage(favorites);
    }
  }, [favorites, isLoaded]);

  const addFavorite = (title: string) => {
    setFavorites(prev => new Set([...prev, title]));
  };

  const removeFavorite = (title: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      newSet.delete(title);
      return newSet;
    });
  };

  const isFavorite = (title: string) => {
    return favorites.has(title);
  };

  const toggleFavorite = (title: string) => {
    if (isFavorite(title)) {
      removeFavorite(title);
    } else {
      addFavorite(title);
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