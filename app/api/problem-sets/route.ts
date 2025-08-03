import { stackServerApp } from '@/stack';
import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json([]);
    }
    
    const result = await sql`SELECT id, name, description, problems, topic, difficulty, created_at FROM all_problem_sets WHERE user_id = ${user.id} ORDER BY created_at DESC`;
    return NextResponse.json(result.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      problems: row.problems || [],
      topic: row.topic,
      difficulty: row.difficulty,
      created_at: row.created_at
    })));
  } catch (error) {
    console.error('Error fetching problem sets:', error);
    return NextResponse.json({ error: 'Failed to fetch problem sets' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { name, description, problems, topic, difficulty } = await request.json();
    const result = await sql`INSERT INTO all_problem_sets (name, description, problems, topic, difficulty, user_id) VALUES (${name}, ${description}, ${JSON.stringify(problems)}, ${topic}, ${difficulty}, ${user.id}) RETURNING id`;
    return NextResponse.json({ id: result[0]?.id || 0 });
  } catch (error) {
    console.error('Error creating problem set:', error);
    return NextResponse.json({ error: 'Failed to create problem set' }, { status: 500 });
  }
} 