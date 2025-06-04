import { useNavigate } from "react-router-dom";
import "./FilterItem.scss";

export const FilterItem = ({ filter }) => {
  const navigate = useNavigate();
  const { id, name, thumbnail, isFeatured, isNew } = filter;

  const handleClick = () => {
    navigate(`/filter/${id}`);
  };

  return (
    <article className="filter-item" onClick={handleClick}>
      <div className="filter-item__image-wrapper">
        <img
          src={thumbnail}
          alt={`Vista previa del filtro ${name}`}
          className="filter-item__image"
        />
        <div className="filter-item__overlay">
          <h3 className="filter-item__title">{name}</h3>
        </div>
      </div>
      <div className="filter-item__badges">
        {isFeatured && (
          <span className="filter-item__badge filter-item__badge--featured">
            Featured
          </span>
        )}
        {isNew && (
          <span className="filter-item__badge filter-item__badge--new">
            New
          </span>
        )}
      </div>
    </article>
  );
};
