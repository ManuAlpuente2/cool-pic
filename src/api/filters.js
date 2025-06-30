import { BASE_URL } from "../constants";

/**
 * Obtiene los estilos disponibles desde la API
 * @returns {Promise<Array>} Lista de estilos
 */
export const fetchStyles = async () => {
  const response = await fetch(`${BASE_URL}styles`);

  if (!response.ok) {
    return { error: "Error al obtener los estilos" };
  }

  const data = await response.json();
  console.log("data", data?.content);
  return data?.content.map((style) => ({
    id: style.id,
    name: style.name,
    description: style.description,
    thumbnail: style.previewImage,
    isActive: style.isActive,
    sortOrder: style.sortOrder,
    popularity: style.popularity,
    popular: style.popular,
    new: style.new,
  }));
};
