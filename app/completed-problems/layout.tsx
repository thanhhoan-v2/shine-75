import { CompletedProvider } from '@/components/layout/sidebar/completed-context';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <CompletedProvider>{children}</CompletedProvider>;
} 