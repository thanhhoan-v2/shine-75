import type { Metadata } from 'next';
import FavoritesPageClient from './favorites-page.client';

export const metadata: Metadata = {
  title: 'Shine75 | Favorite Problems',
};

export default function FavoritesPage() {
  return <FavoritesPageClient />;
}
