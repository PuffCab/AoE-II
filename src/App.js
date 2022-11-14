import { Routes, Route } from "react-router-dom"
import './App.css';
import Home from './views/Home';
import ExCivilizations from './views/Discover/ExCivilizations';
import ExUnits from './views/Discover/ExUnits';
import LogIn from "./views/Login/LogIn";
import DetailedCiv from "./views/DetailedCiv";
import DetailedUnit from "./views/DetailedUnit";
import Register from "./views/Login/Register";
import Favourites from "./views/Favourites";
import ExTechnologies from "./views/Discover/ExTechnologies";
import { AuthContextProvider } from "./context/AuthContext";
import ExStructures from "./views/Discover/ExStructures";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/civilizations" element={<ExCivilizations />} />
        <Route path="/civilizations/:id" element={<DetailedCiv />} />
        <Route path="/units" element={<ExUnits />} />
        <Route path="/units/:id" element={<DetailedUnit />} />
        <Route path="/technologies" element={<ExTechnologies />} />
        <Route path="/structures" element={<ExStructures />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
