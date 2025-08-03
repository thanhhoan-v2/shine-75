'use server';

import { stackServerApp } from '@/stack';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export interface CompletedProblem {
  title: string;
  topic: string;
  completed_at: string;
}

export async function getCompletedProblems(): Promise<string[]> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return [];
    }
    
    const result = await sql`SELECT title FROM completed_problems WHERE user_id = ${user.id} ORDER BY completed_at DESC`;
    return result.map(row => row.title);
  } catch (error) {
    console.error('Error fetching completed problems:', error);
    return [];
  }
}

export async function getCompletedProblemsWithDetails(): Promise<CompletedProblem[]> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return [];
    }
    
    const result = await sql`SELECT title, topic, completed_at FROM completed_problems WHERE user_id = ${user.id} ORDER BY completed_at DESC`;
    return result.map(row => ({
      title: row.title,
      topic: row.topic,
      completed_at: row.completed_at
    }));
  } catch (error) {
    console.error('Error fetching completed problems with details:', error);
    return [];
  }
}

export async function addCompletedProblem(title: string, topic: string): Promise<void> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      throw new Error('Unauthorized');
    }
    
    await sql`INSERT INTO completed_problems (title, topic, user_id) VALUES (${title}, ${topic}, ${user.id}) ON CONFLICT (title, user_id) DO NOTHING`;
  } catch (error) {
    console.error('Error adding completed problem:', error);
    throw new Error('Failed to add completed problem');
  }
}

export async function removeCompletedProblem(title: string): Promise<void> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      throw new Error('Unauthorized');
    }
    
    await sql`DELETE FROM completed_problems WHERE title = ${title} AND user_id = ${user.id}`;
  } catch (error) {
    console.error('Error removing completed problem:', error);
    throw new Error('Failed to remove completed problem');
  }
}

export async function isCompleted(title: string): Promise<boolean> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return false;
    }
    
    const result = await sql`SELECT 1 FROM completed_problems WHERE title = ${title} AND user_id = ${user.id} LIMIT 1`;
    return result.length > 0;
  } catch (error) {
    console.error('Error checking if completed:', error);
    return false;
  }
}

export async function getCompletedProblemSets(): Promise<any[]> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return [];
    }
    
    const result = await sql`SELECT id, name, description, problems, topic, difficulty, created_at FROM completed_problem_sets WHERE user_id = ${user.id} ORDER BY created_at DESC`;
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
    console.error('Error fetching completed problem sets:', error);
    return [];
  }
}

export async function addCompletedProblemSet(data: {
  name: string;
  description: string;
  problems: string[];
  topic: string;
  difficulty: string;
}): Promise<{ id: number }> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      throw new Error('Unauthorized');
    }
    
    const { name, description, problems, topic, difficulty } = data;
    const result = await sql`INSERT INTO completed_problem_sets (name, description, problems, topic, difficulty, user_id) VALUES (${name}, ${description}, ${JSON.stringify(problems)}, ${topic}, ${difficulty}, ${user.id}) RETURNING id`;
    return { id: result[0]?.id || 0 };
  } catch (error) {
    console.error('Error adding completed problem set:', error);
    throw new Error('Failed to add completed problem set');
  }
} 