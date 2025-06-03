import { memo } from "react";
import { useNavigate } from "react-router-dom";
import "./FilterItem.scss";

const FilterItem = memo(({ filter }) => {
  const navigate = useNavigate();
  const { id, name, thumbnail, isFeatured, isNew } = filter;

  const handleClick = () => {
    navigate(`/filter/${id}`);
  };

  return (
    <article
      className="filter-item"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
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
