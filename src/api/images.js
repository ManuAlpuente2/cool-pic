import { BASE_URL } from "../constants";

/**
 * Genera una imagen aplicando un filtro específico
 * @param {number} styleId - ID del filtro a aplicar
 * @param {File} originalImage - Archivo de imagen original
 * @returns {Promise<Object>} Resultado de la generación
 */
export const generateImage = async ({ styleId, originalImage }) => {
  // Validaciones
  if (!styleId) {
    return { error: "ID del filtro es requerido" };
  }

  if (!originalImage || !(originalImage instanceof File)) {
    return { error: "Imagen original es requerida" };
  }

  // Obtener token de autenticación
  const authData = JSON.parse(localStorage.getItem("authData"));
  if (!authData) {
    return { error: "Token de autenticación no encontrado" };
  }

  try {
    // Crear FormData para enviar la imagen
    const formData = new FormData();
    formData.append("styleId", styleId.toString());
    formData.append("originalImage", originalImage);

    const response = await fetch(`${BASE_URL}images/generate-with-image`, {
      method: "POST",
      headers: {
        /* Authorization: `Bearer ${authData.token}`, */
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJkdWNoZTI3QGdtYWlsLmNvbSIsInJvbGUiOiJTVVBFUl9BRE1JTiIsImlhdCI6MTc1MDc4MDY2MiwiZXhwIjoxNzUxNjQ0NjYyfQ.2gKFC_DglgSnbQZnuEzt1enw9kw9x1Uk_K6LHg5C4nvCdz23-h-Or5i0rQsRA_g8zJjdZIPPrFL-BSoyzvh6Jw`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        error:
          errorData.message ||
          `Error ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Error de conexión al generar la imagen" };
  }
};

/**
 * Obtiene todas las imágenes generadas por el usuario logado
 * @returns {Promise<Object>} Lista de imágenes generadas
 */
export const getMyGenerations = async () => {
  // Obtener token de autenticación
  const authData = JSON.parse(localStorage.getItem("authData"));
  if (!authData) {
    return { error: "Token de autenticación no encontrado" };
  }

  try {
    const response = await fetch(`${BASE_URL}images/my-generations?size=5`, {
      method: "GET",
      headers: {
        /* Authorization: `Bearer ${authData.token}`, */
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJkdWNoZTI3QGdtYWlsLmNvbSIsInJvbGUiOiJTVVBFUl9BRE1JTiIsImlhdCI6MTc1MDc4MDY2MiwiZXhwIjoxNzUxNjQ0NjYyfQ.2gKFC_DglgSnbQZnuEzt1enw9kw9x1Uk_K6LHg5C4nvCdz23-h-Or5i0rQsRA_g8zJjdZIPPrFL-BSoyzvh6Jw`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        error:
          errorData.message ||
          `Error ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Error de conexión al obtener las imágenes" };
  }
};
