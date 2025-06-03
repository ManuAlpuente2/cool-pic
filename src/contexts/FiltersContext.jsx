import { createContext, useContext } from "react";
import filtersData from "../mocks/filters.js";

const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  // Aquí podríamos añadir lógica para cargar los filtros desde una API
  const filters = filtersData;

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
