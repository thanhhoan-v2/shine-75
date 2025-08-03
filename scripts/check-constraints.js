require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

async function checkConstraints() {
  const sql = neon(process.env.DATABASE_URL);
  
  try {
    // Check constraints on completed_problems table
    const constraints = await sql`
      SELECT 
        tc.constraint_name,
        tc.constraint_type,
        kcu.column_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu 
        ON tc.constraint_name = kcu.constraint_name
      WHERE tc.table_name = 'completed_problems'
      ORDER BY tc.constraint_name
    `;
    
    console.log('Completed_problems constraints:', constraints);
    
    // Check if there's a unique constraint on title
    const titleConstraints = constraints.filter(c => c.column_name === 'title');
    console.log('\nTitle column constraints:', titleConstraints);
    
  } catch (error) {
    console.error('Error checking constraints:', error);
  }
}

checkConstraints(); 