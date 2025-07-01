import { useRef, useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../lib/firebase";
import { FilterList } from "../components/filters/FilterList";
import { FilterSlider } from "../components/filters/FilterSlider";
import { Header } from "../components/Header/Header";
import UploadModal from "../components/UploadModal/UploadModal";
import { fetchStyles } from "../api/filters";
import startImg from "../mocks/img/start.png";
import filterImg from "../mocks/img/filter.png";
import resultImg from "../mocks/img/result.png";
import "./index.scss";
import FilterSkeleton from "../components/skeletons/FilterSkeleton";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const [filters, setFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectGallery = () => {
    setIsModalOpen(false);
    // Configurar input para galería
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute("capture");
      fileInputRef.current.click();
    }
  };

  const handleSelectCamera = () => {
    setIsModalOpen(false);
    // Configurar input para cámara
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute("capture", "environment");
      fileInputRef.current.click();
    }
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
    <div
      className={`page-container ${
        user ? "home-container" : "welcome-container"
      }`}
    >
      <Header loading={isLoading && !user} />
      {/* {!user && (
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
      )} */}
      <main className="main-content">
        {!user && (
          <div className="tutorial">
            <h2>Turn your selfie into a WOW! image</h2>
            <p>Try now free and get 3 tokens</p>
            <button
              onClick={() => navigate("/login")}
              className="button liquid-button"
            >
              <i className="icon icon-sign-in"></i>
              <span>LOG IN</span>
            </button>
          </div>
        )}
        {!user && !isLoading ? (
          <>
            <h2>Choose from over {filters.length} styles</h2>
            <FilterSlider filters={filters} />
          </>
        ) : (
          <>
            {user ? (
              <h2>
                <a onClick={handleUpload}>Upload your photo</a> and choose the
                filter that will <span>make it cool</span>
              </h2>
            ) : null}
            {!isLoading && user ? (
              <FilterList filters={filters} />
            ) : user ? (
              <FilterSkeleton />
            ) : null}
          </>
        )}
        {error ? <div className="filters-error">{error}</div> : null}
      </main>
      {user && (
        <>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden-input"
            aria-hidden="true"
          />
          <button
            onClick={isMobile ? handleUpload : handleSelectGallery}
            className="liquid-button upload-button"
            aria-label="Upload new photo"
          >
            <i className="icon icon-camera"></i>
            <span className="upload-button__text">UPLOAD PHOTO</span>
          </button>

          <UploadModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSelectGallery={handleSelectGallery}
            onSelectCamera={handleSelectCamera}
          />
        </>
      )}
    </div>
  );
};

export default Home;
