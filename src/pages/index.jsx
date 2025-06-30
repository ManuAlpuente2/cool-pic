import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../lib/firebase";
import { FilterList } from "../components/filters/FilterList";
import { Header } from "../components/Header/Header";
import { fetchStyles } from "../api/filters";
import startImg from "../mocks/img/start.png";
import filterImg from "../mocks/img/filter.png";
import resultImg from "../mocks/img/result.png";
import "./index.scss";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const [filters, setFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFilters = async () => {
      const result = await fetchStyles();
      if (result.error) {
        setError(result.error);
      } else {
        setFilters(result);
      }
      setIsLoading(false);
    };

    loadFilters();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecciona una imagen válida");
      return;
    }

    // Crear URL de la imagen
    const imageUrl = URL.createObjectURL(file);

    // Navegar a la página de preview
    navigate("/preview", {
      state: {
        image: imageUrl,
        fileName: file.name,
        originalFile: file,
      },
    });
  };

  return (
    <div className="page-container home-container">
      <Header />
      {!user && (
        <section className="hero">
          <div className="hero__flow">
            <div className="hero__flow__step">
              <img
                src={startImg}
                alt="Upload your photo"
                className="hero__flow__image"
              />
              <p className="hero__flow__text">Upload your pic</p>
            </div>
            <div className="hero__flow__operator">+</div>
            <div className="hero__flow__step">
              <img
                src={filterImg}
                alt="Select a filter"
                className="hero__flow__image"
              />
              <p className="hero__flow__text">Select your filter</p>
            </div>
            <div className="hero__flow__operator">=</div>
            <div className="hero__flow__step">
              <img
                src={resultImg}
                alt="Get your result"
                className="hero__flow__image"
              />
              <p className="hero__flow__text">Enjoy!</p>
            </div>
          </div>
          <div className="hero__cta">
            <p className="hero__cta__text">
              <strong>Enhance your photos</strong>: Log in now and get 3 free
              tokens!
            </p>
            <button
              onClick={() => navigate("/login")}
              className="hero__cta__button"
            >
              <span className="hero__cta__button__icon">✨</span>
              <span>Log in</span>
            </button>
          </div>
        </section>
      )}
      <main className="main-content">
        {!user ? <h2>Available filters</h2> : <h2>Select your filter</h2>}
        {isLoading ? (
          <div className="filters-loading">Loading filters...</div>
        ) : error ? (
          <div className="filters-error">{error}</div>
        ) : (
          <FilterList filters={filters} />
        )}
      </main>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden-input"
        aria-hidden="true"
      />
      <button
        onClick={handleUpload}
        className="upload-button"
        aria-label="Upload new photo"
      >
        <span className="upload-button__icon">✨</span>
        <span className="upload-button__text">Upload photo</span>
      </button>
    </div>
  );
};

export default Home;
