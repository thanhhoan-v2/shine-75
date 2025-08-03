'use client';

import { Button } from '@/components/ui/button';
import { HeartIcon, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AddToFavoriteBtnProps {
  problemTitle: string;
  topic?: string;
  variant?: 'just-icon' | 'icon-text';
  onAuthRequired?: () => boolean;
}

const AddToFavoriteBtn = ({
  problemTitle,
  topic,
  variant,
  onAuthRequired
}: AddToFavoriteBtnProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if this problem is already in favorites
    const checkFavoriteStatus = async () => {
      try {
        const response = await fetch('/api/favorites');
        if (response.ok) {
          const favorites = await response.json();
          const isInFavorites = favorites.includes(problemTitle);
          setIsFavorite(isInFavorites);
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkFavoriteStatus();
  }, [problemTitle]);

  const handleToggleFavorite = async () => {
    // Temporarily disable authentication check for testing
    // TODO: Re-enable authentication check for production
    // if (onAuthRequired && onAuthRequired()) {
    //   return; // Authentication dialog was shown, don't proceed
    // }
    
    setIsLoading(true);
    try {
      if (isFavorite) {
        // Remove from favorites
        await fetch('/api/favorites', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: problemTitle }),
        });
        setIsFavorite(false);
      } else {
        // Add to favorites
        await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: problemTitle,
            topic: topic || 'General',
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

  // Don't render until the status is loaded to prevent hydration mismatches
  if (isLoading && !isFavorite) {
    return (
      <Button color="outline" size="sm" disabled>
        <Loader2 className="w-4 h-4 animate-spin" />
      </Button>
    );
  }

  if (variant === 'just-icon') {
    return (
      <Button 
        onClick={handleToggleFavorite} 
        color="outline" 
        size="sm"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isFavorite ? (
          <HeartIcon fill="red" className="w-4 h-4" />
        ) : (
          <HeartIcon className="w-4 h-4" />
        )}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleToggleFavorite}
      color="outline"
      size="sm"
      className="gap-2 px-2 py-3 w-[200px]"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <div>Updating...</div>
        </>
      ) : isFavorite ? (
        <>
          <HeartIcon fill="red" className="w-4 h-4" />
          <div>Remove from favorites</div>
        </>
      ) : (
        <>
          <HeartIcon className="w-4 h-4" />
          <div>Add to favorites</div>
        </>
      )}
    </Button>
  );
};

export default AddToFavoriteBtn;
