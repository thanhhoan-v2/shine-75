import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const result = await sql`SELECT id, name, description, problems FROM problem_sets ORDER BY created_at DESC`;
    return NextResponse.json(result.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      problems: row.problems || []
    })));
  } catch (error) {
    console.error('Error fetching problem sets:', error);
    return NextResponse.json({ error: 'Failed to fetch problem sets' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, problems } = await request.json();
    const result = await sql`INSERT INTO problem_sets (name, description, problems) VALUES (${name}, ${description}, ${JSON.stringify(problems)}) RETURNING id`;
    return NextResponse.json({ id: result[0]?.id || 0 });
  } catch (error) {
    console.error('Error creating problem set:', error);
    return NextResponse.json({ error: 'Failed to create problem set' }, { status: 500 });
  }
} 