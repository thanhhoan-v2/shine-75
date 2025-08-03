import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const result = await sql`SELECT title FROM completed_problems ORDER BY completed_at DESC`;
    return NextResponse.json(result.map(row => row.title));
  } catch (error) {
    console.error('Error fetching completed problems:', error);
    return NextResponse.json({ error: 'Failed to fetch completed problems' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();
    // Since user_id is nullable and there's a unique constraint on (title, user_id),
    // we need to handle the case where user_id is NULL
    await sql`INSERT INTO completed_problems (title, user_id) VALUES (${title}, NULL) ON CONFLICT (title, user_id) DO NOTHING`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding completed problem:', error);
    return NextResponse.json({ error: 'Failed to add completed problem' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { title } = await request.json();
    await sql`DELETE FROM completed_problems WHERE title = ${title} AND user_id IS NULL`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing completed problem:', error);
    return NextResponse.json({ error: 'Failed to remove completed problem' }, { status: 500 });
  }
} 