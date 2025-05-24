import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Signup from '../components/auth/Signup';
import { useAuth } from '../utils/AuthContext';

function SignupPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if already logged in
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    
    // Set page title
    document.title = 'Sign Up | Maritime Dashboard';
  }, [isAuthenticated, navigate]);

  return (
    <div className="page-container">
      <Signup />
    </div>
  );
}

export default SignupPage;