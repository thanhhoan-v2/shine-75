'use client';

import { Button } from '@/components/ui/button';
import { useFavoriteStatus, useToggleFavorite } from '@/lib/hooks';
import { HeartIcon, Loader2 } from 'lucide-react';

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
  onAuthRequired,
}: AddToFavoriteBtnProps) => {
  const { data: isFavorite = false, isLoading: statusLoading } = useFavoriteStatus(problemTitle);
  const toggleFavoriteMutation = useToggleFavorite();

  const handleToggleFavorite = () => {
    // Temporarily disable authentication check for testing
    // TODO: Re-enable authentication check for production
    // if (onAuthRequired && onAuthRequired()) {
    //   return; // Authentication dialog was shown, don't proceed
    // }
    
    toggleFavoriteMutation.mutate({ 
      title: problemTitle, 
      topic: topic || 'General', 
      isFavorite 
    });
  };

  // Don't render until the status is loaded to prevent hydration mismatches
  if (statusLoading) {
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
        disabled={toggleFavoriteMutation.isPending}
      >
        {toggleFavoriteMutation.isPending ? (
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
      disabled={toggleFavoriteMutation.isPending}
    >
      {toggleFavoriteMutation.isPending ? (
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
