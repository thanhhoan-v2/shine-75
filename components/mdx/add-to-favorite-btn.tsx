'use client';

import { Button } from '@/components/ui/button';
import {
    addToFavorites,
    isFavorite as isProblemFavorite,
    removeFromFavorites,
} from '@/lib/utils';
import { HeartCrackIcon, HeartIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AddToFavoriteBtnProps {
  problemTitle: string;
  topic?: string;
}

const AddToFavoriteBtn = ({ problemTitle, topic }: AddToFavoriteBtnProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if the problem is already in favorites on component mount
    setIsFavorite(isProblemFavorite(problemTitle));
  }, [problemTitle]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(problemTitle);
      setIsFavorite(false);
    } else {
      addToFavorites(problemTitle, topic);
      setIsFavorite(true);
    }
  };

  return (
    <Button
      onClick={handleToggleFavorite}
      color="outline"
      size="sm"
      className="gap-2 px-2 py-3 w-[200px]"
    >
      {isFavorite ? (
        <>
          <HeartCrackIcon fill="red" className="w-4 h-4" />
          <div>Remove from favorites</div>
        </>
      ) : (
        <>
          <HeartIcon fill="red" className="w-4 h-4" />
          <div>Add to favorites</div>
        </>
      )}
    </Button>
  );
};

export default AddToFavoriteBtn;
