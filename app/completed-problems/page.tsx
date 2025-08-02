import CompletedProblemsClient from '@/app/completed-problems/completed-problems.client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shine75 | Completed Problems',
};

export default function CompletedProblemsPage() {
  return <CompletedProblemsClient />;
}
