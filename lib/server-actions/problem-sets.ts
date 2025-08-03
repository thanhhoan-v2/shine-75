'use server';

import { stackServerApp } from '@/stack';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export interface Problem {
  title: string;
  difficulty: string;
  description: string;
  timeLimit: string;
  week: number;
  tags: string[];
  slug: string;
}

export interface ProblemSet {
  id: number;
  name: string;
  description: string;
  problems: Problem[];
  topic: string;
  difficulty: string;
  created_at: string;
}

export interface CreateProblemSetData {
  name: string;
  description: string;
  problems: Problem[];
  topic: string;
  difficulty: string;
}

import { studyPlan } from '@/lib/data/patterns';

// Helper function to find the actual difficulty of a problem
const findProblemDifficulty = (problemTitle: string): string => {
  for (const pattern of Object.values(studyPlan)) {
    const problem = pattern.problems.find(p => p.name === problemTitle);
    if (problem) {
      return problem.difficulty;
    }
  }
  return 'Medium'; // Fallback if problem not found
};

export async function getProblemSets(): Promise<ProblemSet[]> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      throw new Error('Unauthorized');
    }
    
    console.log('getProblemSets called for user:', user.id);
    const result = await sql`SELECT id, name, description, problems, topic, difficulty, created_at FROM all_problem_sets WHERE user_id = ${user.id} ORDER BY created_at DESC`;
    return result.map(row => {
      // Convert string array to Problem objects
      const problemTitles = row.problems || [];
      const problems: Problem[] = problemTitles.map((problemTitle: string) => ({
        title: problemTitle,
        difficulty: findProblemDifficulty(problemTitle),
        description: '',
        timeLimit: '',
        week: 1,
        tags: [],
        slug: problemTitle.toLowerCase().replace(/\s+/g, '-')
      }));
      
      return {
        id: row.id,
        name: row.name,
        description: row.description,
        problems: problems,
        topic: row.topic,
        difficulty: row.difficulty,
        created_at: row.created_at
      };
    });
  } catch (error) {
    console.error('Error fetching problem sets:', error);
    throw new Error('Failed to fetch problem sets');
  }
}

export async function createProblemSet(data: CreateProblemSetData): Promise<{ id: number }> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      throw new Error('Unauthorized');
    }
    
    const { name, description, problems, topic, difficulty } = data;
    // Extract problem titles for storage
    const problemTitles = problems.map(p => p.title);
    const result = await sql`INSERT INTO all_problem_sets (name, description, problems, topic, difficulty, user_id) VALUES (${name}, ${description}, ${JSON.stringify(problemTitles)}, ${topic}, ${difficulty}, ${user.id}) RETURNING id`;
    return { id: result[0]?.id || 0 };
  } catch (error) {
    console.error('Error creating problem set:', error);
    throw new Error('Failed to create problem set');
  }
}

export async function getProblemSet(id: number): Promise<ProblemSet | null> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      throw new Error('Unauthorized');
    }
    
    const result = await sql`SELECT id, name, description, problems, topic, difficulty, created_at FROM all_problem_sets WHERE id = ${id} AND user_id = ${user.id}`;
    if (result.length === 0) {
      return null;
    }
    
    const row = result[0];
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      problems: row.problems || [],
      topic: row.topic,
      difficulty: row.difficulty,
      created_at: row.created_at
    };
  } catch (error) {
    console.error('Error fetching problem set:', error);
    throw new Error('Failed to fetch problem set');
  }
}

export async function updateProblemSet(id: number, data: Partial<CreateProblemSetData>): Promise<void> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      throw new Error('Unauthorized');
    }
    
    const { name, description, problems, topic, difficulty } = data;
    const updates = [];
    const values = [];
    
    if (name !== undefined) {
      updates.push('name = $' + (values.length + 1));
      values.push(name);
    }
    if (description !== undefined) {
      updates.push('description = $' + (values.length + 1));
      values.push(description);
    }
    if (problems !== undefined) {
      updates.push('problems = $' + (values.length + 1));
      // Extract problem titles for storage
      const problemTitles = problems.map(p => p.title);
      values.push(JSON.stringify(problemTitles));
    }
    if (topic !== undefined) {
      updates.push('topic = $' + (values.length + 1));
      values.push(topic);
    }
    if (difficulty !== undefined) {
      updates.push('difficulty = $' + (values.length + 1));
      values.push(difficulty);
    }
    
    if (updates.length === 0) {
      return;
    }
    
    values.push(id, user.id);
    const query = `UPDATE all_problem_sets SET ${updates.join(', ')} WHERE id = $${values.length - 1} AND user_id = $${values.length}`;
    await sql.unsafe(query, ...values);
  } catch (error) {
    console.error('Error updating problem set:', error);
    throw new Error('Failed to update problem set');
  }
}

export async function deleteProblemSet(id: number): Promise<void> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      throw new Error('Unauthorized');
    }
    
    await sql`DELETE FROM all_problem_sets WHERE id = ${id} AND user_id = ${user.id}`;
  } catch (error) {
    console.error('Error deleting problem set:', error);
    throw new Error('Failed to delete problem set');
  }
} 