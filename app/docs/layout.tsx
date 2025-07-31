import { baseOptions } from '@/app/layout.config';
import { DocsLayout } from '@/components/layouts/docs';
import { routes } from '@/lib/routes';
import { source } from '@/lib/source';
import { HeartIcon } from 'lucide-react';
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
          <Link
            href="/favorites"
            className="flex items-center gap-2 font-medium text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            <HeartIcon fill="red" className="w-4 h-4" /> Your Favorites
          </Link>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
