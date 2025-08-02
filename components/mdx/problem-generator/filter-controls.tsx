'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { difficulties } from './data-transformer';
import { Topic } from './types';

interface FilterControlsProps {
  topics: Topic[];
  selectedTopic: string;
  selectedDifficulty: string;
  onTopicChange: (topicSlug: string) => void;
  onDifficultyChange: (difficulty: string) => void;
}

const FilterControls = ({
  topics,
  selectedTopic,
  selectedDifficulty,
  onTopicChange,
  onDifficultyChange,
}: FilterControlsProps) => {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      {/* Topic Selection */}
      <div className="space-y-2">
        <Badge className="block font-medium text-sm">Topic</Badge>
        <div className="gap-2 grid grid-cols-2">
          {topics.map((topic) => (
            <Button
              key={topic.slug}
              color={selectedTopic === topic.slug ? 'primary' : 'outline'}
              onClick={() => onTopicChange(topic.slug)}
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
              onClick={() => onDifficultyChange(difficulty)}
            >
              {difficulty}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterControls; 