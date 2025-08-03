import '@/app/global.css';
import { CompletedProvider } from '@/components/layout/sidebar/completed-context';
import { FavoritesProvider } from '@/components/layout/sidebar/favorites-context';
import { QueryProvider } from '@/components/providers/query-provider';
import { Toaster } from '@/components/ui/sonner';
import { StackProvider, StackTheme } from '@stackframe/stack';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { stackServerApp } from '../stack';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <RootProvider>
              <QueryProvider>
                <FavoritesProvider>
                  <CompletedProvider>
                    {children}
                    <Toaster />
                  </CompletedProvider>
                </FavoritesProvider>
              </QueryProvider>
            </RootProvider>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
