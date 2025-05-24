import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import '../../styles/Layout.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Maritime Ops</h1>
      </div>
      
      {user && (
        <div className="navbar-user">
          <span className="user-greeting">Welcome, {user.name}</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;