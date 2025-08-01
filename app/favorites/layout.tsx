import { CompletedProvider } from '@/components/layout/sidebar/completed-context';
import { FavoritesProvider } from '@/components/layout/sidebar/favorites-context';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <FavoritesProvider>
      <CompletedProvider>{children}</CompletedProvider>
    </FavoritesProvider>
  );
} 