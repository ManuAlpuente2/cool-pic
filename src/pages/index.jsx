import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../lib/firebase";
import { FilterList } from "../components/filters/FilterList";
import { Header } from "../components/Header/Header";
import filtersData from "../mocks/filters.js";
import "./index.scss";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecciona una imagen válida");
      return;
    }

    // Crear URL de la imagen
    const imageUrl = URL.createObjectURL(file);

    // Navegar a la página de preview
    navigate("/preview", {
      state: {
        image: imageUrl,
        fileName: file.name,
      },
    });
  };

  // Aseguramos que filtersData sea un array
  const filters = Array.isArray(filtersData) ? filtersData : [];

  return (
    <div className="home-container">
      <Header />
      <main className="main-content">
        <h2>Filtros fotográficos</h2>
        <FilterList filters={filters} />
      </main>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden-input"
        aria-hidden="true"
      />
      <button
        onClick={handleUpload}
        className="upload-button"
        aria-label="Subir nueva foto"
      >
        <span className="upload-button__icon">✨</span>
        <span className="upload-button__text">Subir foto</span>
      </button>
    </div>
  );
};

export default Home;
