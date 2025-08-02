'use client';

import AddToFavoriteBtn from '@/components/mdx/add-to-favorite-btn';
import CompletedBtn from '@/components/mdx/completed-btn';
import { AuthDialog } from '@/components/ui/auth-dialog';
import { Button } from '@/components/ui/button';
import { useUser } from '@stackframe/stack';
import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface DocsPageButtonsProps {
  problemTitle: string;
  topic?: string;
  leetcodePath: string;
}

export function DocsPageButtons({
  problemTitle,
  topic,
  leetcodePath,
}: DocsPageButtonsProps) {
  const user = useUser();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleAuthRequired = () => {
    if (!user) {
      setShowAuthDialog(true);
      return true; // Indicates authentication is required
    }
    return false; // User is authenticated
  };

  return (
    <>
      <div className="flex gap-2">
        <AddToFavoriteBtn
          problemTitle={problemTitle}
          topic={topic}
          onAuthRequired={handleAuthRequired}
        />
        <CompletedBtn
          problemTitle={problemTitle}
          topic={topic}
          onAuthRequired={handleAuthRequired}
        />
        <Button asChild>
          <Link
            href={`https://leetcode.com/problems/${leetcodePath
              .split('/')
              .pop()
              ?.replace('.mdx', '')}/`}
            target="_blank"
            className="flex items-center gap-2 px-3 border font-bold hover:underline transition-all duration-500"
          >
            <span>View on LeetCode</span>
            <ExternalLinkIcon className="size-4" />
          </Link>
        </Button>
      </div>
      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        title="Sign in to save progress"
        description="You need to be signed in to save your favorites and completed problems. Sign in to continue."
      />
    </>
  );
} 