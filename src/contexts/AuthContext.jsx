import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar datos del localStorage al iniciar
    const storedAuthData = localStorage.getItem("authData");
    if (storedAuthData) {
      try {
        const parsedData = JSON.parse(storedAuthData);
        setUser(parsedData);
      } catch (error) {
        console.error("Error parsing stored auth data:", error);
        localStorage.removeItem("authData");
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Si hay datos en localStorage, mantenerlos
        const storedData = localStorage.getItem("authData");
        if (storedData) {
          setUser(JSON.parse(storedData));
        } else {
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          });
        }
      } else {
        setUser(null);
        localStorage.removeItem("authData");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
