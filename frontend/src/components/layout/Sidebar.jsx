import { Link, useLocation } from 'react-router-dom';
import '../../styles/Layout.css';

function Sidebar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Navigation</h3>
      </div>
      
      <ul className="sidebar-menu">
        <li className={isActive('/dashboard')}>
          <Link to="/dashboard">
            <span className="sidebar-icon">📊</span>
            Dashboard
          </Link>
        </li>
        <li className={isActive('/dashboard/ships')}>
          <Link to="/dashboard/ships">
            <span className="sidebar-icon">🚢</span>
            Ships
          </Link>
        </li>
        <li className={isActive('/dashboard/stats')}>
          <Link to="/dashboard/stats">
            <span className="sidebar-icon">📈</span>
            Statistics
          </Link>
        </li>
      </ul>
      
      <div className="sidebar-footer">
        <p>Maritime Dashboard v1.0</p>
      </div>
    </aside>
  );
}

export default Sidebar;