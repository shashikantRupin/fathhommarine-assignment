import React, { useEffect, useState } from 'react';
import { Ship, Stats } from '../types';
import { shipsAPI, statsAPI } from '../utils/api';
import StatsCard from '../components/dashboard/StatsCard';
import ShipTable from '../components/dashboard/ShipTable';
import ShipSearch from '../components/dashboard/ShipSearch';
import { Ship as ShipIcon, Anchor, Users, Fuel, Wind, AlertTriangle } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [ships, setShips] = useState<Ship[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoadingShips, setIsLoadingShips] = useState(true);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ships
        setIsLoadingShips(true);
        const shipsData:any = await shipsAPI.getAllShips();
        // Ensure shipsData is an array before setting state
        console.log("shipData",shipsData);
        setShips(Array.isArray(shipsData?.data) ? shipsData?.data : []);
        setIsLoadingShips(false);

        // Fetch stats
        setIsLoadingStats(true);
        const statsData = await statsAPI.getMarineStats();
        setStats(statsData);
        setIsLoadingStats(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
        setIsLoadingShips(false);
        setIsLoadingStats(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Monitor your marine operations and vessel status</p>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoadingStats ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-lg shadow p-5 flex">
              <div className="rounded-full bg-blue-200 h-12 w-12"></div>
              <div className="ml-5 space-y-2 w-full">
                <div className="h-4 bg-blue-200 rounded w-1/2"></div>
                <div className="h-6 bg-blue-300 rounded w-1/4"></div>
              </div>
            </div>
          ))
        ) : stats ? (
          <>
            <StatsCard
              title="Active Ships"
              value={stats.activeShips}
              icon={<ShipIcon size={24} />}
              trend={{ value: 5, isPositive: true }}
              color="blue"
            />
            <StatsCard
              title="Docked Ships"
              value={stats.dockedShips}
              icon={<Anchor size={24} />}
              color="indigo"
            />
            <StatsCard
              title="In Maintenance"
              value={stats.maintenanceShips}
              icon={<AlertTriangle size={24} />}
              trend={{ value: 2, isPositive: false }}
              color="amber"
            />
            <StatsCard
              title="Total Crew"
              value={stats.totalCrew}
              icon={<Users size={24} />}
              color="green"
            />
            <StatsCard
              title="Fuel Consumption"
              value={`${stats.fuelConsumption.toLocaleString()} L`}
              icon={<Fuel size={24} />}
              trend={{ value: 3, isPositive: false }}
              color="red"
            />
            <StatsCard
              title="Average Speed"
              value={`${stats.avgSpeed} knots`}
              icon={<Wind size={24} />}
              color="blue"
            />
          </>
        ) : null}
      </div>

      {/* Ship Search */}
      <div className="mt-8">
        {/* <ShipSearch /> */}
      </div>

      {/* Ships Table */}
      <div className="mt-8">
        <ShipTable ships={ships} isLoading={isLoadingShips} />
      </div>
    </div>
  );
};

export default DashboardPage;