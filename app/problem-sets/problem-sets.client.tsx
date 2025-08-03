'use client';

import AddToFavoriteBtn from '@/components/mdx/add-to-favorite-btn';
import AddToFavoriteProblemSetBtn from '@/components/mdx/add-to-favorite-problem-set-btn';
import CompletedBtn from '@/components/mdx/completed-btn';
import CompletedProblemSetBtn from '@/components/mdx/completed-problem-set-btn';
import { getDifficultyColor } from '@/components/mdx/problem-generator/data-transformer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDeleteProblemSet, useProblemSets } from '@/lib/hooks';
import { routes } from '@/lib/routes';
import {
  ArrowLeft,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ExternalLinkIcon,
  Filter,
  Loader2,
  Share,
  Trash2Icon,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

export default function ProblemSetsClient() {
  const { data: problemSets = [], isLoading, error } = useProblemSets();
  const deleteProblemSetMutation = useDeleteProblemSet();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedProblemSets, setExpandedProblemSets] = useState<Set<number>>(new Set());

  // Debug logging
  console.log('ProblemSetsClient render:', { 
    problemSetsCount: problemSets.length, 
    isLoading, 
    error: error?.message 
  });

  // Get unique categories from problem sets
  const categories = useMemo(() => {
    const cats = new Set<string>();
    problemSets.forEach((problemSet) => {
      if (problemSet.topic) {
        cats.add(problemSet.topic);
      }
    });
    return ['All', ...Array.from(cats).sort()];
  }, [problemSets]);

  const filteredProblemSets = useMemo(() => {
    if (selectedCategory === 'All') {
      return problemSets;
    } else {
      return problemSets.filter(
        (problemSet) => problemSet.topic === selectedCategory
      );
    }
  }, [problemSets, selectedCategory]);

  const handleRemoveAll = () => {
    if (filteredProblemSets.length === 0) {
      toast.error('No problem sets to remove');
      return;
    }

    const promises = filteredProblemSets.map((problemSet) =>
      deleteProblemSetMutation.mutateAsync(problemSet.id)
    );

    Promise.all(promises)
      .then(() => {
        toast.success('All problem sets removed successfully');
      })
      .catch((error) => {
        console.error('Error removing all problem sets:', error);
        toast.error('Failed to remove all problem sets');
      });
  };

  const handleShare = async () => {
    const shareData = {
      title: 'My Problem Sets',
      text: `Check out my problem sets: ${filteredProblemSets
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

  const toggleProblemSetExpansion = (problemSetId: number) => {
    setExpandedProblemSets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(problemSetId)) {
        newSet.delete(problemSetId);
      } else {
        newSet.add(problemSetId);
      }
      return newSet;
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
          <p className="text-muted-foreground">Loading problem sets...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <p className="text-destructive">Error loading problem sets: {error.message}</p>
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
          <h1 className="font-bold text-3xl">Problem Sets</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleShare} color="outline" size="sm">
            <Share className="mr-2 w-4 h-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setSelectedCategory(selectedCategory === 'All' ? 'All' : 'All')}
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
            onClick={handleRemoveAll}
            color="primary"
            size="sm"
            disabled={deleteProblemSetMutation.isPending}
          >
            {deleteProblemSetMutation.isPending ? (
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            ) : (
              <Trash2Icon className="mr-2 w-4 h-4" />
            )}
            Remove All
          </Button>
        )}
      </div>

      {/* Category Dropdown */}
      <div className="bg-muted/50 mb-6 p-4 border rounded-lg">
        <div className="gap-2 grid grid-cols-2 md:grid-cols-4">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              color={selectedCategory === category ? 'primary' : 'outline'}
              size="sm"
              className="justify-start"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Problem Sets List */}
      {filteredProblemSets.length === 0 ? (
        <div className="py-12 text-center">
          <p className="mb-4 text-muted-foreground">
            {selectedCategory === 'All'
              ? 'No problem sets yet. Start creating problem sets!'
              : `No problem sets in the "${selectedCategory}" category.`}
          </p>
          <Link href={routes.problemGenerator}>
            <Button>
              <ArrowRightIcon className="mr-2 w-4 h-4" />
              Create Problem Set
            </Button>
          </Link>
        </div>
      ) : (
        <div className="gap-4 grid">
          {filteredProblemSets.map((problemSet) => {
            const isExpanded = expandedProblemSets.has(problemSet.id);
            
            return (
              <div
                key={problemSet.id}
                className="border rounded-lg overflow-hidden"
              >
                {/* Problem Set Header */}
                <div className="flex justify-between items-center hover:bg-muted/50 p-4 transition-colors">
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
                    <Button
                      onClick={() => toggleProblemSetExpansion(problemSet.id)}
                      color="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUpIcon className="w-4 h-4" />
                          Hide
                        </>
                      ) : (
                        <>
                          <ChevronDownIcon className="w-4 h-4" />
                          Show
                        </>
                      )}
                    </Button>
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
                    <Button
                      onClick={() => deleteProblemSetMutation.mutate(problemSet.id)}
                      color="outline"
                      size="sm"
                      disabled={deleteProblemSetMutation.isPending}
                    >
                      {deleteProblemSetMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2Icon className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Problem List Dropdown */}
                {isExpanded && (
                  <div className="bg-muted/30 border-t">
                    <div className="p-4">
                      <h4 className="mb-3 font-medium text-muted-foreground text-sm">
                        Problems in this set:
                      </h4>
                                             <div className="flex flex-col gap-2">
                         {problemSet.problems.map((problem, index) => (
                           <div
                             key={`${problemSet.id}-${problem.slug}-${index}`}
                             className="flex items-center gap-2"
                           >
                             <div className="block hover:bg-gray-800/50 p-4 border rounded-lg w-full transition-colors">
                               <div className="flex justify-between items-center">
                                 <h5 className="flex items-center gap-2 font-medium">
                                   <span className="font-mono text-muted-foreground text-sm">
                                     {String(index + 1).padStart(2, '0')}
                                   </span>
                                   {problem.title}
                                   <span
                                     className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                                       problem.difficulty
                                     )}`}
                                   >
                                     {problem.difficulty}
                                   </span>
                                 </h5>
                                 <div className="flex items-center gap-2">
                                   <CompletedBtn
                                     problemTitle={problem.title}
                                     variant="just-icon"
                                   />
                                   <AddToFavoriteBtn
                                     problemTitle={problem.title}
                                     variant="just-icon"
                                   />
                                   <Button asChild size="sm">
                                     <Link
                                       href={`/docs/${problem.slug}`}
                                       target="_blank"
                                       className="flex items-center gap-1"
                                     >
                                       View Problem
                                       <ArrowRightIcon className="w-4 h-4" />
                                     </Link>
                                   </Button>
                                   <Button asChild size="sm">
                                     <Link
                                       href={`https://leetcode.com/problems/${problem.slug
                                         .split('/')
                                         .pop()
                                         ?.replace('.mdx', '')}/`}
                                       target="_blank"
                                       className="flex items-center gap-2 font-bold hover:underline transition-all duration-500"
                                     >
                                       <span>View on LeetCode</span>
                                       <ExternalLinkIcon className="size-4" />
                                     </Link>
                                   </Button>
                                 </div>
                               </div>
                             </div>
                           </div>
                         ))}
                       </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
