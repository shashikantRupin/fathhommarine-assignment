import { User, Ship } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper to get the token from storage
export const getToken = (): string | null => {
  return localStorage.getItem('maritoken');
};

// Helper for fetch requests with auth
export const fetchWithAuth = async (
  endpoint: string, 
  options: RequestInit = {}
): Promise<any> => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }

  return data;
};

// Auth API calls
export const authAPI = {
  login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
    return fetchWithAuth('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (name: string, email: string, password: string): Promise<{ token: string; user: User }> => {
    return fetchWithAuth('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  getUserProfile: async (): Promise<User> => {
    return fetchWithAuth('/api/auth/profile');
  }
};

// Ships API calls
export const shipsAPI = {
  getAllShips: async (): Promise<Ship[]> => {
    return fetchWithAuth('/api/ships');
  },

  getShipByName: async (name: string): Promise<Ship> => {
    return fetchWithAuth(`/api/ships/search?name=${encodeURIComponent(name)}`);
  }
};

// Stats API calls (using dummy data for now)
export const statsAPI = {
  getMarineStats: async (): Promise<any> => {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          activeShips: 42,
          dockedShips: 18,
          maintenanceShips: 7,
          totalCrew: 1243,
          fuelConsumption: 287500,
          avgSpeed: 16.8
        });
      }, 500);
    });
  }
};