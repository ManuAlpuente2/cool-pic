import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "../components/Header/Header";
import { FilterList } from "../components/filters/FilterList";
import { fetchStyles } from "../api/filters";
import "./preview.scss";

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { image, filterId } = state || {};
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

  // Si no hay imagen, redirigir a home
  if (!image) {
    navigate("/");
    return null;
  }

  const selectedFilter = filterId
    ? filters.find((f) => f.id === parseInt(filterId))
    : null;

  return (
    <div className="preview-page">
      <Header />
      <main className="preview-page__content">
        <div className="preview-page__image-container">
          <img
            src={image}
            alt="Vista previa de la foto"
            className="preview-page__image"
          />
        </div>

        {selectedFilter ? (
          <div className="preview-page__filter-info">
            <h2>Vamos a aplicar el filtro {selectedFilter.name} a tu foto</h2>
            <p className="preview-page__tokens">
              Esto consumirá 1 token de tu saldo (tienes 3 tokens)
            </p>
            <button
              className="preview-page__apply-button"
              onClick={() => console.log("Aplicar filtro")}
            >
              ✨ Aplicar filtro
            </button>
          </div>
        ) : (
          <div className="preview-page__filter-selection">
            <h2>Selecciona el filtro que quieres aplicar a tu foto</h2>
            {isLoading ? (
              <div className="filters-loading">Loading filters...</div>
            ) : error ? (
              <div className="filters-error">{error}</div>
            ) : (
              <FilterList filters={filters} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Preview;
