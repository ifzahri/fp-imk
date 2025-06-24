import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8888/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const authStorageItem = localStorage.getItem('auth-storage'); // Zustand store name
    if (authStorageItem) {
      try {
        const authState = JSON.parse(authStorageItem);
        const token = authState?.state?.token; // Access token from {state: {token: ...}} structure
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        console.error("Error parsing auth-storage from localStorage:", e);
      }
    }
  }
  return config;
});

// Response Interceptor
api.interceptors.response.use(
  res => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)


export default api
