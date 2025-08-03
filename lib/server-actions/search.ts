'use server';

import { stackServerApp } from '@/stack';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export interface SearchResult {
  title: string;
  topic: string;
  difficulty: string;
  description?: string;
}

export async function searchProblems(query: string): Promise<SearchResult[]> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      throw new Error('Unauthorized');
    }
    
    // Search in the problems table or content
    const result = await sql`
      SELECT DISTINCT title, topic, difficulty 
      FROM problems 
      WHERE (title ILIKE ${`%${query}%`} OR topic ILIKE ${`%${query}%`})
      ORDER BY title ASC
      LIMIT 50
    `;
    
    return result.map(row => ({
      title: row.title,
      topic: row.topic,
      difficulty: row.difficulty
    }));
  } catch (error) {
    console.error('Error searching problems:', error);
    throw new Error('Failed to search problems');
  }
}

export async function searchProblemSets(query: string): Promise<any[]> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      throw new Error('Unauthorized');
    }
    
    const result = await sql`
      SELECT id, name, description, problems, topic, difficulty, created_at 
      FROM all_problem_sets 
      WHERE user_id = ${user.id} 
      AND (name ILIKE ${`%${query}%`} OR description ILIKE ${`%${query}%`} OR topic ILIKE ${`%${query}%`})
      ORDER BY created_at DESC
    `;
    
    return result.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      problems: row.problems || [],
      topic: row.topic,
      difficulty: row.difficulty,
      created_at: row.created_at
    }));
  } catch (error) {
    console.error('Error searching problem sets:', error);
    throw new Error('Failed to search problem sets');
  }
}

export async function searchFavorites(query: string): Promise<SearchResult[]> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      throw new Error('Unauthorized');
    }
    
    const result = await sql`
      SELECT title, topic, added_at as difficulty
      FROM favorite_problems 
      WHERE user_id = ${user.id} 
      AND (title ILIKE ${`%${query}%`} OR topic ILIKE ${`%${query}%`})
      ORDER BY added_at DESC
    `;
    
    return result.map(row => ({
      title: row.title,
      topic: row.topic,
      difficulty: row.difficulty
    }));
  } catch (error) {
    console.error('Error searching favorites:', error);
    throw new Error('Failed to search favorites');
  }
}

export async function searchCompleted(query: string): Promise<SearchResult[]> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      throw new Error('Unauthorized');
    }
    
    const result = await sql`
      SELECT title, topic, completed_at as difficulty
      FROM completed_problems 
      WHERE user_id = ${user.id} 
      AND (title ILIKE ${`%${query}%`} OR topic ILIKE ${`%${query}%`})
      ORDER BY completed_at DESC
    `;
    
    return result.map(row => ({
      title: row.title,
      topic: row.topic,
      difficulty: row.difficulty
    }));
  } catch (error) {
    console.error('Error searching completed problems:', error);
    throw new Error('Failed to search completed problems');
  }
} 