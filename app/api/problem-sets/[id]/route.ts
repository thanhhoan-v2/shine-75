import { stackServerApp } from '@/stack';
import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = await params;
    const idNum = parseInt(id);
    await sql`DELETE FROM all_problem_sets WHERE id = ${idNum} AND user_id = ${user.id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting problem set:', error);
    return NextResponse.json({ error: 'Failed to delete problem set' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = await params;
    const idNum = parseInt(id);
    const { name, description, problems } = await request.json();
    await sql`UPDATE all_problem_sets SET name = ${name}, description = ${description}, problems = ${JSON.stringify(problems)}, updated_at = NOW() WHERE id = ${idNum} AND user_id = ${user.id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating problem set:', error);
    return NextResponse.json({ error: 'Failed to update problem set' }, { status: 500 });
  }
} 