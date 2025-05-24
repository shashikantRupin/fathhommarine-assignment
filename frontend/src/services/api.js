import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://fathhommarine-assignment.vercel.app";

// Create an axios instance with base URL
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication Services
export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/api/auth/login', credentials);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: "Network error occurred" };
    }
  },
  
  register: async (userData) => {
    try {
      const response = await api.post('/api/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: "Network error occurred" };
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

// Ship Data Services
export const shipService = {
  getAllShips: async () => {
    try {
      const response = await api.get('/api/ships');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: "Network error occurred" };
    }
  },
  
  getShipByName: async (name) => {
    try {
      const response = await api.get(`/api/ships/search?name=${name}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: "Network error occurred" };
    }
  }
};

export default api;