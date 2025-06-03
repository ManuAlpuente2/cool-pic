import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../lib/firebase";
import "./Header.scss";

const Header = ({ title = "Cool Pic" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isFilterPage = location.pathname.startsWith("/filter/");

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <header className="header">
      {isFilterPage ? (
        <button onClick={handleBack} className="header__back-button">
          <span className="header__back-icon">←</span>
          <span>Volver</span>
        </button>
      ) : (
        <h1 onClick={() => navigate("/")}>{title}</h1>
      )}
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
