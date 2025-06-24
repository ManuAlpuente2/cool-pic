import { BASE_URL } from "../constants";

/**
 * Convierte un archivo a base64
 * @param {File} file - Archivo a convertir
 * @returns {Promise<string>} Archivo en formato base64
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Extraer solo la parte base64 (sin el prefijo data:image/...;base64,)
      const base64 = reader.result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

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
    // Convertir imagen a base64
    const base64Image = await fileToBase64(originalImage);

    const response = await fetch(`${BASE_URL}images/generate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        styleId: styleId.toString(),
        originalImage: base64Image,
      }),
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
