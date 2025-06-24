# Frontend-Backend Integration Setup

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd backend
# Copy environment file
cp .env.example .env
# Edit .env with your database credentials
# Start the backend
go run main.go
```

The backend will run on `http://localhost:8888`

### 2. Frontend Setup
```bash
# Install dependencies
npm install
# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🔧 Configuration

### Environment Variables
- **Frontend**: `.env.local` (already created)
  ```
  NEXT_PUBLIC_API_URL=http://localhost:8888/api
  ```

- **Backend**: `.env` (configure your database)
  ```
  PORT=8888
  JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
  DB_HOST=localhost
  DB_USER=your_db_user
  DB_PASS=your_db_password
  DB_NAME=your_db_name
  DB_PORT=5432
  ```

## 🧪 Testing Integration

Run the integration test:
```bash
node test-integration.js
```

## ✅ Features Integrated

### Authentication
- ✅ User registration and login
- ✅ JWT token management
- ✅ Protected routes
- ✅ Auto-redirect for authenticated/unauthenticated users

### Core Features
- ✅ **Home Screen**: Real carbon footprint data from API
- ✅ **Analytics Screen**: Dashboard data with trends
- ✅ **Add Carbon Screen**: Save carbon entries to backend
- ✅ **Daily Challenge Screen**: Load and update challenge progress
- ✅ **Badges Screen**: Display user badges and achievements
- ✅ **Profile Screen**: User profile management

### API Integration
- ✅ All API endpoints properly connected
- ✅ Error handling and loading states
- ✅ CORS configuration
- ✅ Authentication headers

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS middleware allows `http://localhost:3000`
   - Check browser console for specific CORS errors

2. **API Connection Failed**
   - Verify backend is running on port 8888
   - Check `.env.local` has correct API URL
   - Test with: `curl http://localhost:8888/api/user`

3. **Authentication Issues**
   - Clear browser localStorage
   - Check JWT token in browser dev tools
   - Verify JWT_SECRET in backend .env

4. **Database Errors**
   - Ensure database is running
   - Run migrations: `cd backend && go run main.go --migrate`
   - Check database connection in backend .env

### Debug Steps

1. **Check Backend Logs**
   ```bash
   cd backend
   go run main.go
   # Look for startup messages and errors
   ```

2. **Check Frontend Console**
   - Open browser dev tools
   - Look for API errors in Console tab
   - Check Network tab for failed requests

3. **Test API Directly**
   ```bash
   # Test user endpoint
   curl http://localhost:8888/api/user
   
   # Test with authentication
   curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8888/api/carbon/dashboard
   ```

## 📱 Usage Flow

1. **Register/Login**: Create account or sign in
2. **Home**: View carbon footprint summary
3. **Add Carbon**: Log vehicle, electronics, or food usage
4. **Analytics**: View detailed carbon trends
5. **Daily Challenge**: Complete eco-friendly challenges
6. **Badges**: Earn achievements for eco-actions
7. **Profile**: Manage account settings

## 🎯 Success Criteria

All these should work without errors:

- [ ] User can register and login
- [ ] Home screen shows real carbon data
- [ ] Adding carbon entries saves to backend
- [ ] Analytics displays dashboard data
- [ ] Daily challenges load and update
- [ ] Badges screen shows user achievements
- [ ] Profile displays user information
- [ ] Navigation between all screens works
- [ ] Logout clears session and redirects

## 🔄 Development Workflow

1. **Backend Changes**: Restart `go run main.go`
2. **Frontend Changes**: Hot reload automatically updates
3. **Database Changes**: Run migrations
4. **API Changes**: Update frontend API calls in `lib/api.ts`

## 📚 Key Files

### Frontend
- `lib/api.ts` - API functions
- `lib/axios.ts` - HTTP client configuration
- `stores/auth.tsx` - Authentication state
- `hooks/with-auth.tsx` - Authentication HOC
- `components/*-screen.tsx` - Screen components

### Backend
- `routes/*.go` - API routes
- `controller/*.go` - Request handlers
- `middleware/cors.go` - CORS configuration
- `main.go` - Application entry point

## 🎉 You're All Set!

The frontend and backend are now fully integrated. Users can register, login, track carbon usage, complete challenges, earn badges, and view analytics - all with real data from your Go backend!
