import React, { useEffect, useState } from 'react';
import { Ship } from '../types';
import { shipsAPI } from '../utils/api';
import ShipTable from '../components/dashboard/ShipTable';
import { AlertTriangle } from 'lucide-react';

const ShipsPage: React.FC = () => {
  const [ships, setShips] = useState<Ship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShips = async () => {
      try {
        setIsLoading(true);
        const data = await shipsAPI.getAllShips();
        setShips(data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load ships');
        setIsLoading(false);
      }
    };

    fetchShips();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ships Management</h1>
        <p className="text-gray-600">View and manage all vessels in your fleet</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div>
        <ShipTable ships={ships} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ShipsPage;