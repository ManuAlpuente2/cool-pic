import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../lib/firebase";
import { Avatar } from "./Avatar";
import "./Header.scss";

const Header = ({ title = "CoolPic" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isFilterPage = location.pathname.startsWith("/filter/");

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("authData");
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
          <span>BACK</span>
        </button>
      ) : (
        <h1 onClick={() => navigate("/")}>{title}</h1>
      )}
      <div className="user-info">
        {user ? (
          <Avatar user={user} onSignOut={handleSignOut} />
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="button button-outline"
          >
            <i className="icon icon-sign-in"></i>
            LOG IN
          </button>
        )}
      </div>
    </header>
  );
};

export { Header };
