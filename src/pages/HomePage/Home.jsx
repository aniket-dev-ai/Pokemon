import React, { useState, useEffect } from "react";
import Pokecard from "../../components/pokemon/Pokecard";

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
      }
      setLoading(false);
    };
    fetchPokemons();
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400 drop-shadow-lg">
        Pokémon World 🌌
      </h1>
      {loading ? (
        <p className="text-center text-xl">Loading Pokémon...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {pokemonList.map((pokemon, index) => (
            <Pokecard key={index} name={pokemon.name} url={pokemon.url} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
