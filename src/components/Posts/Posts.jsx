import { useState, useEffect } from "react";
import { fetchPosts } from "../../api/example";
import "./Posts.scss";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      const result = await fetchPosts();
      if (result.error) {
        setError(result.error);
      } else {
        setPosts(result);
      }
      setIsLoading(false);
    };

    getPosts();
  }, []);

  if (isLoading) return <div className="posts__loading">Cargando...</div>;
  if (error) return <div className="posts__error">{error}</div>;

  return (
    <div className="posts">
      {posts.map((post) => (
        <article key={post.id} className="posts__item">
          <h2 className="posts__title">{post.title}</h2>
          <p className="posts__body">{post.body}</p>
        </article>
      ))}
    </div>
  );
};
