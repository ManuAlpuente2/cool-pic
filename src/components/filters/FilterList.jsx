import { memo } from "react";
import { FilterItem } from "./FilterItem";
import "./FilterList.scss";

const FilterList = memo(({ filters }) => {
  if (!filters?.length) return null;

  return (
    <section className="filter-list" aria-label="Lista de filtros disponibles">
      {filters.map((filter) => (
        <FilterItem key={filter.id} filter={filter} />
      ))}
    </section>
  );
});

FilterList.displayName = "FilterList";

export { FilterList };
