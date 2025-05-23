import React, { useState } from 'react';
import { Ship } from '../../types';
import { Search, Anchor } from 'lucide-react';
import { shipsAPI } from '../../utils/api';

const ShipSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ship, setShip] = useState<Ship | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await shipsAPI.getShipByName(searchTerm);
      setShip(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to find ship');
      setShip(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'docked':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Find Ship</h2>
      </div>
      
      <div className="p-4">
        <form onSubmit={handleSearch} className="flex">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search by ship name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !searchTerm.trim()}
            className="ml-3 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Anchor className="animate-spin h-5 w-5" /> : 'Search'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {ship && (
          <div className="mt-6">
            <div className={`rounded-lg border p-4 ${getStatusColor(ship.status)}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{ship.name}</h3>
                  <p className="text-sm mt-1">{ship.type}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ship.status)}`}>
                  {ship.status.charAt(0).toUpperCase() + ship.status.slice(1)}
                </span>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Location</h4>
                  <p className="mt-1">
                    {ship.location.port ? (
                      `Port: ${ship.location.port}`
                    ) : (
                      `Coordinates: ${ship.location.latitude.toFixed(4)}, ${ship.location.longitude.toFixed(4)}`
                    )}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Last Updated</h4>
                  <p className="mt-1">{new Date(ship.lastUpdated).toLocaleString()}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Crew</h4>
                  <p className="mt-1">{ship.crew} members</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Capacity</h4>
                  <p className="mt-1">{ship.capacity} tons</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipSearch;