import '@/app/global.css';
import { CompletedProvider } from '@/components/layout/sidebar/completed-context';
import { FavoritesProvider } from '@/components/layout/sidebar/favorites-context';
import { ProblemSetsProvider } from '@/components/layout/sidebar/problem-sets-context';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          <FavoritesProvider>
            <CompletedProvider>
              <ProblemSetsProvider>{children}</ProblemSetsProvider>
            </CompletedProvider>
          </FavoritesProvider>
        </RootProvider>
      </body>
    </html>
  );
}
