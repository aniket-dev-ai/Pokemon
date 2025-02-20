import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import PokemonDetails from "./pages/PokemonDetails/PokemonDetails";
import MoveDetails from "./pages/PokemonDetails/MoveDetails";
import EvolutionDetails from "./pages/PokemonDetails/EvolutionDetails";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
        <Route path="/move/:moveName" element={<MoveDetails />} />
        <Route path="/pokemon/:id/evolution" element={<EvolutionDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
