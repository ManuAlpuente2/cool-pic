import { createContext, useContext, useState, useEffect } from "react";
import filtersData from "../mocks/filters.js";

const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    // Simulamos una carga asíncrona de los filtros
    const loadFilters = async () => {
      try {
        // Aquí podríamos cargar los filtros desde una API
        setFilters(filtersData);
      } catch (error) {
        console.error("Error loading filters:", error);
        setFilters([]);
      }
    };

    loadFilters();
  }, []);

  return (
    <FiltersContext.Provider value={{ filters }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
};
