require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

async function testAPI() {
    const sql = neon(process.env.DATABASE_URL);

    try {
        // Test adding a favorite
        console.log('Testing favorites API...');

        // Add a favorite
        await sql`INSERT INTO favorites (problem_title, user_id) VALUES ('Two Sum', 'default-user') ON CONFLICT (problem_title, user_id) DO NOTHING`;
        console.log('Added favorite: Two Sum');

        // Check if it was added
        const favorites = await sql`SELECT problem_title FROM favorites WHERE user_id = 'default-user'`;
        console.log('Current favorites:', favorites.map(f => f.problem_title));

        // Test adding a completed problem
        console.log('\nTesting completed problems API...');

        // Add a completed problem (with NULL user_id)
        await sql`INSERT INTO completed_problems (title, user_id) VALUES ('Two Sum', NULL) ON CONFLICT (title, user_id) DO NOTHING`;
        console.log('Added completed problem: Two Sum');

        // Check if it was added
        const completed = await sql`SELECT title FROM completed_problems WHERE title = 'Two Sum' AND user_id IS NULL`;
        console.log('Current completed problems:', completed.map(c => c.title));

        // Clean up test data
        await sql`DELETE FROM favorites WHERE problem_title = 'Two Sum' AND user_id = 'default-user'`;
        await sql`DELETE FROM completed_problems WHERE title = 'Two Sum' AND user_id IS NULL`;
        console.log('\nCleaned up test data');

    } catch (error) {
        console.error('Error testing API:', error);
    }
}

testAPI(); 