import { memo } from "react";
import "./FilterItem.scss";

const FilterItem = memo(({ filter }) => {
  const { name, thumbnail, isFeatured, isNew } = filter;

  return (
    <article className="filter-item">
      <div className="filter-item__image-wrapper">
        <img
          src={thumbnail}
          alt={`Vista previa del filtro ${name}`}
          className="filter-item__image"
        />
        <div className="filter-item__badges">
          {isFeatured && (
            <span className="filter-item__badge filter-item__badge--featured">
              Destacado
            </span>
          )}
          {isNew && (
            <span className="filter-item__badge filter-item__badge--new">
              Nuevo
            </span>
          )}
        </div>
      </div>
      <h3 className="filter-item__title">{name}</h3>
    </article>
  );
});

FilterItem.displayName = "FilterItem";

export { FilterItem };
