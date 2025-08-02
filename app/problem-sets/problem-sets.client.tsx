'use client';

import { useProblemSets } from '@/components/layout/sidebar/problem-sets-context';
import AddToFavoriteBtn from '@/components/mdx/add-to-favorite-btn';
import CompletedBtn from '@/components/mdx/completed-btn';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  ArrowRightIcon,
  ExternalLinkIcon,
  Trash2Icon,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function ProblemSetsClient() {
  const { problemSets, removeProblemSet, isLoaded } = useProblemSets();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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
    if (
      confirm(
        'Are you sure you want to remove all problem sets? This action cannot be undone.'
      )
    ) {
      problemSets.forEach((problemSet) => {
        removeProblemSet(problemSet.id);
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Show loading state while context is loading
  if (!isLoaded) {
    return (
      <div className="mx-auto px-4 py-8 container">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="mx-auto mb-4 border-primary border-b-2 rounded-full w-8 h-8 animate-spin"></div>
            <p className="text-muted-foreground">Loading problem sets...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto px-4 py-8 container">
        <div className="flex flex-col gap-6">
          <div className="mb-8">
            <Link href="/docs">
              <Button color="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Problems
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="font-bold text-3xl tracking-tight">
                  Problem Sets
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Your saved problem sets for focused practice
                </p>
              </div>
              {problemSets.length > 0 && (
                <Button
                  color="outline"
                  onClick={handleRemoveAll}
                  className="hover:bg-red-50 text-red-600 hover:text-red-700"
                >
                  <Trash2Icon className="mr-2 w-4 h-4" />
                  Remove All
                </Button>
              )}
            </div>

            {/* Category Filter */}
            {problemSets.length > 0 && (
              <div className="flex items-center gap-4">
                <Badge className="font-medium">Filter by Topic</Badge>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      color={
                        selectedCategory === category ? 'primary' : 'outline'
                      }
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

          {/* Problem Sets List */}
          {filteredProblemSets.length > 0 ? (
            <div className="space-y-6">
              {filteredProblemSets.map((problemSet) => (
                <div
                  key={problemSet.id}
                  className="space-y-4 p-6 border rounded-lg"
                >
                  {/* Problem Set Header */}
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <h2 className="font-semibold text-xl">
                        {problemSet.name}
                      </h2>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <span>{problemSet.problems.length} problems</span>
                        <span>•</span>
                        <span>Created {formatDate(problemSet.createdAt)}</span>
                        {problemSet.topic && (
                          <>
                            <span>•</span>
                            <span>{problemSet.topic}</span>
                          </>
                        )}
                        {problemSet.difficulty && (
                          <>
                            <span>•</span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                                problemSet.difficulty
                              )}`}
                            >
                              {problemSet.difficulty}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <Button
                      color="outline"
                      size="sm"
                      onClick={() => removeProblemSet(problemSet.id)}
                      className="hover:bg-red-50 text-red-600 hover:text-red-700"
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Problems List */}
                  <div className="space-y-2">
                    {problemSet.problems.map((problem, index) => (
                      <div
                        key={`${problemSet.id}-${problem.slug}-${index}`}
                        className="flex items-center gap-2"
                      >
                        <div className="block hover:bg-gray-800/50 p-4 border rounded-lg w-full transition-colors">
                          <div className="flex justify-between items-center">
                            <h5 className="flex items-center gap-2 font-medium">
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
                              <Button asChild size="sm" color="outline">
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
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="flex justify-center items-center bg-muted mx-auto mb-4 rounded-full w-24 h-24">
                <svg
                  className="w-12 h-12 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold text-lg">
                No problem sets yet
              </h3>
              <p className="mb-4 text-muted-foreground">
                {selectedCategory === 'All'
                  ? "You haven't created any problem sets yet."
                  : `No problem sets found for ${selectedCategory}.`}
              </p>
              <Button asChild>
                <Link href="/docs/problem-generator">
                  Create Your First Problem Set
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 