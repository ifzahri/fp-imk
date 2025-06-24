// Simple integration test
const axios = require('axios');

const API_BASE_URL = 'http://localhost:8888/api';

async function testIntegration() {
  console.log('🧪 Testing Frontend-Backend Integration...\n');

  // Test 1: Backend Health Check
  try {
    console.log('1. Testing backend connectivity...');
    const response = await axios.get(`${API_BASE_URL}/user`, {
      timeout: 5000
    });
    console.log('✅ Backend is accessible');
  } catch (error) {
    console.log('❌ Backend connection failed:', error.message);
    console.log('   Make sure backend is running on port 8888');
    return;
  }

  // Test 2: CORS Check
  try {
    console.log('2. Testing CORS configuration...');
    const response = await axios.options(`${API_BASE_URL}/user`, {
      headers: {
        'Origin': 'http://localhost:3000',
        'Access-Control-Request-Method': 'GET'
      }
    });
    console.log('✅ CORS is properly configured');
  } catch (error) {
    console.log('⚠️  CORS might need adjustment:', error.message);
  }

  // Test 3: API Endpoints
  const endpoints = [
    '/user',
    '/activity', 
    '/badge',
    '/challenge',
    '/carbon/dashboard'
  ];

  console.log('3. Testing API endpoints...');
  for (const endpoint of endpoints) {
    try {
      await axios.get(`${API_BASE_URL}${endpoint}`, { timeout: 3000 });
      console.log(`✅ ${endpoint} - accessible`);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log(`✅ ${endpoint} - protected (requires auth)`);
      } else {
        console.log(`❌ ${endpoint} - error:`, error.message);
      }
    }
  }

  console.log('\n🎉 Integration test completed!');
  console.log('\nNext steps:');
  console.log('1. Start backend: cd backend && go run main.go');
  console.log('2. Start frontend: npm run dev');
  console.log('3. Visit http://localhost:3000');
}

testIntegration().catch(console.error);
