import type { Metadata } from 'next';
import CompletedPageClient from './completed-page.client';

export const metadata: Metadata = {
  title: 'Shine75 | Completed Problems',
};

export default function CompletedPage() {
  return <CompletedPageClient />;
}
