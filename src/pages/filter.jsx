import { useParams, useNavigate } from "react-router-dom";
import { useFilters } from "../contexts/FiltersContext";
import { Header } from "../components/Header/Header";
import FilterSkeleton from "../components/skeletons/FilterSkeleton";
import "./filter.scss";

const Filter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { filters } = useFilters();

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

  const handleApplyFilter = () => {
    // TODO: Implementar lógica para aplicar el filtro
    console.log("Aplicando filtro:", name);
  };

  return (
    <div className="filter-page">
      <Header />

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
            onClick={handleApplyFilter}
            aria-label={`Aplicar el filtro ${name}`}
          >
            ✨ Aplicar a mi foto
          </button>
        </div>
      </main>
    </div>
  );
};

export default Filter;
