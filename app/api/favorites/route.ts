import { stackServerApp } from '@/stack';
import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const result = await sql`SELECT title FROM favorite_problems WHERE user_id = ${user.id} ORDER BY added_at DESC`;
    return NextResponse.json(result.map(row => row.title));
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { title, topic } = await request.json();
    await sql`INSERT INTO favorite_problems (title, topic, user_id) VALUES (${title}, ${topic}, ${user.id}) ON CONFLICT (title, user_id) DO NOTHING`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return NextResponse.json({ error: 'Failed to add favorite' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { title } = await request.json();
    await sql`DELETE FROM favorite_problems WHERE title = ${title} AND user_id = ${user.id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return NextResponse.json({ error: 'Failed to remove favorite' }, { status: 500 });
  }
} 