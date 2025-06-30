import "./FilterSkeleton.scss";

const FilterSkeleton = () => {
  return (
    <div className="filter-page">
      <header className="filter-page__header">
        <div className="back-button skeleton" />
        <div className="filter-page__title skeleton" />
      </header>

      <main className="filter-page__content">
        <div className="filter-page__preview skeleton" />
        <div className="filter-page__info">
          <div className="filter-page__description skeleton" />
          <div className="button liquid-button skeleton" />
        </div>
      </main>
    </div>
  );
};

export default FilterSkeleton;
