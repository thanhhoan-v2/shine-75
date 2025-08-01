import { baseOptions } from '@/app/layout.config';
import { CompletedProvider } from '@/components/layout/sidebar/completed-context';
import { FavoritesProvider } from '@/components/layout/sidebar/favorites-context';
import { DocsLayout } from '@/components/layouts/docs';
import { routes } from '@/lib/routes';
import { source } from '@/lib/source';
import { CheckCircleIcon, HeartIcon } from 'lucide-react';
import Link from 'next/link';
// import { DocsLayout } from "fumadocs-ui/layouts/docs";
// import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <FavoritesProvider>
      <CompletedProvider>
        <DocsLayout
          {...baseOptions}
          tree={source.pageTree}
          nav={{ ...baseOptions.nav, mode: 'top' }}
          githubUrl={routes.github.repo}
          sidebar={{
            collapsible: false,
            footer: (
              <div className="flex items-center gap-2">
                <Link
                  href="/favorites"
                  className="flex items-center gap-2 bg-accent p-2 rounded-md font-medium text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  <HeartIcon fill="red" className="w-4 h-4" /> Your Favorites
                </Link>
                <Link
                  href="/complete"
                  className="flex items-center gap-2 bg-accent p-2 rounded-md font-medium text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />{' '}
                  Completed Problems
                </Link>
              </div>
            ),
          }}
        >
          {children}
        </DocsLayout>
      </CompletedProvider>
    </FavoritesProvider>
  );
}
