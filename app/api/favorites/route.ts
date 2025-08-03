import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const result = await sql`SELECT problem_title FROM favorites ORDER BY created_at DESC`;
    return NextResponse.json(result.map(row => row.problem_title));
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, topic } = await request.json();
    // For now, using a default user_id. In a real app, this would come from authentication
    const userId = 'default-user';
    await sql`INSERT INTO favorites (problem_title, user_id) VALUES (${title}, ${userId}) ON CONFLICT (problem_title, user_id) DO NOTHING`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return NextResponse.json({ error: 'Failed to add favorite' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { title } = await request.json();
    const userId = 'default-user';
    await sql`DELETE FROM favorites WHERE problem_title = ${title} AND user_id = ${userId}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return NextResponse.json({ error: 'Failed to remove favorite' }, { status: 500 });
  }
} 