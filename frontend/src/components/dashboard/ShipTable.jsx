import { useState, useEffect } from 'react';
import { shipService } from '../../services/api';
import '../../styles/Dashboard.css';

function ShipTable({ searchResults = null }) {
  const [ships, setShips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // If search results are provided, use them
    if (searchResults) {
      setShips(searchResults);
      setIsLoading(false);
      return;
    }
    
    // Otherwise, fetch all ships
    const fetchShips = async () => {
      try {
        const result = await shipService.getAllShips();
        if (result.success) {
          setShips(result.data);
        } else {
          setError('Failed to fetch ship data');
        }
      } catch (err) {
        setError(err.message || 'Error fetching ship data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchShips();
  }, [searchResults]);

  if (isLoading) {
    return <div className="loading-state">Loading ship data...</div>;
  }

  if (error) {
    return <div className="error-state">{error}</div>;
  }

  if (ships.length === 0) {
    return <div className="empty-state">No ships found</div>;
  }

  return (
    <div className="ship-table-container">
      <h3>Ship Information</h3>
      
      <div className="table-responsive">
        <table className="ship-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Year Built</th>
              <th>Status</th>
              <th>Location</th>
              <th>Flag</th>
            </tr>
          </thead>
          <tbody>
            {ships.map((ship) => (
              <tr key={ship.id || ship.name}>
                <td>{ship.name}</td>
                <td>{ship.type}</td>
                <td>{ship.yearBuilt || 'N/A'}</td>
                <td>
                  <span className={`status-badge ${ship.status?.toLowerCase()}`}>
                    {ship.status || 'Unknown'}
                  </span>
                </td>
                <td>{ship.currentLocation || 'Goa'}</td>
                <td>{ship.flag || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShipTable;