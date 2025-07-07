/**
 * Detecta si una imagen es una URL o un string base64 y retorna el src apropiado
 * @param {string} imageData - URL o string base64 de la imagen
 * @param {string} defaultMimeType - Tipo MIME por defecto (default: 'image/png')
 * @returns {string} - src listo para usar en un elemento img
 */
export const getImageSrc = (imageData, defaultMimeType = "image/png") => {
  if (!imageData) return "";

  // Si ya es una URL completa (http/https) o data URL, la retornamos tal como está
  if (
    imageData.startsWith("http://") ||
    imageData.startsWith("https://") ||
    imageData.startsWith("data:")
  ) {
    return imageData;
  }

  // Si es base64, construimos el data URL
  return `data:${defaultMimeType};base64,${imageData}`;
};

/**
 * Verifica si una imagen es una URL válida
 * @param {string} imageData - String a verificar
 * @returns {boolean} - true si es una URL válida
 */
export const isImageUrl = (imageData) => {
  if (!imageData) return false;

  return (
    imageData.startsWith("http://") ||
    imageData.startsWith("https://") ||
    imageData.startsWith("data:")
  );
};

/**
 * Verifica si una imagen es base64
 * @param {string} imageData - String a verificar
 * @returns {boolean} - true si parece ser base64
 */
export const isBase64 = (imageData) => {
  if (!imageData) return false;

  // Verificamos que no sea una URL y que tenga caracteres típicos de base64
  return !isImageUrl(imageData) && /^[A-Za-z0-9+/]*={0,2}$/.test(imageData);
};
