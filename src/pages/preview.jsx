import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "../components/Header/Header";
import { FilterList } from "../components/filters/FilterList";
import { fetchStyles } from "../api/filters";
import { generateImage } from "../api/images";
import "./preview.scss";

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { image, filterId, originalFile } = state || {};
  const [filters, setFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

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

  const handleApplyFilter = async () => {
    if (!selectedFilter || !originalFile) {
      console.error("Filtro o archivo no disponible");
      return;
    }

    setIsGenerating(true);

    const result = await generateImage({
      styleId: selectedFilter.id,
      originalImage: originalFile,
    });

    setIsGenerating(false);

    if (result.error) {
      console.log(result);
      alert(`Error al aplicar el filtro: ${result.error}`);
      return;
    }

    console.log("Imagen generada:", result.generation.generatedImage);
    setGeneratedImage(
      `data:image/png;base64,${result.generation.generatedImage}`
    );
  };

  return (
    <div className="page-container preview-page">
      <Header />
      <main className="preview-page__content">
        <div className="preview-page__image-container">
          <img
            src={generatedImage || image}
            alt="Vista previa de la foto"
            className="preview-page__image"
          />
        </div>

        {selectedFilter ? (
          <div className="preview-page__filter-info">
            {generatedImage ? (
              <h2>¡WOW! Ha quedado genial</h2>
            ) : (
              <>
                <h2>
                  Vamos a aplicar el filtro {selectedFilter.name} a tu foto
                </h2>
                <p className="preview-page__tokens">
                  Esto consumirá 1 token de tu saldo (tienes 3 tokens)
                </p>
                <button
                  className="preview-page__apply-button"
                  onClick={handleApplyFilter}
                  disabled={isGenerating}
                >
                  {isGenerating ? "🔄 Aplicando..." : "✨ Aplicar filtro"}
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="preview-page__filter-selection">
            <h2>Selecciona el filtro que quieres aplicar a tu foto</h2>
            {isLoading ? (
              <div className="filters-loading">Loading filters...</div>
            ) : error ? (
              <div className="filters-error">{error}</div>
            ) : (
              <FilterList filters={filters} originalFile={originalFile} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Preview;
