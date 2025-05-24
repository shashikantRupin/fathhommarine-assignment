import { useState, useEffect } from 'react';
import '../../styles/Dashboard.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function StatsCards() {
  // Dummy stats data
  const [stats, setStats] = useState({
    activeShips: 178,
    dockingToday: 12,
    seaCondition: 'Moderate',
    fuelConsumption: 3250,
    cargoVolume: 14500,
    maintenance: 8
  });

  // Chart data
  const doughnutData = {
    labels: ['Active', 'Maintenance', 'Docked'],
    datasets: [
      {
        data: [stats.activeShips, stats.maintenance, stats.dockingToday],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 206, 86, 0.8)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Fuel Consumption (gallons)',
        data: [3200, 3150, 3300, 3250, 3400, 3100, 3250],
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="stats-container">
      <div className="stats-row">
        <div className="stats-card">
          <div className="stats-card-header">
            <h3>Fleet Status</h3>
          </div>
          <div className="stats-card-content chart">
            <Doughnut 
              data={doughnutData} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-card-header">
            <h3>Weekly Fuel Consumption</h3>
          </div>
          <div className="stats-card-content chart">
            <Bar 
              data={barData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="stats-row">
        <div className="stats-card small">
          <div className="stats-card-header">
            <h3>Active Ships</h3>
          </div>
          <div className="stats-card-content">
            <div className="stats-value">{stats.activeShips}</div>
            <div className="stats-label">Currently at sea</div>
          </div>
        </div>

        <div className="stats-card small">
          <div className="stats-card-header">
            <h3>Docking Today</h3>
          </div>
          <div className="stats-card-content">
            <div className="stats-value">{stats.dockingToday}</div>
            <div className="stats-label">Vessels arriving</div>
          </div>
        </div>

        <div className="stats-card small">
          <div className="stats-card-header">
            <h3>Sea Conditions</h3>
          </div>
          <div className="stats-card-content">
            <div className="stats-value">{stats.seaCondition}</div>
            <div className="stats-label">Current status</div>
          </div>
        </div>

        <div className="stats-card small">
          <div className="stats-card-header">
            <h3>Cargo Volume</h3>
          </div>
          <div className="stats-card-content">
            <div className="stats-value">{stats.cargoVolume.toLocaleString()}</div>
            <div className="stats-label">Tons (daily)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;