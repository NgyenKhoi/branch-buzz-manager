import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from '@/hooks/use-toast';

// Mock API base URL
const API_BASE_URL = 'https://api.mockrestaurant.com';

// Create Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add JWT token to requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors and token refresh
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Handle 401 Unauthorized - Token expired or invalid
      if (status === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('mock_auth_user');
        toast({
          variant: 'destructive',
          title: 'Session expired',
          description: 'Please login again.',
        });
        window.location.href = '/login';
      }

      // Handle 403 Forbidden - Insufficient permissions
      if (status === 403) {
        toast({
          variant: 'destructive',
          title: 'Access denied',
          description: 'You do not have permission to access this resource.',
        });
      }

      // Handle 500 Internal Server Error
      if (status >= 500) {
        toast({
          variant: 'destructive',
          title: 'Server error',
          description: 'Something went wrong. Please try again later.',
        });
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
