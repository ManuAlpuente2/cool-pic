import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Header } from "../components/Header/Header";
import { getMyGenerations } from "../api/images";
import "./gallery.scss";

const Gallery = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      const result = await getMyGenerations();

      if (result.error) {
        setError(result.error);
      } else {
        setImages(result.content || []);
        console.log(result);
      }

      setIsLoading(false);
    };

    fetchImages();
  }, [user, navigate]);

  const handleImageClick = (image) => {
    // Aquí podrías abrir la imagen en un modal o navegar a una página de detalle
    console.log("Imagen clickeada:", image);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="gallery-page page-container">
      <Header />

      <main className="gallery-content">
        <div className="gallery-header">
          <h2>Gallery</h2>
        </div>

        {error && (
          <div className="gallery-error">
            <p>Error al cargar las imágenes: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="button button-primary"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && images.length === 0 && (
          <div className="gallery-empty">
            <div className="empty-icon">🎨</div>
            <h3>You don't have any images yet</h3>
            <p>Start creating amazing images with our filters</p>
            <button
              onClick={() => navigate("/")}
              className="button button-primary"
            >
              CREATE
            </button>
          </div>
        )}

        {!isLoading && !error && images.length > 0 ? (
          <div className="gallery-grid">
            {images.map((image) => (
              <div
                key={image.id}
                className="gallery-item"
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={`data:image/jpeg;base64,${image.generatedImage}`}
                  alt={image.prompt || "Imagen generada"}
                  className="gallery-item__image"
                  loading="lazy"
                />
                <div className="gallery-item__overlay">
                  <div className="gallery-item__info">
                    {image.prompt && (
                      <p className="gallery-item__prompt">{image.prompt}</p>
                    )}
                    <span className="gallery-item__date">
                      {new Date(image.createdAt).toLocaleDateString("es-ES")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : isLoading ? (
          <div className="gallery-grid">
            <div className="gallery-item">
              <div className="gallery-item__image skeleton"></div>
            </div>
            <div className="gallery-item">
              <div className="gallery-item__image skeleton"></div>
            </div>
            <div className="gallery-item">
              <div className="gallery-item__image skeleton"></div>
            </div>
            <div className="gallery-item">
              <div className="gallery-item__image skeleton"></div>
            </div>
            <div className="gallery-item">
              <div className="gallery-item__image skeleton"></div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default Gallery;
