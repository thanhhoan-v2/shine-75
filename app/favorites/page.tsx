'use client';

import { Button } from '@/components/ui/button';
import {
  getAvailableCategories,
  getCategoryFromTitle,
  getFavoriteProblems,
  removeAllFavorites,
  type FavoriteProblem
} from '@/lib/utils';
import { ArrowLeft, Filter, Heart, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteProblem[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<FavoriteProblem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  useEffect(() => {
    setFavorites(getFavoriteProblems());
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredFavorites(favorites);
    } else {
      setFilteredFavorites(
        favorites.filter(favorite => (favorite.topic || getCategoryFromTitle(favorite.title)) === selectedCategory)
      );
    }
  }, [favorites, selectedCategory]);

  const handleRemoveAll = () => {
    if (confirm('Are you sure you want to remove all favorites? This action cannot be undone.')) {
      removeAllFavorites();
      setFavorites([]);
      setFilteredFavorites([]);
    }
  };

  const categories = ['All', ...getAvailableCategories()];

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
              <Heart className="w-8 h-8 text-red-500" />
              Favorite Problems
            </h1>
            <p className="mt-2 text-muted-foreground">
              Your saved problems for quick access
            </p>
          </div>
          {favorites.length > 0 && (
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

        {showCategoryFilter && favorites.length > 0 && (
          <div className="bg-muted/50 mt-4 p-4 border rounded-lg">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  color={selectedCategory === category ? "primary" : "outline"}
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

      {favorites.length === 0 ? (
        <div className="py-12 text-center">
          <Heart className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
          <h3 className="mb-2 font-semibold text-lg">No favorite problems yet</h3>
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
          <h3 className="mb-2 font-semibold text-lg">No problems in this category</h3>
          <p className="mb-4 text-muted-foreground">
            Try selecting a different category or add more problems to your favorites.
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
                <Link href={`/docs/${favorite.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Button size="sm">View Problem</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 