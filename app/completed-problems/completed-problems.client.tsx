'use client';

import { useCompleted } from '@/components/layout/sidebar/completed-context';
import { Button } from '@/components/ui/button';
import { getAvailableCategories, getCategoryFromTitle } from '@/lib/utils';
import {
  ArrowLeft,
  CheckCircle,
  CheckCircleIcon,
  CircleIcon,
  Filter,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

interface CompletedProblem {
  title: string;
  completedAt: string;
  topic?: string;
}

export default function CompletedProblemsClient() {
  const { completedProblems, removeCompleted, toggleCompleted, isLoaded } =
    useCompleted();
  const [filteredCompleted, setFilteredCompleted] = useState<
    CompletedProblem[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  // Convert Set<string> to CompletedProblem[] format - memoized to prevent infinite loops
  const completedList: CompletedProblem[] = useMemo(
    () =>
      Array.from(completedProblems).map((title) => ({
        title,
        completedAt: new Date().toISOString(), // Since we don't store timestamps in context, use current time
        topic: getCategoryFromTitle(title),
      })),
    [completedProblems]
  );

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
              <CheckCircleIcon className="w-8 h-8 text-green-500" />
              Completed Problems
            </h1>
            <p className="mt-2 text-muted-foreground">
              Your completed problems for tracking progress
            </p>
          </div>
          {completedList.length > 0 && (
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

        {showCategoryFilter && completedList.length > 0 && (
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

      {completedList.length === 0 ? (
        <div className="py-12 text-center">
          <CheckCircle className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
          <h3 className="mb-2 font-semibold text-lg">
            No completed problems yet
          </h3>
          <p className="mb-4 text-muted-foreground">
            Start solving problems and mark them as completed!
          </p>
          <Link href="/docs">
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
      )}
    </div>
  );
}
