'use client';

import { Button } from '@/components/ui/button';
import { Heart, HeartCrack } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AddToFavoriteProblemSetBtnProps {
  problemSetId: number;
  problemSetName: string;
  problemSetDescription?: string;
  problems: any[];
  userId?: string;
  variant?: 'default' | 'just-icon';
}

export default function AddToFavoriteProblemSetBtn({
  problemSetId,
  problemSetName,
  problemSetDescription,
  problems,
  userId,
  variant = 'default',
}: AddToFavoriteProblemSetBtnProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if this problem set is already in favorites
    const checkFavoriteStatus = async () => {
      try {
        const response = await fetch('/api/favorite-problem-sets');
        if (response.ok) {
          const favorites = await response.json();
          const isInFavorites = favorites.some(
            (fav: any) => fav.problem_set_id === problemSetId
          );
          setIsFavorite(isInFavorites);
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkFavoriteStatus();
  }, [problemSetId]);

  const toggleFavorite = async () => {
    setIsLoading(true);
    try {
      if (isFavorite) {
        // Remove from favorites
        await fetch('/api/favorite-problem-sets', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ problem_set_id: problemSetId, user_id: userId }),
        });
        setIsFavorite(false);
      } else {
        // Add to favorites
        await fetch('/api/favorite-problem-sets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            problem_set_id: problemSetId,
            name: problemSetName,
            description: problemSetDescription,
            problems: problems,
            user_id: userId,
          }),
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'just-icon') {
    return (
      <Button
        size="sm"
        onClick={toggleFavorite}
        disabled={isLoading}
        className="p-2 h-auto"
      >
        {isFavorite ? (
          <HeartCrack className="w-4 h-4 text-red-500" />
        ) : (
          <Heart className="w-4 h-4" />
        )}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      onClick={toggleFavorite}
      disabled={isLoading}
      className="gap-2"
    >
      {isFavorite ? (
        <>
          <HeartCrack className="w-4 h-4" />
          Remove from Favorites
        </>
      ) : (
        <>
          <Heart className="w-4 h-4" />
          Add to Favorites
        </>
      )}
    </Button>
  );
} 