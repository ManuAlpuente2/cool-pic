import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../lib/firebase';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect to login if not authenticated
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>Cool Pic</h1>
        <div className="user-info">
          <span>Welcome, {user.email}</span>
          <button onClick={handleSignOut} className="sign-out-button">
            Sign Out
          </button>
        </div>
      </header>
      <main>
        <h2>Your Photo Filters</h2>
        {/* Add your photo filters content here */}
      </main>
    </div>
  );
};

export default Home; 