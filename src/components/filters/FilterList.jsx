import { memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FilterItem } from "./FilterItem";
import "./FilterList.scss";

const FilterList = memo(({ filters, originalFile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { image } = state || {};

  if (!filters?.length) return null;

  // Si tenemos archivo original, navegar directamente a preview
  const handleFilterSelect = (filterId) => {
    if (originalFile && image) {
      navigate("/preview", {
        state: {
          image,
          fileName: originalFile.name,
          originalFile,
          filterId: filterId.toString(),
        },
      });
    } else {
      // Navegación normal a la página de filtro
      navigate(`/filter/${filterId}`);
    }
  };

  return (
    <section className="filter-list" aria-label="Lista de filtros disponibles">
      {filters.map((filter) => (
        <FilterItem
          key={filter.id}
          filter={filter}
          onSelect={handleFilterSelect}
        />
      ))}
    </section>
  );
});

FilterList.displayName = "FilterList";

export { FilterList };
