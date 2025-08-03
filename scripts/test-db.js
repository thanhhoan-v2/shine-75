require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

async function testDatabase() {
  const sql = neon(process.env.DATABASE_URL);
  
  try {
    // Check what tables exist
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    
    console.log('Existing tables:', tables.map(t => t.table_name));
    
    // Check favorites table structure
    try {
      const favoritesStructure = await sql`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'favorites'
        ORDER BY ordinal_position
      `;
      console.log('\nFavorites table structure:', favoritesStructure);
    } catch (e) {
      console.log('\nFavorites table does not exist or error:', e.message);
    }
    
    // Check completed_problems table structure
    try {
      const completedStructure = await sql`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'completed_problems'
        ORDER BY ordinal_position
      `;
      console.log('\nCompleted_problems table structure:', completedStructure);
    } catch (e) {
      console.log('\nCompleted_problems table does not exist or error:', e.message);
    }
    
    // Check if there are any records in favorites
    try {
      const favoritesCount = await sql`SELECT COUNT(*) as count FROM favorites`;
      console.log('\nFavorites count:', favoritesCount[0].count);
    } catch (e) {
      console.log('\nError checking favorites count:', e.message);
    }
    
    // Check if there are any records in completed_problems
    try {
      const completedCount = await sql`SELECT COUNT(*) as count FROM completed_problems`;
      console.log('\nCompleted_problems count:', completedCount[0].count);
    } catch (e) {
      console.log('\nError checking completed_problems count:', e.message);
    }
    
  } catch (error) {
    console.error('Error testing database:', error);
  }
}

testDatabase(); 