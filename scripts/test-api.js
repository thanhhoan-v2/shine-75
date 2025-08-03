require('dotenv').config();

async function testAPI() {
  const baseUrl = 'http://localhost:3000';
  
  try {
    console.log('=== Testing API endpoints ===');
    
    // Test GET /api/favorites
    console.log('\n1. Testing GET /api/favorites...');
    try {
      const response = await fetch(`${baseUrl}/api/favorites`);
      const data = await response.json();
      console.log('✅ GET /api/favorites works:', data);
    } catch (error) {
      console.log('❌ GET /api/favorites failed:', error.message);
    }
    
    // Test POST /api/favorites
    console.log('\n2. Testing POST /api/favorites...');
    try {
      const response = await fetch(`${baseUrl}/api/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'test-problem-api',
          topic: 'test-topic'
        })
      });
      const data = await response.json();
      console.log('✅ POST /api/favorites works:', data);
    } catch (error) {
      console.log('❌ POST /api/favorites failed:', error.message);
    }
    
    // Test DELETE /api/favorites
    console.log('\n3. Testing DELETE /api/favorites...');
    try {
      const response = await fetch(`${baseUrl}/api/favorites`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'test-problem-api' })
      });
      const data = await response.json();
      console.log('✅ DELETE /api/favorites works:', data);
    } catch (error) {
      console.log('❌ DELETE /api/favorites failed:', error.message);
    }
    
    // Test GET /api/completed
    console.log('\n4. Testing GET /api/completed...');
    try {
      const response = await fetch(`${baseUrl}/api/completed`);
      const data = await response.json();
      console.log('✅ GET /api/completed works:', data);
    } catch (error) {
      console.log('❌ GET /api/completed failed:', error.message);
    }
    
    // Test POST /api/completed
    console.log('\n5. Testing POST /api/completed...');
    try {
      const response = await fetch(`${baseUrl}/api/completed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'test-problem-api'
        })
      });
      const data = await response.json();
      console.log('✅ POST /api/completed works:', data);
    } catch (error) {
      console.log('❌ POST /api/completed failed:', error.message);
    }
    
    // Test DELETE /api/completed
    console.log('\n6. Testing DELETE /api/completed...');
    try {
      const response = await fetch(`${baseUrl}/api/completed`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'test-problem-api' })
      });
      const data = await response.json();
      console.log('✅ DELETE /api/completed works:', data);
    } catch (error) {
      console.log('❌ DELETE /api/completed failed:', error.message);
    }
    
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testAPI(); 