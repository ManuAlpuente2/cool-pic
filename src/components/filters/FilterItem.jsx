import { useNavigate } from "react-router-dom";
import "./FilterItem.scss";

export const FilterItem = ({ filter, onSelect }) => {
  const navigate = useNavigate();
  const { id, name, thumbnail, isNew, popular } = filter;

  console.log({ filter });

  const handleClick = () => {
    if (onSelect) {
      onSelect(id);
    } else {
      navigate(`/filter/${id}`);
    }
  };

  return (
    <article className="filter-item" onClick={handleClick}>
      <div className="filter-item__image-wrapper">
        <img
          src={`data:image/png;base64,${thumbnail}`}
          alt={`Vista previa del filtro ${name}`}
          className="filter-item__image"
        />
        <div className="filter-item__overlay">
          <h3 className="filter-item__title">{name}</h3>
        </div>
      </div>
      <div className="filter-item__badges">
        {popular && (
          <span className="filter-item__badge filter-item__badge--featured">
            Popular
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
