import "./App.css";
import Dashboard from "./components/Dashboard";
import PokemonDetails from "./components/PokemonDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/pokemon/:id" element={<PokemonDetails />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
