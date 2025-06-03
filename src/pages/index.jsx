import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../lib/firebase";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>Cool Pic</h1>
        <div className="user-info">
          {user ? (
            <>
              <span>Welcome, {user.email}</span>
              <button
                onClick={handleSignOut}
                className="button button-sign-out"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="button button-sign-in"
            >
              Sign in
            </button>
          )}
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
