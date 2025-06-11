import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, appleProvider } from "../lib/firebase";
import { useAuth } from "../contexts/AuthContext";
import { BASE_URL } from "../constants";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in
  if (user) {
    console.log({ user });
    navigate("/");
    return null;
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Llamada al endpoint de autenticación
      const response = await fetch(`${BASE_URL}auth/oauth2/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName,
          provider: "GOOGLE",
          providerId: user.uid,
        }),
      });

      const data = await response.json();
      console.log("Auth response:", data);

      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      await signInWithPopup(auth, appleProvider);
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Apple:", error);
    }
  };

  return (
    <div className="login-container">
      <h1>Welcome to Cool Pic</h1>
      <div className="login-buttons">
        <button onClick={handleGoogleSignIn} className="login-button google">
          Continue with Google
        </button>
        <button onClick={handleAppleSignIn} className="login-button apple">
          Continue with Apple
        </button>
      </div>
    </div>
  );
};

export default Login;
