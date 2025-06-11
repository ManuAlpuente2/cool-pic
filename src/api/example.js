/**
 * Obtiene posts de ejemplo de JSONPlaceholder
 * @returns {Promise<Array>} Lista de posts
 */
export const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    return { error: "Error al obtener los posts" };
  }
  return await response.json();
};
