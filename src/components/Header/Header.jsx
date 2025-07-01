import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../lib/firebase";
import { Avatar } from "./Avatar";
import { ReactComponent as Logo } from "./../../assets/logo.svg";
import "./Header.scss";

const Header = ({ title = "CoolPic", loading = false }) => {
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
    <>
      {loading ? (
        <span className="loading">
          <div class="circles">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
          </div>
        </span>
      ) : null}
      <header className="header">
        <div className="header-slot header-slot--start">
          {/* isFilterPage ? (
            <button onClick={handleBack} className="header__back-button">
              <span>BACK</span>
            </button>
          ) : null */}
        </div>
        <div className="logo-container" onClick={() => navigate("/")}>
          <Logo className="logo " />
        </div>
        <div className="header-slot header-slot--end">
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
        </div>
      </header>
    </>
  );
};

export { Header };
