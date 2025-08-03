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

    const result = await sql`
      SELECT 
        id,
        problem_set_id,
        name,
        description,
        problems,
        completed_at,
        created_at,
        user_id
      FROM completed_problem_sets 
      WHERE user_id = ${user.id}
      ORDER BY completed_at DESC
    `;
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching completed problem sets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch completed problem sets' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { problem_set_id, name, description, problems } =
      await request.json();

    await sql`
      INSERT INTO completed_problem_sets (problem_set_id, name, description, problems, user_id) 
      VALUES (${problem_set_id}, ${name}, ${description}, ${JSON.stringify(
      problems
    )}, ${user.id}) 
      ON CONFLICT (problem_set_id, user_id) DO NOTHING
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding completed problem set:', error);
    return NextResponse.json(
      { error: 'Failed to add completed problem set' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { problem_set_id } = await request.json();
    await sql`DELETE FROM completed_problem_sets WHERE problem_set_id = ${problem_set_id} AND user_id = ${user.id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing completed problem set:', error);
    return NextResponse.json(
      { error: 'Failed to remove completed problem set' },
      { status: 500 }
    );
  }
}
