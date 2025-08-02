require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

async function setupDatabase() {
  const sql = neon(process.env.DATABASE_URL);
  
  try {
    // Create problem_sets table
    await sql`
      CREATE TABLE IF NOT EXISTS problem_sets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        problems JSONB,
        topic VARCHAR(100),
        difficulty VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    // Create favorites table
    await sql`
      CREATE TABLE IF NOT EXISTS favorites (
        id SERIAL PRIMARY KEY,
        problem_title VARCHAR(255) NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(problem_title, user_id)
      )
    `;
    
    // Create completed table
    await sql`
      CREATE TABLE IF NOT EXISTS completed (
        id SERIAL PRIMARY KEY,
        problem_title VARCHAR(255) NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(problem_title, user_id)
      )
    `;
    
    // Create favorite_problem_sets table
    await sql`
      CREATE TABLE IF NOT EXISTS favorite_problem_sets (
        id SERIAL PRIMARY KEY,
        problem_set_id INTEGER NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        problems JSONB,
        user_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(problem_set_id, user_id)
      )
    `;
    
    // Create completed_problem_sets table
    await sql`
      CREATE TABLE IF NOT EXISTS completed_problem_sets (
        id SERIAL PRIMARY KEY,
        problem_set_id INTEGER NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        problems JSONB,
        user_id VARCHAR(255) NOT NULL,
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(problem_set_id, user_id)
      )
    `;
    
    console.log('Database tables created successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setupDatabase(); 