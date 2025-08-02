import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const result = await sql`
      SELECT 
        id,
        problem_set_id,
        name,
        description,
        problems,
        added_at,
        created_at,
        updated_at,
        user_id
      FROM favorite_problem_sets 
      ORDER BY added_at DESC
    `;
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching favorite problem sets:', error);
    return NextResponse.json({ error: 'Failed to fetch favorite problem sets' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { problem_set_id, name, description, problems, user_id } = await request.json();
    await sql`
      INSERT INTO favorite_problem_sets (problem_set_id, name, description, problems, user_id) 
      VALUES (${problem_set_id}, ${name}, ${description}, ${problems}, ${user_id}) 
      ON CONFLICT (problem_set_id, user_id) DO NOTHING
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding favorite problem set:', error);
    return NextResponse.json({ error: 'Failed to add favorite problem set' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { problem_set_id, user_id } = await request.json();
    await sql`DELETE FROM favorite_problem_sets WHERE problem_set_id = ${problem_set_id} AND user_id = ${user_id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing favorite problem set:', error);
    return NextResponse.json({ error: 'Failed to remove favorite problem set' }, { status: 500 });
  }
} 