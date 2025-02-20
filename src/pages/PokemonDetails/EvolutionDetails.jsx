import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EvolutionDetails = () => {
  const { pokemonId } = useParams(); // Get the Pokémon ID from the URL params
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvolutionData = async () => {
      setLoading(true);
      try {
        // Fetch Pokémon species to get the evolution chain URL
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
        if (!speciesResponse.ok) throw new Error("Failed to fetch species data.");
        const speciesData = await speciesResponse.json();

        // Fetch the evolution chain using the URL from the species data
        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        if (!evolutionResponse.ok) throw new Error("Failed to fetch evolution chain.");
        const evolutionData = await evolutionResponse.json();
        setEvolutionChain(evolutionData.chain);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchEvolutionData();
  }, [pokemonId]);

  const renderEvolutionChain = (chain) => {
    if (!chain) return null;

    const renderPokemon = (speciesUrl) => {
      const pokemonId = speciesUrl.split("/")[6]; // Extract Pokémon ID from URL
      return (
        <div className="text-center">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
            alt={speciesUrl.split("/")[6]} // Use species name for alt text
            className="w-32 h-32 object-contain"
          />
          <h3 className="text-lg font-semibold capitalize text-gray-100">{speciesUrl.split("/")[6]}</h3>
        </div>
      );
    };

    return (
      <div className="flex justify-center items-center space-x-4">
        {renderPokemon(chain.species.url)}

        {chain.evolves_to && chain.evolves_to.length > 0 && (
          <>
            <span className="text-2xl text-yellow-400">➡️</span>
            <div className="flex flex-col items-center space-y-4">
              {chain.evolves_to.map((evolution, index) => (
                <div key={index} className="text-center">
                  {renderPokemon(evolution.species.url)}
                  {evolution.evolves_to && evolution.evolves_to.length > 0 && <span className="text-2xl text-yellow-400">➡️</span>}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  if (loading) return <p className="text-center text-xl text-gray-300 animate-pulse">Loading Evolution Chain...</p>;
  if (error) return <p className="text-center text-red-500 text-xl font-semibold">{error}</p>;

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-center text-yellow-400 mt-8 drop-shadow-lg">
        Evolution Chain
      </h1>

      <div className="mt-8">
        {renderEvolutionChain(evolutionChain)}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => window.history.back()}
          className="bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors"
        >
          Back to Pokémon Details
        </button>
      </div>
    </div>
  );
};

export default EvolutionDetails;
