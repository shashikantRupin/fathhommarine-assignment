export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Ship {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'maintenance' | 'docked';
  location: {
    latitude: number;
    longitude: number;
    port?: string;
  };
  lastUpdated: string;
  capacity: number;
  crew: number;
}

export interface Stats {
  activeShips: number;
  dockedShips: number;
  maintenanceShips: number;
  totalCrew: number;
  fuelConsumption: number;
  avgSpeed: number;
}