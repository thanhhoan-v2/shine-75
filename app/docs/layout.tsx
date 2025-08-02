import { baseOptions } from '@/app/layout.config';
import { DocsLayout } from '@/components/layouts/docs';
import { routes } from '@/lib/routes';
import { source } from '@/lib/source';
import Link from 'next/link';
// import { DocsLayout } from "fumadocs-ui/layouts/docs";
// import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
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
              href="/favorite-problems"
              className="gap-2 p-2 font-medium text-red-400 hover:text-foreground text-sm text-center transition-colors"
            >
              Favorites Problems
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link
              href="/completed-problems"
              className="gap-2 p-2 font-medium text-green-400 hover:text-foreground text-sm text-center transition-colors"
            >
              Completed Problems
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link
              href="/problem-sets"
              className="gap-2 p-2 font-medium text-blue-400 hover:text-foreground text-sm text-center transition-colors"
            >
              Problem Sets
            </Link>
          </div>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
