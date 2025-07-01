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

  const handleShare = (platform) => {
    if (!generatedImage) return;

    const shareText = "Check out my amazing photo created with CoolPic! 🎨✨";
    const shareUrl = window.location.href;

    let shareLink = "";

    switch (platform) {
      case "whatsapp":
        shareLink = `https://wa.me/?text=${encodeURIComponent(
          shareText + " " + shareUrl
        )}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "instagram":
        // Instagram no permite compartir directamente desde web
        // Copiamos el enlace al portapapeles
        navigator.clipboard.writeText(shareUrl).then(() => {
          alert("Link copied to clipboard! You can now paste it in Instagram.");
        });
        return;
      default:
        return;
    }

    window.open(shareLink, "_blank", "width=600,height=400");
  };

  return (
    <div className="page-container preview-page">
      <Header loading={isGenerating} />
      <div className="main-content">
        <main className="preview-page__content">
          <div className="preview-page__image-container">
            <img
              src={generatedImage || image}
              alt="Vista previa de la foto"
              className="preview-page__image"
            />
            {/* Mostrar una imagen en miniatura del filtro que se va a aplicar */}
            {selectedFilter?.thumbnail && !generatedImage ? (
              <img
                src={`data:image/jpeg;base64,${selectedFilter.thumbnail}`}
                alt={selectedFilter.name}
                className="preview-page__filter-thumbnail"
              />
            ) : null}
          </div>

          {selectedFilter ? (
            <div className="preview-page__filter-info">
              {generatedImage ? (
                <>
                  <h2>WOW! It turned out great!</h2>
                  {/* <div className="preview-page__share-buttons">
                  <h3>Share your amazing photo!</h3>
                  <div className="preview-page__share-grid">
                    <button
                      className="preview-page__share-button preview-page__share-button--whatsapp"
                      onClick={() => handleShare("whatsapp")}
                    >
                      <i className="icon icon-whatsapp"></i>
                      WhatsApp
                    </button>
                    <button
                      className="preview-page__share-button preview-page__share-button--twitter"
                      onClick={() => handleShare("twitter")}
                    >
                      <i className="icon icon-twitter"></i>X (Twitter)
                    </button>
                    <button
                      className="preview-page__share-button preview-page__share-button--facebook"
                      onClick={() => handleShare("facebook")}
                    >
                      <i className="icon icon-facebook"></i>
                      Facebook
                    </button>
                    <button
                      className="preview-page__share-button preview-page__share-button--instagram"
                      onClick={() => handleShare("instagram")}
                    >
                      <i className="icon icon-instagram"></i>
                      Instagram
                    </button>
                  </div>
                </div> */}
                </>
              ) : (
                <>
                  <h2>
                    Let's apply the {selectedFilter.name} filter to your photo
                  </h2>
                  <p className="preview-page__tokens">
                    This will consume 1 credit from your balance (you have 3
                    credits left)
                  </p>
                  <button
                    className="button liquid-button"
                    onClick={handleApplyFilter}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>LOADING</>
                    ) : (
                      <>
                        <i className="icon icon-magic"></i> APPLY FILTER
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="preview-page__filter-selection">
              <h2>Select the filter you want to apply to your photo</h2>
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
    </div>
  );
};

export default Preview;
