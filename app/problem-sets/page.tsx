import ProblemSetsClient from '@/app/problem-sets/problem-sets.client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shine75 | Problem Sets',
};

export default function ProblemSetsPage() {
  return <ProblemSetsClient />;
}
