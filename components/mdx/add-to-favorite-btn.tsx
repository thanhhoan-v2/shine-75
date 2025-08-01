'use client';

import { useFavorites } from '@/components/layout/sidebar/favorites-context';
import { Button } from '@/components/ui/button';
import { HeartIcon } from 'lucide-react';

interface AddToFavoriteBtnProps {
  problemTitle: string;
  topic?: string;
  variant?: 'just-icon' | 'icon-text';
}

const AddToFavoriteBtn = ({
  problemTitle,
  topic,
  variant,
}: AddToFavoriteBtnProps) => {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const isItemFavorite = isFavorite(problemTitle);

  const handleToggleFavorite = () => {
    toggleFavorite(problemTitle);
  };

  // Don't render until the context is loaded to prevent hydration mismatches
  if (!isLoaded) {
    return null;
  }

  if (variant === 'just-icon') {
    return (
      <Button onClick={handleToggleFavorite} color="outline" size="sm">
        {isItemFavorite ? (
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
    >
      {isItemFavorite ? (
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
