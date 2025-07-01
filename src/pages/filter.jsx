import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header/Header";
import FilterSkeleton from "../components/skeletons/FilterSkeleton";
import { fetchStyles } from "../api/filters";
import { useAuth } from "../contexts/AuthContext";
import "./filter.scss";

const Filter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [filter, setFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadFilter = async () => {
      const result = await fetchStyles();
      if (result.error) {
        setError(result.error);
      } else {
        const foundFilter = result.find((f) => f.id === parseInt(id));
        setFilter(foundFilter);
      }
      setIsLoading(false);
    };

    loadFilter();
  }, [id]);

  console.log(filter);

  if (!filter) {
    return (
      <>
        <div className="page-container filter-page">
          <Header />
          <main className="filter-page__content">
            <h1 class="filter-page__title skeleton"></h1>
            <div class="filter-page__preview">
              <div class="filter-page__preview-image skeleton"></div>
            </div>
          </main>
        </div>
      </>
    );
  }

  const { name, thumbnail, description, popularity, sortOrder } = filter;

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

    // Navegar a la página de preview con el ID del filtro
    navigate("/preview", {
      state: {
        image: imageUrl,
        fileName: file.name,
        originalFile: file,
        filterId: id,
      },
    });
  };

  return (
    <div className="page-container filter-page">
      <Header loading={!filter} />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden-input"
        aria-hidden="true"
      />

      <main className="filter-page__content">
        {filter ? (
          <>
            <h1 className="filter-page__title">{name}</h1>
            <div className="filter-page__preview">
              <img
                src={`data:image/jpeg;base64,${thumbnail}`}
                alt={`Preview of filter ${name}`}
                className="filter-page__image"
              />
            </div>
            <div className="filter-page__info">
              <p className="filter-page__description">{description}</p>
              {user ? (
                <>
                  <div className="filter-page__placeholder">
                    <p className="filter-page__placeholder-text">
                      Upload a photo to apply this filter
                    </p>
                  </div>

                  <button
                    className="button liquid-button"
                    onClick={handleUpload}
                    aria-label={`Upload photo to apply filter ${name}`}
                  >
                    <i className="icon icon-camera"></i>
                    UPLOAD PHOTO
                  </button>
                </>
              ) : (
                <>
                  <div className="filter-page__placeholder">
                    <p className="filter-page__placeholder-text">
                      Log in to apply this filter to your pic
                    </p>
                  </div>

                  <button
                    className="button liquid-button"
                    onClick={() => navigate("/login")}
                    aria-label={`Upload photo to apply filter ${name}`}
                  >
                    <i className="icon icon-sign-in"></i>
                    LOG IN
                  </button>
                </>
              )}
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
};

export default Filter;
