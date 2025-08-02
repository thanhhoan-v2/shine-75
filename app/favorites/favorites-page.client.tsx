'use client';

import { useFavorites } from '@/components/layout/sidebar/favorites-context';
import { Button } from '@/components/ui/button';
import { getAvailableCategories, getCategoryFromTitle } from '@/lib/utils';
import {
  ArrowLeft,
  Filter,
  Heart,
  HeartCrackIcon,
  HeartIcon,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

interface FavoritesPageProblem {
  title: string;
  addedAt: string;
  topic?: string;
}

export default function FavoritesPageClient() {
  const { favorites, removeFavorite, toggleFavorite, isLoaded } =
    useFavorites();
  const [filteredFavorites, setFilteredFavorites] = useState<
    FavoritesPageProblem[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  // Convert Set<string> to FavoriteProblem[] format - memoized to prevent infinite loops
  const favoritesList: FavoritesPageProblem[] = useMemo(
    () =>
      Array.from(favorites).map((title) => ({
        title,
        addedAt: new Date().toISOString(), // Since we don't store timestamps in context, use current time
        topic: getCategoryFromTitle(title),
      })),
    [favorites]
  );

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredFavorites(favoritesList);
    } else {
      setFilteredFavorites(
        favoritesList.filter(
          (favorite) =>
            (favorite.topic || getCategoryFromTitle(favorite.title)) ===
            selectedCategory
        )
      );
    }
  }, [favoritesList, selectedCategory]);

  const handleRemoveAll = () => {
    if (
      confirm(
        'Are you sure you want to remove all favorites? This action cannot be undone.'
      )
    ) {
      // Remove all favorites by clearing the Set
      favorites.forEach((title) => {
        removeFavorite(title);
      });
    }
  };

  const categories = ['All', ...getAvailableCategories()];

  // Show loading state while context is loading
  if (!isLoaded) {
    return (
      <div className="mx-auto px-4 py-8 container">
        <div className="mb-8">
          <Link href="/docs">
            <Button color="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Problems
            </Button>
          </Link>
        </div>
        <div className="py-12 text-center">
          <Heart className="mx-auto mb-4 w-12 h-12 text-muted-foreground animate-pulse" />
          <h3 className="mb-2 font-semibold text-lg">Loading favorites...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8 container">
      <div className="mb-8">
        <Link href="/docs">
          <Button color="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Problems
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="flex items-center gap-2 font-bold text-3xl">
              <HeartIcon className="w-8 h-8 text-red-500" />
              Favorite Problems
            </h1>
            <p className="mt-2 text-muted-foreground">
              Your saved problems for quick access
            </p>
          </div>
          {favoritesList.length > 0 && (
            <div className="flex gap-2">
              <Button
                color="outline"
                size="sm"
                onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button
                color="primary"
                size="sm"
                onClick={handleRemoveAll}
                className="gap-2 bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4" />
                Remove All
              </Button>
            </div>
          )}
        </div>

        {showCategoryFilter && favoritesList.length > 0 && (
          <div className="bg-muted/50 mt-4 p-4 border rounded-lg">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  color={selectedCategory === category ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {favoritesList.length === 0 ? (
        <div className="py-12 text-center">
          <Heart className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
          <h3 className="mb-2 font-semibold text-lg">
            No favorite problems yet
          </h3>
          <p className="mb-4 text-muted-foreground">
            Start exploring problems and add them to your favorites!
          </p>
          <Link href="/docs">
            <Button>Browse Problems</Button>
          </Link>
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div className="py-12 text-center">
          <Filter className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
          <h3 className="mb-2 font-semibold text-lg">
            No problems in this category
          </h3>
          <p className="mb-4 text-muted-foreground">
            Try selecting a different category or add more problems to your
            favorites.
          </p>
        </div>
      ) : (
        <div className="gap-4 grid">
          {filteredFavorites.map((favorite, index) => (
            <div
              key={index}
              className="hover:bg-accent/50 p-4 border rounded-lg transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">{favorite.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-blue-100 px-2 py-1 rounded-full text-blue-800 text-xs">
                      {favorite.topic || getCategoryFromTitle(favorite.title)}
                    </span>
                    <p className="text-muted-foreground text-sm">
                      Added on {new Date(favorite.addedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={() => toggleFavorite(favorite.title)}>
                    <HeartCrackIcon className="w-5 h-5" fill="red" />
                  </Button>
                  <Link
                    href={`/docs/${favorite.title
                      .toLowerCase()
                      .replace(/\s+/g, '-')}`}
                  >
                    <Button size="sm">View Problem</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
