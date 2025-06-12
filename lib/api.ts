import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../stores/auth';

const BASE_URL = 'http://43.156.7.3/api';

// Create axios instance
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
        headers: config.headers,
      });
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Response:', {
        status: response.status,
        data: response.data,
      });
    }
    
    return response;
  },
  (error: AxiosError) => {
    console.error('❌ Response Error:', error);
    
    // Handle 401 Unauthorized - clear auth state
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      // Redirect to login page
      window.location.href = '/login';
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network Error: Please check your connection');
    }
    
    return Promise.reject(error);
  }
);
