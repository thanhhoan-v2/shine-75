import FavoriteProblemsClient from '@/app/favorite-problems/favorite-problems.client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shine75 | Favorite Problems',
};

export default function FavoriteProblemsPage() {
  return <FavoriteProblemsClient />;
}
