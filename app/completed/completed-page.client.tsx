'use client';

import AddToFavoriteProblemSetBtn from '@/components/mdx/add-to-favorite-problem-set-btn';
import CompletedProblemSetBtn from '@/components/mdx/completed-problem-set-btn';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCompletedProblems, useRemoveCompletedProblem, useToggleCompletedProblem } from '@/lib/hooks';
import { routes } from '@/lib/routes';
import { getCategoryFromTitle } from '@/lib/utils';
import {
    ArrowLeft,
    ArrowRightIcon,
    ExternalLinkIcon,
    Filter,
    Loader2,
    Share,
    Trash2Icon,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

interface CompletedPageProblem {
  title: string;
  completedAt: string;
  topic: string;
}

interface CompletedProblemSet {
  id: number;
  name: string;
  problems: string[];
  created_at: string;
  topic?: string;
  difficulty?: string;
  description?: string;
  user_id?: string;
}

export default function CompletedPageClient() {
  const { data: completedProblems = [], isLoading, error } = useCompletedProblems();
  const removeCompletedMutation = useRemoveCompletedProblem();
  const toggleCompletedMutation = useToggleCompletedProblem();
  const [filteredCompleted, setFilteredCompleted] = useState<
    CompletedPageProblem[]
  >([]);
  const [completedProblemSets, setCompletedProblemSets] = useState<CompletedProblemSet[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [activeTab, setActiveTab] = useState<'problems' | 'problem-sets'>('problems');

  // Convert string array to CompletedProblem[] format - memoized to prevent infinite loops
  const completedList: CompletedPageProblem[] = useMemo(
    () =>
      completedProblems.map((title) => ({
        title,
        completedAt: new Date().toISOString(), // Since we don't store timestamps in context, use current time
        topic: getCategoryFromTitle(title),
      })),
    [completedProblems]
  );

  // Fetch completed problem sets
  useEffect(() => {
    const fetchCompletedProblemSets = async () => {
      try {
        const response = await fetch('/api/completed-problem-sets');
        if (response.ok) {
          const data = await response.json();
          setCompletedProblemSets(data);
        }
      } catch (error) {
        console.error('Error fetching completed problem sets:', error);
      }
    };

    fetchCompletedProblemSets();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredCompleted(completedList);
    } else {
      setFilteredCompleted(
        completedList.filter(
          (completed) =>
            (completed.topic || getCategoryFromTitle(completed.title)) ===
            selectedCategory
        )
      );
    }
  }, [completedList, selectedCategory]);

  const handleRemoveAll = () => {
    if (filteredCompleted.length === 0) {
      toast.error('No completed problems to remove');
      return;
    }

    const promises = filteredCompleted.map((completed) =>
      removeCompletedMutation.mutateAsync(completed.title)
    );

    Promise.all(promises)
      .then(() => {
        toast.success('All completed problems removed successfully');
      })
      .catch((error) => {
        console.error('Error removing all completed problems:', error);
        toast.error('Failed to remove all completed problems');
      });
  };

  const handleRemoveAllProblemSets = () => {
    if (completedProblemSets.length === 0) {
      toast.error('No completed problem sets to remove');
      return;
    }

    // TODO: Implement remove all problem sets functionality
    toast.info('Remove all problem sets functionality not yet implemented');
  };

  const handleShare = async () => {
    const shareData = {
      title: 'My Completed Problems',
      text: `Check out my completed problems: ${filteredCompleted
        .map((c) => c.title)
        .join(', ')}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success('Link copied to clipboard');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share');
    }
  };

  const handleShareProblemSets = async () => {
    const shareData = {
      title: 'My Completed Problem Sets',
      text: `Check out my completed problem sets: ${completedProblemSets
        .map((ps) => ps.name)
        .join(', ')}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success('Link copied to clipboard');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share');
    }
  };

  // Get unique categories from completed problems
  const categories = useMemo(() => {
    const cats = new Set<string>();
    completedList.forEach((completed) => {
      if (completed.topic) {
        cats.add(completed.topic);
      }
    });
    return ['All', ...Array.from(cats).sort()];
  }, [completedList]);

  // Get unique categories from problem sets
  const problemSetCategories = useMemo(() => {
    const cats = new Set<string>();
    completedProblemSets.forEach((problemSet) => {
      if (problemSet.topic) {
        cats.add(problemSet.topic);
      }
    });
    return ['All', ...Array.from(cats).sort()];
  }, [completedProblemSets]);

  const filteredProblemSets = useMemo(() => {
    if (selectedCategory === 'All') {
      return completedProblemSets;
    } else {
      return completedProblemSets.filter(
        (problemSet) => problemSet.topic === selectedCategory
      );
    }
  }, [completedProblemSets, selectedCategory]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
          <p className="text-muted-foreground">Loading completed problems...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <p className="text-destructive">Error loading completed problems: {error.message}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8 container">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Link href={routes.home}>
            <Button color="ghost" size="sm">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back
            </Button>
          </Link>
          <h1 className="font-bold text-3xl">Completed</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleShare} color="outline" size="sm">
            <Share className="mr-2 w-4 h-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex mb-6 border-b">
        <button
          onClick={() => setActiveTab('problems')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'problems'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground'
          }`}
        >
          Problems ({completedList.length})
        </button>
        <button
          onClick={() => setActiveTab('problem-sets')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'problem-sets'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground'
          }`}
        >
          Problem Sets ({completedProblemSets.length})
        </button>
      </div>

      {activeTab === 'problems' ? (
        <>
          {/* Category Filter */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                color="outline"
                size="sm"
              >
                <Filter className="mr-2 w-4 h-4" />
                Filter by Category
              </Button>
              {selectedCategory !== 'All' && (
                <Badge variant="secondary">{selectedCategory}</Badge>
              )}
            </div>
            {filteredCompleted.length > 0 && (
              <Button
                onClick={handleRemoveAll}
                color="primary"
                size="sm"
                disabled={removeCompletedMutation.isPending}
              >
                {removeCompletedMutation.isPending ? (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                ) : (
                  <Trash2Icon className="mr-2 w-4 h-4" />
                )}
                Remove All
              </Button>
            )}
          </div>

          {/* Category Dropdown */}
          {showCategoryFilter && (
            <div className="bg-muted/50 mb-6 p-4 border rounded-lg">
              <div className="gap-2 grid grid-cols-2 md:grid-cols-4">
                {categories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowCategoryFilter(false);
                    }}
                    color={selectedCategory === category ? 'primary' : 'outline'}
                    size="sm"
                    className="justify-start"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Completed List */}
          {filteredCompleted.length === 0 ? (
            <div className="py-12 text-center">
              <p className="mb-4 text-muted-foreground">
                {selectedCategory === 'All'
                  ? 'No completed problems yet. Start solving problems!'
                  : `No completed problems in the "${selectedCategory}" category.`}
              </p>
              <Link href={routes.home}>
                <Button>
                  <ArrowRightIcon className="mr-2 w-4 h-4" />
                  Browse Problems
                </Button>
              </Link>
            </div>
          ) : (
            <div className="gap-4 grid">
              {filteredCompleted.map((completed) => (
                <div
                  key={completed.title}
                  className="flex justify-between items-center hover:bg-muted/50 p-4 border rounded-lg transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{completed.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{completed.topic}</Badge>
                      <span className="text-muted-foreground text-sm">
                        Completed {new Date(completed.completedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/docs/${completed.topic.toLowerCase()}/${completed.title
                        .toLowerCase()
                        .replace(/\s+/g, '-')}`}
                    >
                      <Button color="outline" size="sm">
                        <ExternalLinkIcon className="mr-2 w-4 h-4" />
                        View
                      </Button>
                    </Link>
                    <Button
                      onClick={() => toggleCompletedMutation.mutate({ title: completed.title, topic: completed.topic, isCompleted: true })}
                      color="outline"
                      size="sm"
                      disabled={toggleCompletedMutation.isPending}
                    >
                      {toggleCompletedMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2Icon className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {/* Category Filter for Problem Sets */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                color="outline"
                size="sm"
              >
                <Filter className="mr-2 w-4 h-4" />
                Filter by Category
              </Button>
              {selectedCategory !== 'All' && (
                <Badge variant="secondary">{selectedCategory}</Badge>
              )}
            </div>
            {filteredProblemSets.length > 0 && (
              <Button
                onClick={handleRemoveAllProblemSets}
                color="primary"
                size="sm"
              >
                <Trash2Icon className="mr-2 w-4 h-4" />
                Remove All
              </Button>
            )}
          </div>

          {/* Category Dropdown for Problem Sets */}
          {showCategoryFilter && (
            <div className="bg-muted/50 mb-6 p-4 border rounded-lg">
              <div className="gap-2 grid grid-cols-2 md:grid-cols-4">
                {problemSetCategories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowCategoryFilter(false);
                    }}
                    color={selectedCategory === category ? 'primary' : 'outline'}
                    size="sm"
                    className="justify-start"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Problem Sets List */}
          {filteredProblemSets.length === 0 ? (
            <div className="py-12 text-center">
              <p className="mb-4 text-muted-foreground">
                {selectedCategory === 'All'
                  ? 'No completed problem sets yet. Start solving problem sets!'
                  : `No completed problem sets in the "${selectedCategory}" category.`}
              </p>
              <Link href={routes.problemSets}>
                <Button>
                  <ArrowRightIcon className="mr-2 w-4 h-4" />
                  Browse Problem Sets
                </Button>
              </Link>
            </div>
          ) : (
            <div className="gap-4 grid">
              {filteredProblemSets.map((problemSet) => (
                <div
                  key={problemSet.id}
                  className="flex justify-between items-center hover:bg-muted/50 p-4 border rounded-lg transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{problemSet.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {problemSet.topic && (
                        <Badge variant="outline">{problemSet.topic}</Badge>
                      )}
                      {problemSet.difficulty && (
                        <Badge variant="outline">{problemSet.difficulty}</Badge>
                      )}
                      <span className="text-muted-foreground text-sm">
                        {problemSet.problems.length} problems
                      </span>
                      <span className="text-muted-foreground text-sm">
                        Created {new Date(problemSet.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {problemSet.description && (
                      <p className="mt-2 text-muted-foreground text-sm">
                        {problemSet.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/problem-sets/${problemSet.id}`}>
                      <Button color="outline" size="sm">
                        <ExternalLinkIcon className="mr-2 w-4 h-4" />
                        View
                      </Button>
                    </Link>
                    <AddToFavoriteProblemSetBtn
                      problemSetId={problemSet.id}
                      problemSetName={problemSet.name}
                      problems={problemSet.problems}
                      variant="just-icon"
                    />
                    <CompletedProblemSetBtn
                      problemSetId={problemSet.id}
                      problemSetName={problemSet.name}
                      problems={problemSet.problems}
                      variant="just-icon"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
