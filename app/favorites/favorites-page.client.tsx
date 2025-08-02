'use client';

import { useFavorites } from '@/components/layout/sidebar/favorites-context';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/routes';
import { getAvailableCategories, getCategoryFromTitle } from '@/lib/utils';
import {
  ArrowLeft,
  BookOpen,
  Filter,
  Heart,
  HeartCrackIcon,
  HeartIcon,
  Share,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

interface FavoritesPageProblem {
  title: string;
  addedAt: string;
  topic?: string;
}

interface FavoriteProblemSet {
  id: number;
  problem_set_id: number;
  name: string;
  description?: string;
  problems: any[];
  added_at: string;
  user_id?: string;
}

export default function FavoritesPageClient() {
  const { favorites, removeFavorite, toggleFavorite, isLoaded } =
    useFavorites();
  const [filteredFavorites, setFilteredFavorites] = useState<
    FavoritesPageProblem[]
  >([]);
  const [favoriteProblemSets, setFavoriteProblemSets] = useState<FavoriteProblemSet[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [activeTab, setActiveTab] = useState<'problems' | 'problem-sets'>('problems');

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

  // Fetch favorite problem sets
  useEffect(() => {
    const fetchFavoriteProblemSets = async () => {
      try {
        const response = await fetch('/api/favorite-problem-sets');
        if (response.ok) {
          const data = await response.json();
          setFavoriteProblemSets(data);
        }
      } catch (error) {
        console.error('Error fetching favorite problem sets:', error);
      }
    };

    fetchFavoriteProblemSets();
  }, []);

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

  const handleRemoveAllProblemSets = async () => {
    if (
      confirm(
        'Are you sure you want to remove all favorite problem sets? This action cannot be undone.'
      )
    ) {
      try {
        for (const problemSet of favoriteProblemSets) {
          await fetch('/api/favorite-problem-sets', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              problem_set_id: problemSet.problem_set_id,
              user_id: problemSet.user_id 
            }),
          });
        }
        setFavoriteProblemSets([]);
      } catch (error) {
        console.error('Error removing all favorite problem sets:', error);
      }
    }
  };

  const handleRemoveProblemSet = async (problemSet: FavoriteProblemSet) => {
    try {
      await fetch('/api/favorite-problem-sets', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          problem_set_id: problemSet.problem_set_id,
          user_id: problemSet.user_id 
        }),
      });
      setFavoriteProblemSets(prev => 
        prev.filter(ps => ps.id !== problemSet.id)
      );
    } catch (error) {
      console.error('Error removing favorite problem set:', error);
    }
  };

  const handleShareProblemSet = (problemSet: FavoriteProblemSet) => {
    const url = `/?topic=${problemSet.problems[0]?.topic || 'all'}&difficulty=${problemSet.problems[0]?.difficulty || 'all'}`;
    navigator.clipboard.writeText(window.location.origin + url);
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
        <Link href={routes.docs}>
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
              Favorites
            </h1>
            <p className="mt-2 text-muted-foreground">
              Your saved problems and problem sets for quick access
            </p>
          </div>
          {(favoritesList.length > 0 || favoriteProblemSets.length > 0) && (
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
              {activeTab === 'problems' && favoritesList.length > 0 && (
                <Button
                  color="primary"
                  size="sm"
                  onClick={handleRemoveAll}
                  className="gap-2 bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove All
                </Button>
              )}
              {activeTab === 'problem-sets' && favoriteProblemSets.length > 0 && (
                <Button
                  color="primary"
                  size="sm"
                  onClick={handleRemoveAllProblemSets}
                  className="gap-2 bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove All
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Tab Toggle */}
        <div className="flex gap-2 mb-4">
          <Button
            color={activeTab === 'problems' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('problems')}
          >
            Problems ({favoritesList.length})
          </Button>
          <Button
            color={activeTab === 'problem-sets' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('problem-sets')}
          >
            Problem Sets ({favoriteProblemSets.length})
          </Button>
        </div>

        {showCategoryFilter && favoritesList.length > 0 && activeTab === 'problems' && (
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

      {activeTab === 'problems' ? (
        // Problems Tab
        favoritesList.length === 0 ? (
          <div className="py-12 text-center">
            <Heart className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
            <h3 className="mb-2 font-semibold text-lg">
              No favorite problems yet
            </h3>
            <p className="mb-4 text-muted-foreground">
              Start exploring problems and add them to your favorites!
            </p>
            <Link href={routes.docs}>
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
        )
      ) : (
        // Problem Sets Tab
        favoriteProblemSets.length === 0 ? (
          <div className="py-12 text-center">
            <BookOpen className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
            <h3 className="mb-2 font-semibold text-lg">
              No favorite problem sets yet
            </h3>
            <p className="mb-4 text-muted-foreground">
              Start creating problem sets and add them to your favorites!
            </p>
            <Link href={routes.problemGenerator}>
              <Button>Create Problem Set</Button>
            </Link>
          </div>
        ) : (
          <div className="gap-4 grid">
            {favoriteProblemSets.map((problemSet) => (
              <div
                key={problemSet.id}
                className="hover:bg-accent/50 p-4 border rounded-lg transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{problemSet.name}</h3>
                    {problemSet.description && (
                      <p className="mt-1 text-muted-foreground text-sm">
                        {problemSet.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-blue-100 px-2 py-1 rounded-full text-blue-800 text-xs">
                        {problemSet.problems.length} problems
                      </span>
                      <p className="text-muted-foreground text-sm">
                        Added on {new Date(problemSet.added_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                                         <Button 
                       size="sm" 
                       color="outline"
                       onClick={() => handleShareProblemSet(problemSet)}
                     >
                       <Share className="w-4 h-4" />
                     </Button>
                     <Button 
                       onClick={() => handleRemoveProblemSet(problemSet)}
                       color="outline"
                       size="sm"
                     >
                       <Trash2 className="w-4 h-4" />
                     </Button>
                    <Link href={routes.problemSets}>
                      <Button size="sm">View Problem Set</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
