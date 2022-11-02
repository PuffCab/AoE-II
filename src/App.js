import { Routes, Route } from "react-router-dom"
import './App.css';
import Home from './views/Home';
import ExCivilizations from './views/ExCivilizations';
import ExUnits from './views/ExUnits';
import LogIn from "./views/LogIn";
import DetailedCiv from "./views/DetailedCiv";
import DetailedUnit from "./views/DetailedUnit";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/civilizations" element={<ExCivilizations />} />
          <Route path="/civilizations/:id" element={<DetailedCiv />} />
          <Route path="/units" element={<ExUnits />} />
          <Route path="/units/:id" element={<DetailedUnit />} />
          <Route path="/login" element={<LogIn />} />
      </Routes>
    </div>
  );
}

export default App;
