import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header/Header";
import FilterSkeleton from "../components/skeletons/FilterSkeleton";
import { fetchStyles } from "../api/filters";
import "./filter.scss";

const Filter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [filter, setFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Si está cargando o hay error, mostramos el skeleton
  if (isLoading || error) {
    return <FilterSkeleton />;
  }

  // Si no hay filtro, mostramos el skeleton
  if (!filter) {
    return <FilterSkeleton />;
  }

  console.log(filter);

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
    <div className="filter-page">
      <Header />
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

          <div className="filter-page__stats">
            <span className="filter-page__stat">
              Popularidad: {popularity || 0}
            </span>
            <span className="filter-page__stat">Orden: {sortOrder || 0}</span>
          </div>

          <div className="filter-page__placeholder">
            <p className="filter-page__placeholder-text">
              Upload a photo to apply this filter
            </p>
          </div>

          <button
            className="apply-button"
            onClick={handleUpload}
            aria-label={`Upload photo to apply filter ${name}`}
          >
            ✨ Upload photo
          </button>
        </div>
      </main>
    </div>
  );
};

export default Filter;
