import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFilters } from "../contexts/FiltersContext";
import { Header } from "../components/Header/Header";
import FilterSkeleton from "../components/skeletons/FilterSkeleton";
import "./filter.scss";

const Filter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { filters } = useFilters();
  const fileInputRef = useRef(null);

  console.log("Filter page - ID:", id);
  console.log("Filter page - Filters:", filters);

  // Si no hay filtros aún, mostramos el skeleton
  if (!filters) {
    console.log("Filter page - No filters available yet");
    return <FilterSkeleton />;
  }

  // Encontrar el filtro por ID
  const filter = filters.find((f) => f.id === parseInt(id));

  console.log("Filter page - Found filter:", filter);

  // Si no hay filtro, mostramos el skeleton
  if (!filter) {
    console.log("Filter page - No filter found with ID:", id);
    return <FilterSkeleton />;
  }

  const { name, thumbnail, description } = filter;

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
            src={thumbnail}
            alt={`Vista previa del filtro ${name}`}
            className="filter-page__image"
          />
        </div>

        <div className="filter-page__info">
          <p className="filter-page__description">{description}</p>
          <div className="filter-page__placeholder">
            <p className="filter-page__placeholder-text">
              Sube una foto para aplicar este filtro
            </p>
          </div>

          <button
            className="apply-button"
            onClick={handleUpload}
            aria-label={`Subir foto para aplicar el filtro ${name}`}
          >
            ✨ Subir foto
          </button>
        </div>
      </main>
    </div>
  );
};

export default Filter;
