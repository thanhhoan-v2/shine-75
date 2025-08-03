'use client';

import { useCreateProblemSet } from '@/lib/hooks';
import { useUser } from '@stackframe/stack';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { transformProblems } from './data-transformer';
import { Problem } from './types';

export const useProblemGenerator = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [generatedProblems, setGeneratedProblems] = useState<Problem[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const createProblemSetMutation = useCreateProblemSet();
  const user = useUser();

  // Memoize the transformed topics to prevent infinite re-renders
  const topics = useMemo(() => transformProblems(), []);

  // Initialize state from URL parameters on component mount
  useEffect(() => {
    const topicFromUrl = searchParams.get('topic');
    const difficultyFromUrl = searchParams.get('difficulty');

    if (topicFromUrl) {
      setSelectedTopic(topicFromUrl);
    }
    if (difficultyFromUrl) {
      setSelectedDifficulty(difficultyFromUrl);
    }
  }, [searchParams]);

  // Update URL when topic or difficulty changes
  const updateUrl = (topic: string, difficulty: string) => {
    const params = new URLSearchParams();
    if (topic) params.set('topic', topic);
    if (difficulty) params.set('difficulty', difficulty);

    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.replace(newUrl, { scroll: false });
  };

  // Handle topic selection
  const handleTopicChange = (topicSlug: string) => {
    const newTopic = selectedTopic === topicSlug ? '' : topicSlug;
    setSelectedTopic(newTopic);
    updateUrl(newTopic, selectedDifficulty);
  };

  // Handle difficulty selection
  const handleDifficultyChange = (difficulty: string) => {
    const newDifficulty = selectedDifficulty === difficulty ? '' : difficulty;
    setSelectedDifficulty(newDifficulty);
    updateUrl(selectedTopic, newDifficulty);
  };

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
  }, [selectedTopic, selectedDifficulty, topics]);

  const handleSaveProblemSet = () => {
    if (!user) {
      setShowAuthDialog(true);
      return;
    }

    const topicName = selectedTopic
      ? topics.find((t) => t.slug === selectedTopic)?.name || 'Unknown Topic'
      : 'All Topics';
    const difficultyText = selectedDifficulty || 'All Difficulties';
    const problemCount = generatedProblems.length;

    const problemSetName = `${topicName} - ${difficultyText} - ${problemCount} Problem${
      problemCount !== 1 ? 's' : ''
    }`;

    createProblemSetMutation.mutate({
      name: problemSetName,
      problems: generatedProblems,
      topic: selectedTopic
        ? topics.find((t) => t.slug === selectedTopic)?.name || 'All Topics'
        : 'All Topics',
      difficulty: selectedDifficulty || 'All',
      description: `Generated problem set for ${
        selectedTopic
          ? topics.find((t) => t.slug === selectedTopic)?.name
          : 'All Topics'
      } with ${selectedDifficulty || 'All'} difficulty problems.`,
    });

    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleAuthRequired = () => {
    setShowAuthDialog(true);
  };

  return {
    topics,
    selectedTopic,
    selectedDifficulty,
    generatedProblems,
    showSuccessMessage,
    showAuthDialog,
    setShowAuthDialog,
    handleTopicChange,
    handleDifficultyChange,
    handleSaveProblemSet,
    handleAuthRequired,
  };
};
