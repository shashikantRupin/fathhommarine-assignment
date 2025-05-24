import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from '../components/auth/Login';
import { useAuth } from '../utils/AuthContext';

function LoginPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Redirect if already logged in
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    
    // Set page title
    document.title = 'Login | Maritime Dashboard';
  }, [isAuthenticated, navigate]);

  return (
    <div className="page-container">
      {location.state?.message && (
        <div className="notification-message success">
          {location.state.message}
        </div>
      )}
      <Login />
    </div>
  );
}

export default LoginPage;