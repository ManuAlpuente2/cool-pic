import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../lib/firebase";
import { FilterList } from "../components/filters/FilterList";
import filtersData from "../mocks/filters.js";
import "./index.scss";

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

  const handleUpload = () => {
    // TODO: Implementar lógica de subida
    console.log("Subir foto");
  };

  // Aseguramos que filtersData sea un array
  const filters = Array.isArray(filtersData) ? filtersData : [];

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
      <main className="main-content">
        <h2>Filtros fotográficos</h2>
        <FilterList filters={filters} />
      </main>
      <button
        onClick={handleUpload}
        className="upload-button"
        aria-label="Subir nueva foto"
      >
        <span className="upload-button__icon">✨</span>
        <span className="upload-button__text">Subir foto</span>
      </button>
    </div>
  );
};

export default Home;
