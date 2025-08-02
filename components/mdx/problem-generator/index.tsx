'use client';

import { AuthDialog } from '@/components/ui/auth-dialog';
import FilterControls from './filter-controls';
import ProblemList from './problem-list';
import { useProblemGenerator } from './use-problem-generator';

const ProblemGenerator = () => {
  const {
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
  } = useProblemGenerator();

  return (
    <div>
      <FilterControls
        topics={topics}
        selectedTopic={selectedTopic}
        selectedDifficulty={selectedDifficulty}
        onTopicChange={handleTopicChange}
        onDifficultyChange={handleDifficultyChange}
      />

      {/* Generated Problems */}
      {generatedProblems.length > 0 && (
        <ProblemList
          generatedProblems={generatedProblems}
          topics={topics}
          selectedTopic={selectedTopic}
          selectedDifficulty={selectedDifficulty}
          showSuccessMessage={showSuccessMessage}
          onSaveProblemSet={handleSaveProblemSet}
          onAuthRequired={handleAuthRequired}
        />
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

      {/* Authentication Dialog */}
      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        title="Sign in to save problem sets"
        description="You need to be signed in to save and manage your problem sets. Sign in to continue."
      />
    </div>
  );
};

export default ProblemGenerator;
