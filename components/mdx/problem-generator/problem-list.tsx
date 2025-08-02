'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/routes';
import { useUser } from '@stackframe/stack';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ExternalLinkIcon,
  SaveIcon,
} from 'lucide-react';
import Link from 'next/link';
import AddToFavoriteBtn from '../add-to-favorite-btn';
import CompletedBtn from '../completed-btn';
import { getDifficultyColor } from './data-transformer';
import { Problem, Topic } from './types';

interface ProblemListProps {
  generatedProblems: Problem[];
  topics: Topic[];
  selectedTopic: string;
  selectedDifficulty: string;
  showSuccessMessage: boolean;
  onSaveProblemSet: () => void;
  onAuthRequired: () => void;
}

const ProblemList = ({
  generatedProblems,
  topics,
  selectedTopic,
  selectedDifficulty,
  showSuccessMessage,
  onSaveProblemSet,
  onAuthRequired,
}: ProblemListProps) => {
  const user = useUser();

  if (generatedProblems.length === 0) {
    return (
      <div className="py-8 text-gray-500 text-center">
        <p>
          No problems found
          {selectedTopic && selectedDifficulty
            ? ` for ${
                topics.find((t) => t.slug === selectedTopic)?.name
              } (${selectedDifficulty})`
            : selectedTopic
            ? ` for ${topics.find((t) => t.slug === selectedTopic)?.name}`
            : selectedDifficulty
            ? ` (${selectedDifficulty}) across all topics`
            : ''}
          .
        </p>
        <p className="mt-1 text-sm">
          Try selecting a different difficulty or topic.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mt-5">
        <Badge className="font-semibold text-md">
          {generatedProblems.length} Problem
          {generatedProblems.length !== 1 ? 's' : ''}
          {selectedTopic && selectedDifficulty
            ? ` in ${
                topics.find((t) => t.slug === selectedTopic)?.name
              } (${selectedDifficulty})`
            : selectedTopic
            ? ` in ${topics.find((t) => t.slug === selectedTopic)?.name}`
            : selectedDifficulty
            ? ` (${selectedDifficulty}) across all topics`
            : ''}
        </Badge>
        {showSuccessMessage ? (
          <Button className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4" />
            Saved! View in <Link href={routes.problemSets}>Problem Sets</Link>
          </Button>
        ) : (
          <Button
            onClick={onSaveProblemSet}
            className="flex items-center gap-2"
          >
            <SaveIcon className="w-4 h-4" />
            Save as Problem Set
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto">
        {generatedProblems.map((problem, index) => (
          <div
            key={`${selectedTopic || 'all'}-${problem.slug}-${index}`}
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
                    onAuthRequired={() => {
                      if (!user) {
                        onAuthRequired();
                        return true;
                      }
                      return false;
                    }}
                  />
                  <AddToFavoriteBtn
                    problemTitle={problem.title}
                    variant="just-icon"
                    onAuthRequired={() => {
                      if (!user) {
                        onAuthRequired();
                        return true;
                      }
                      return false;
                    }}
                  />
                  <Button asChild>
                    <Link
                      href={`/docs/${problem.slug}`}
                      target="_blank"
                      className="flex items-center gap-1"
                    >
                      View Problem
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild>
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
  );
};

export default ProblemList;
