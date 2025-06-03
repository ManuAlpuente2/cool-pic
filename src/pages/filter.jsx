import { useParams, useNavigate } from "react-router-dom";
import { useFilters } from "../contexts/FiltersContext";
import { Header } from "../components/Header/Header";
import FilterSkeleton from "../components/skeletons/FilterSkeleton";
import "./filter.scss";

const Filter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { filters } = useFilters();

  // Encontrar el filtro por ID
  const filter = filters.find((f) => f.id === id);

  // Si no hay filtro, mostramos el skeleton
  if (!filter) {
    return <FilterSkeleton />;
  }

  const { name, thumbnail, description } = filter;

  return (
    <div className="filter-page">
      <Header title={name} />
      <main className="filter-page__content">
        <div className="filter-page__preview">
          <img
            src={thumbnail}
            alt={`Vista previa del filtro ${name}`}
            className="filter-page__image"
          />
        </div>

        <div className="filter-page__info">
          <p className="filter-page__description">{description}</p>

          <button
            className="apply-button"
            aria-label={`Aplicar el filtro ${name}`}
          >
            Aplicar este filtro
          </button>
        </div>
      </main>
    </div>
  );
};

export default Filter;
