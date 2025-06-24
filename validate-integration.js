#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating Frontend-Backend Integration...\n');

const checks = [];

// Check 1: Environment file exists
const envPath = '.env.local';
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('NEXT_PUBLIC_API_URL=http://localhost:8888/api')) {
    checks.push({ name: 'Frontend environment configuration', status: '✅', details: '.env.local configured correctly' });
  } else {
    checks.push({ name: 'Frontend environment configuration', status: '❌', details: 'API URL not set correctly in .env.local' });
  }
} else {
  checks.push({ name: 'Frontend environment configuration', status: '❌', details: '.env.local file missing' });
}

// Check 2: Backend CORS configuration
const corsPath = 'backend/middleware/cors.go';
if (fs.existsSync(corsPath)) {
  const corsContent = fs.readFileSync(corsPath, 'utf8');
  if (corsContent.includes('Access-Control-Allow-Origin') && corsContent.includes('CORSMiddleware')) {
    checks.push({ name: 'Backend CORS configuration', status: '✅', details: 'CORS middleware properly configured' });
  } else {
    checks.push({ name: 'Backend CORS configuration', status: '❌', details: 'CORS middleware missing or incomplete' });
  }
} else {
  checks.push({ name: 'Backend CORS configuration', status: '❌', details: 'CORS middleware file not found' });
}

// Check 3: Carbon routes have API prefix
const carbonRoutePath = 'backend/routes/carbon_route.go';
if (fs.existsSync(carbonRoutePath)) {
  const carbonContent = fs.readFileSync(carbonRoutePath, 'utf8');
  if (carbonContent.includes('/api/carbon')) {
    checks.push({ name: 'Backend API routes', status: '✅', details: 'Carbon routes have proper /api prefix' });
  } else {
    checks.push({ name: 'Backend API routes', status: '❌', details: 'Carbon routes missing /api prefix' });
  }
} else {
  checks.push({ name: 'Backend API routes', status: '❌', details: 'Carbon route file not found' });
}

// Check 4: Frontend API integration
const apiPath = 'lib/api.ts';
if (fs.existsSync(apiPath)) {
  const apiContent = fs.readFileSync(apiPath, 'utf8');
  const hasAuth = apiContent.includes('loginUser') && apiContent.includes('registerUser');
  const hasCarbon = apiContent.includes('getCarbonDashboard') && apiContent.includes('addActivity');
  const hasChallenges = apiContent.includes('getUserDailyChallenge');
  const hasBadges = apiContent.includes('getUserBadges');
  
  if (hasAuth && hasCarbon && hasChallenges && hasBadges) {
    checks.push({ name: 'Frontend API functions', status: '✅', details: 'All API functions implemented' });
  } else {
    checks.push({ name: 'Frontend API functions', status: '⚠️', details: 'Some API functions may be missing' });
  }
} else {
  checks.push({ name: 'Frontend API functions', status: '❌', details: 'API file not found' });
}

// Check 5: Authentication setup
const authPages = [
  'app/home/page.tsx',
  'app/analytics/page.tsx', 
  'app/add/page.tsx',
  'app/badges/page.tsx',
  'app/profile/page.tsx',
  'app/daily-challenge/page.tsx'
];

let authPagesConfigured = 0;
authPages.forEach(pagePath => {
  if (fs.existsSync(pagePath)) {
    const pageContent = fs.readFileSync(pagePath, 'utf8');
    if (pageContent.includes('withAuth')) {
      authPagesConfigured++;
    }
  }
});

if (authPagesConfigured === authPages.length) {
  checks.push({ name: 'Protected pages authentication', status: '✅', details: 'All protected pages have authentication' });
} else {
  checks.push({ name: 'Protected pages authentication', status: '⚠️', details: `${authPagesConfigured}/${authPages.length} pages have authentication` });
}

// Check 6: Component API integration
const componentChecks = [
  { file: 'components/home-screen.tsx', apis: ['getCarbonDashboard', 'getActivitiesByUser', 'getUserDailyChallenge'] },
  { file: 'components/analytics-screen.tsx', apis: ['getCarbonDashboard'] },
  { file: 'components/add-carbon-screen.tsx', apis: ['addCarbonEntry'] },
  { file: 'components/daily-challenge-screen.tsx', apis: ['getUserDailyChallenge', 'updateUserChallengeProgress'] },
  { file: 'components/badges-screen.tsx', apis: ['getUserBadges', 'getAllBadges'] },
  { file: 'components/profile-screen.tsx', apis: ['getCurrentUserProfile'] }
];

let integratedComponents = 0;
componentChecks.forEach(({ file, apis }) => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const hasAllApis = apis.every(api => content.includes(api));
    if (hasAllApis) {
      integratedComponents++;
    }
  }
});

if (integratedComponents === componentChecks.length) {
  checks.push({ name: 'Component API integration', status: '✅', details: 'All components integrated with APIs' });
} else {
  checks.push({ name: 'Component API integration', status: '⚠️', details: `${integratedComponents}/${componentChecks.length} components fully integrated` });
}

// Display results
console.log('📋 Integration Validation Results:\n');
checks.forEach(check => {
  console.log(`${check.status} ${check.name}`);
  console.log(`   ${check.details}\n`);
});

const passedChecks = checks.filter(c => c.status === '✅').length;
const totalChecks = checks.length;

console.log(`\n📊 Summary: ${passedChecks}/${totalChecks} checks passed\n`);

if (passedChecks === totalChecks) {
  console.log('🎉 Integration validation successful!');
  console.log('✨ Your frontend and backend are properly integrated.');
  console.log('\n🚀 Ready to start:');
  console.log('1. cd backend && go run main.go');
  console.log('2. npm run dev');
} else {
  console.log('⚠️  Some integration issues found.');
  console.log('📖 Check INTEGRATION_SETUP.md for troubleshooting.');
}

console.log('\n🧪 Run integration test: node test-integration.js');
