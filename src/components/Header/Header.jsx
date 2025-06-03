import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../lib/firebase";
import "./Header.scss";

const Header = ({ title = "Cool Pic" }) => {
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
    <header className="header">
      <h1>{title}</h1>
      <div className="user-info">
        {user ? (
          <>
            <span>Welcome, {user.email}</span>
            <button onClick={handleSignOut} className="button button-sign-out">
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
  );
};

export { Header };
