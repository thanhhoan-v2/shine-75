const fetch = require('node-fetch');

async function testFrontendAPI() {
  const baseUrl = 'http://localhost:3000'; // Assuming the dev server is running
  
  try {
    console.log('Testing frontend API endpoints...');
    
    // Test favorites API
    console.log('\n1. Testing favorites POST...');
    const favoritesResponse = await fetch(`${baseUrl}/api/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Two Sum', topic: 'Two Pointers' })
    });
    
    if (favoritesResponse.ok) {
      console.log('✅ Favorites POST successful');
    } else {
      const error = await favoritesResponse.text();
      console.log('❌ Favorites POST failed:', error);
    }
    
    // Test completed problems API
    console.log('\n2. Testing completed problems POST...');
    const completedResponse = await fetch(`${baseUrl}/api/completed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Two Sum' })
    });
    
    if (completedResponse.ok) {
      console.log('✅ Completed problems POST successful');
    } else {
      const error = await completedResponse.text();
      console.log('❌ Completed problems POST failed:', error);
    }
    
    // Test GET endpoints
    console.log('\n3. Testing favorites GET...');
    const favoritesGetResponse = await fetch(`${baseUrl}/api/favorites`);
    if (favoritesGetResponse.ok) {
      const favorites = await favoritesGetResponse.json();
      console.log('✅ Favorites GET successful:', favorites);
    } else {
      console.log('❌ Favorites GET failed');
    }
    
    console.log('\n4. Testing completed problems GET...');
    const completedGetResponse = await fetch(`${baseUrl}/api/completed`);
    if (completedGetResponse.ok) {
      const completed = await completedGetResponse.json();
      console.log('✅ Completed problems GET successful:', completed);
    } else {
      console.log('❌ Completed problems GET failed');
    }
    
  } catch (error) {
    console.error('Error testing frontend API:', error);
  }
}

testFrontendAPI(); 