import axios from 'axios'

const api = axios.create({
  baseURL: 'http://43.156.7.3/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Added to potentially help with CORS
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
