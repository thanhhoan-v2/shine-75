'use server';

import { stackServerApp } from '@/stack';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export interface FavoriteProblem {
  title: string;
  topic: string;
  added_at: string;
}

export async function getFavorites(): Promise<string[]> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return [];
    }
    
    const result = await sql`SELECT title FROM favorite_problems WHERE user_id = ${user.id} ORDER BY added_at DESC`;
    return result.map(row => row.title);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }
}

export async function getFavoritesWithDetails(): Promise<FavoriteProblem[]> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return [];
    }
    
    const result = await sql`SELECT title, topic, added_at FROM favorite_problems WHERE user_id = ${user.id} ORDER BY added_at DESC`;
    return result.map(row => ({
      title: row.title,
      topic: row.topic,
      added_at: row.added_at
    }));
  } catch (error) {
    console.error('Error fetching favorites with details:', error);
    return [];
  }
}

export async function addFavorite(title: string, topic: string): Promise<void> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      throw new Error('Unauthorized');
    }
    
    await sql`INSERT INTO favorite_problems (title, topic, user_id) VALUES (${title}, ${topic}, ${user.id}) ON CONFLICT (title, user_id) DO NOTHING`;
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw new Error('Failed to add favorite');
  }
}

export async function removeFavorite(title: string): Promise<void> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      throw new Error('Unauthorized');
    }
    
    await sql`DELETE FROM favorite_problems WHERE title = ${title} AND user_id = ${user.id}`;
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw new Error('Failed to remove favorite');
  }
}

export async function isFavorite(title: string): Promise<boolean> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return false;
    }
    
    const result = await sql`SELECT 1 FROM favorite_problems WHERE title = ${title} AND user_id = ${user.id} LIMIT 1`;
    return result.length > 0;
  } catch (error) {
    console.error('Error checking if favorite:', error);
    return false;
  }
} 