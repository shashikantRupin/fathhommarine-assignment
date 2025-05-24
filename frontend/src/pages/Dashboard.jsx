import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Welcome from '../components/dashboard/Welcome';
import StatsCards from '../components/dashboard/StatsCards';
import ShipSearch from '../components/dashboard/ShipSearch';
import ShipTable from '../components/dashboard/ShipTable';
import '../styles/Dashboard.css';

function Dashboard() {
  const [searchResults, setSearchResults] = useState(null);
  
  useEffect(() => {
    // Set page title
    document.title = 'Dashboard | Maritime Operations';
  }, []);

  const handleShipFound = (ships) => {
    setSearchResults(ships);
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      
      <div className="dashboard-content">
        <Sidebar />
        
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <Welcome />
                  <StatsCards />
                </>
              } 
            />
            <Route 
              path="/ships" 
              element={
                <>
                  <ShipSearch onShipFound={handleShipFound} />
                  <ShipTable searchResults={searchResults} />
                </>
              } 
            />
            <Route 
              path="/stats" 
              element={<StatsCards />} 
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;