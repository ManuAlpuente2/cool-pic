import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { FiltersProvider } from "./contexts/FiltersContext";
import Home from "./pages/index";
import Login from "./pages/login";
import Filter from "./pages/filter";
import Preview from "./pages/preview";
import Gallery from "./pages/gallery";
import "./styles/vars.scss";
import "./App.scss";
import "./assets/icons/style.css";

const App = () => {
  return (
    <HashRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AuthProvider>
        <FiltersProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/filter/:id" element={<Filter />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </FiltersProvider>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
