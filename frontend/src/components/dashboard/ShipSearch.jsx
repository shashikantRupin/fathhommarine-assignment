import { useState } from 'react';
import { shipService } from '../../services/api';
import '../../styles/Dashboard.css';

function ShipSearch({ onShipFound }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setError('Please enter a ship name');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await shipService.getShipByName(searchTerm);
      if (result.success && result.data.length > 0) {
        onShipFound(result.data);
      } else {
        setError('No ships found with that name');
        onShipFound([]);
      }
    } catch (err) {
      setError(err.message || 'Error searching for ship');
      onShipFound([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ship-search-container">
      <h3>Search Ship by Name</h3>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Enter ship name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      {error && <div className="search-error">{error}</div>}
    </div>
  );
}

export default ShipSearch;