'use client';

import { Button } from '@/components/ui/button';
import { getAllPatterns, studyPlan } from '@/lib/db';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ExternalLinkIcon,
  SaveIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useProblemSets } from '../layout/sidebar/problem-sets-context';
import { Badge } from '../ui/badge';
import AddToFavoriteBtn from './add-to-favorite-btn';
import CompletedBtn from './completed-btn';

interface Problem {
  title: string;
  difficulty: string;
  description: string;
  timeLimit: string;
  week: number;
  tags: string[];
  slug: string;
}

interface Topic {
  name: string;
  slug: string;
  problems: Problem[];
}

// Transform the data from db.ts to match our component interface
const transformProblems = (): Topic[] => {
  const patterns = getAllPatterns();

  return patterns.map((patternName) => {
    const pattern = studyPlan[patternName];

    const patternSlugMap: Record<string, string> = {
      Backtracking: 'backtracking',
      'Bit Manipulation': 'bit-manipulation',
      'Cyclic Sort': 'cyclic-sort',
      'Fast & Slow Pointers': 'fast-slow-pointers',
      'Graph Traversal': 'graph-traversal',
      'Hash Table': 'hash-table',
      Heap: 'heap',
      'Linked List': 'linked-list',
      'Merge Intervals': 'merge-intervals',
      'Sliding Window': 'sliding-window',
      Stack: 'stack',
      'Topological Sort': 'topological-sort',
      'Tree Traversal': 'tree-traversal',
      'Two Pointers': 'two-pointers',
    };

    const slug =
      patternSlugMap[patternName] ||
      patternName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[&]/g, '')
        .replace(/[()]/g, '') // Remove parentheses
        .replace(/--/g, '-');

    // Transform problems to match our interface
    const problems: Problem[] = pattern.problems.map((problem, index) => ({
      title: problem.name,
      difficulty: problem.difficulty,
      description: `Practice ${problem.name} - ${problem.category} problem`, // Placeholder description
      timeLimit:
        problem.difficulty === 'Easy'
          ? '15 mins'
          : problem.difficulty === 'Medium'
          ? '25 mins'
          : '35 mins',
      week: Math.floor(index / 3) + 1, // Distribute across weeks
      tags: [problem.category, patternName],
      slug: `${slug}/${problem.name.toLowerCase().replace(/\s+/g, '-')}`,
    }));

    return {
      name: patternName,
      slug,
      problems,
    };
  });
};

const topics = transformProblems();
const difficulties = ['Easy', 'Medium', 'Hard'];

const ProblemGenerator = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [generatedProblems, setGeneratedProblems] = useState<Problem[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { addProblemSet } = useProblemSets();

  // Automatically generate problems when both topic and difficulty are selected
  useEffect(() => {
    if (selectedTopic) {
      if (selectedDifficulty) {
        // Filter by specific topic and difficulty
        const topic = topics.find((t) => t.slug === selectedTopic);
        if (topic) {
          const filteredProblems = topic.problems.filter(
            (problem) => problem.difficulty === selectedDifficulty
          );
          setGeneratedProblems(filteredProblems);
        }
      } else {
        // Show all problems for the selected topic across all difficulties
        const topic = topics.find((t) => t.slug === selectedTopic);
        if (topic) {
          setGeneratedProblems(topic.problems);
        }
      }
    } else if (selectedDifficulty) {
      // Show all problems for the selected difficulty across all topics
      const allProblems = topics.flatMap((topic) =>
        topic.problems.filter(
          (problem) => problem.difficulty === selectedDifficulty
        )
      );
      setGeneratedProblems(allProblems);
    } else {
      setGeneratedProblems([]);
    }
  }, [selectedTopic, selectedDifficulty]);

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

  const handleSaveProblemSet = () => {
    const topicName = selectedTopic
      ? topics.find((t) => t.slug === selectedTopic)?.name || 'Unknown Topic'
      : 'All Topics';
    const difficultyText = selectedDifficulty || 'All Difficulties';
    const problemCount = generatedProblems.length;

    const problemSetName = `${topicName} - ${difficultyText} - ${problemCount} Problem${
      problemCount !== 1 ? 's' : ''
    }`;

    addProblemSet({
      name: problemSetName,
      problems: generatedProblems,
      topic: selectedTopic
        ? topics.find((t) => t.slug === selectedTopic)?.name
        : undefined,
      difficulty: selectedDifficulty || undefined,
    });

    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div>
      <div className="space-y-4 p-4 border rounded-lg">
        {/* Topic Selection */}
        <div className="space-y-2">
          <Badge className="block font-medium text-sm">Topic</Badge>
          <div className="gap-2 grid grid-cols-2">
            {topics.map((topic) => (
              <Button
                key={topic.slug}
                color={selectedTopic === topic.slug ? 'primary' : 'outline'}
                onClick={() =>
                  setSelectedTopic(
                    selectedTopic === topic.slug ? '' : topic.slug
                  )
                }
                className="justify-start"
              >
                {topic.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="space-y-2">
          <Badge className="block font-medium text-sm">Difficulty</Badge>
          <div className="flex gap-2">
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                color={
                  selectedDifficulty === difficulty ? 'primary' : 'outline'
                }
                onClick={() =>
                  setSelectedDifficulty(
                    selectedDifficulty === difficulty ? '' : difficulty
                  )
                }
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Generated Problems */}
      {generatedProblems.length > 0 && (
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
                Saved! View in <Link href="/problem-set">Problem Sets</Link>
              </Button>
            ) : (
              <Button
                onClick={handleSaveProblemSet}
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
                      />
                      <AddToFavoriteBtn
                        problemTitle={problem.title}
                        variant="just-icon"
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
      )}

      {/* No Results */}
      {((selectedTopic && !selectedDifficulty) ||
        (selectedDifficulty && !selectedTopic) ||
        (selectedTopic && selectedDifficulty)) &&
        generatedProblems.length === 0 && (
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
        )}
    </div>
  );
};

export default ProblemGenerator;
