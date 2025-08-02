import ProblemSetClient from '@/app/problem-set/problem-set.client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shine75 | Problem Sets',
};

export default function ProblemSetPage() {
  return <ProblemSetClient />;
}
