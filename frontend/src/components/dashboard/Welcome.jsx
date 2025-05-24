import { useAuth } from '../../utils/AuthContext';
import '../../styles/Dashboard.css';

function Welcome() {
  const { user } = useAuth();
  
  const getCurrentTime = () => {
    const hours = new Date().getHours();
    
    if (hours < 12) return 'morning';
    if (hours < 18) return 'afternoon';
    return 'evening';
  };

  return (
    <div className="welcome-container">
      <h2 className="welcome-title">
        Good {getCurrentTime()}, {user?.name || 'Captain'}
      </h2>
      <p className="welcome-subtitle">
        Welcome to your Maritime Operations Dashboard
      </p>
      <div className="welcome-date">
        {new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </div>
    </div>
  );
}

export default Welcome;