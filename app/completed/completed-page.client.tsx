'use client';

import { useCompleted } from '@/components/layout/sidebar/completed-context';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/routes';
import { getAvailableCategories, getCategoryFromTitle } from '@/lib/utils';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  CheckCircleIcon,
  CircleIcon,
  Filter,
  Share,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

interface CompletedPageProblem {
  title: string;
  completedAt: string;
  topic?: string;
}

interface CompletedProblemSet {
  id: number;
  problem_set_id: number;
  name: string;
  description?: string;
  problems: any[];
  completed_at: string;
  user_id?: string;
}

export default function CompletedPageClient() {
  const { completedProblems, removeCompleted, toggleCompleted, isLoaded } =
    useCompleted();
  const [filteredCompleted, setFilteredCompleted] = useState<
    CompletedPageProblem[]
  >([]);
  const [completedProblemSets, setCompletedProblemSets] = useState<CompletedProblemSet[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [activeTab, setActiveTab] = useState<'problems' | 'problem-sets'>('problems');

  // Convert Set<string> to CompletedProblem[] format - memoized to prevent infinite loops
  const completedList: CompletedPageProblem[] = useMemo(
    () =>
      Array.from(completedProblems).map((title) => ({
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
    if (
      confirm(
        'Are you sure you want to remove all completed problems? This action cannot be undone.'
      )
    ) {
      // Remove all completed problems by clearing the Set
      completedProblems.forEach((title) => {
        removeCompleted(title);
      });
    }
  };

  const handleRemoveAllProblemSets = async () => {
    if (
      confirm(
        'Are you sure you want to remove all completed problem sets? This action cannot be undone.'
      )
    ) {
      try {
        for (const problemSet of completedProblemSets) {
          await fetch('/api/completed-problem-sets', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              problem_set_id: problemSet.problem_set_id,
              user_id: problemSet.user_id 
            }),
          });
        }
        setCompletedProblemSets([]);
      } catch (error) {
        console.error('Error removing all completed problem sets:', error);
      }
    }
  };

  const handleRemoveProblemSet = async (problemSet: CompletedProblemSet) => {
    try {
      await fetch('/api/completed-problem-sets', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          problem_set_id: problemSet.problem_set_id,
          user_id: problemSet.user_id 
        }),
      });
      setCompletedProblemSets(prev => 
        prev.filter(ps => ps.id !== problemSet.id)
      );
    } catch (error) {
      console.error('Error removing completed problem set:', error);
    }
  };

  const handleShareProblemSet = (problemSet: CompletedProblemSet) => {
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
          <CheckCircle className="mx-auto mb-4 w-12 h-12 text-muted-foreground animate-pulse" />
          <h3 className="mb-2 font-semibold text-lg">
            Loading completed problems...
          </h3>
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
              <CheckCircleIcon className="w-8 h-8 text-green-500" />
              Completed
            </h1>
            <p className="mt-2 text-muted-foreground">
              Your completed problems and problem sets for tracking progress
            </p>
          </div>
          {(completedList.length > 0 || completedProblemSets.length > 0) && (
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
              {activeTab === 'problems' && completedList.length > 0 && (
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
              {activeTab === 'problem-sets' && completedProblemSets.length > 0 && (
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
            Problems ({completedList.length})
          </Button>
          <Button
            color={activeTab === 'problem-sets' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('problem-sets')}
          >
            Problem Sets ({completedProblemSets.length})
          </Button>
        </div>

        {showCategoryFilter && completedList.length > 0 && activeTab === 'problems' && (
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
        completedList.length === 0 ? (
          <div className="py-12 text-center">
            <CheckCircle className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
            <h3 className="mb-2 font-semibold text-lg">
              No completed problems yet
            </h3>
            <p className="mb-4 text-muted-foreground">
              Start solving problems and mark them as completed!
            </p>
            <Link href={routes.docs}>
              <Button>Browse Problems</Button>
            </Link>
          </div>
        ) : filteredCompleted.length === 0 ? (
          <div className="py-12 text-center">
            <Filter className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
            <h3 className="mb-2 font-semibold text-lg">
              No problems in this category
            </h3>
            <p className="mb-4 text-muted-foreground">
              Try selecting a different category or complete more problems.
            </p>
          </div>
        ) : (
          <div className="gap-4 grid">
            {filteredCompleted.map((completed, index) => (
              <div
                key={index}
                className="hover:bg-accent/50 p-4 border rounded-lg transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{completed.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-green-100 px-2 py-1 rounded-full text-green-800 text-xs">
                        {completed.topic || getCategoryFromTitle(completed.title)}
                      </span>
                      <p className="text-muted-foreground text-sm">
                        Completed on{' '}
                        {new Date(completed.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button onClick={() => toggleCompleted(completed.title)}>
                      <CircleIcon className="w-5 h-5" />
                    </Button>
                    <Link
                      href={`/docs/${completed.title
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
        completedProblemSets.length === 0 ? (
          <div className="py-12 text-center">
            <BookOpen className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
            <h3 className="mb-2 font-semibold text-lg">
              No completed problem sets yet
            </h3>
            <p className="mb-4 text-muted-foreground">
              Start creating and completing problem sets!
            </p>
            <Link href={routes.problemGenerator}>
              <Button>Create Problem Set</Button>
            </Link>
          </div>
        ) : (
          <div className="gap-4 grid">
            {completedProblemSets.map((problemSet) => (
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
                      <span className="bg-green-100 px-2 py-1 rounded-full text-green-800 text-xs">
                        {problemSet.problems.length} problems
                      </span>
                      <p className="text-muted-foreground text-sm">
                        Completed on {new Date(problemSet.completed_at).toLocaleDateString()}
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
