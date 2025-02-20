import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const PokemonDetails = () => {
  const { id } = useParams(); // Get the Pokemon ID from the URL params
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      try {
        // Fetch Pokémon data
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error("Failed to fetch Pokémon data.");
        const data = await response.json();
        setPokemon(data);

        // Fetch evolution chain data
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();
        setEvolutionChain(evolutionData.chain);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchPokemonDetails();
  }, [id]);

  if (loading) return <p className="text-center text-xl text-gray-300 animate-pulse">Loading Pokémon Details...</p>;
  if (error) return <p className="text-center text-red-500 text-xl font-semibold">{error}</p>;

  // Helper function to render the evolution chain
  const renderEvolutionChain = (evolution) => {
    if (!evolution) return null; // Handle cases where there's no evolution

    return (
      <div className="flex items-center gap-4">
        <div className="text-gray-100">{evolution.species.name}</div>
        {evolution.evolves_to && evolution.evolves_to.length > 0 && (
          <div className="text-gray-100">→</div>
        )}
        {evolution.evolves_to && evolution.evolves_to.length > 0 && renderEvolutionChain(evolution.evolves_to[0])}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Pokémon Image and Basic Info */}
      <div className="flex justify-center">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="w-48 h-48 object-contain"
        />
      </div>

      <h1 className="text-4xl font-bold text-center text-yellow-400 mt-8 drop-shadow-lg">
        {pokemon.name.toUpperCase()}
      </h1>

      {/* Stats Section */}
      <div className="mt-8 text-gray-100">
        <h2 className="text-2xl font-semibold">Stats:</h2>
        <ul className="mt-4">
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name} className="text-lg">
              <strong>{stat.stat.name}:</strong> {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>

      {/* Abilities Section */}
      <div className="mt-8 text-gray-100">
        <h2 className="text-2xl font-semibold">Abilities:</h2>
        <ul className="mt-4">
          {pokemon.abilities.map((ability) => (
            <li key={ability.ability.name} className="text-lg">
              <strong>{ability.ability.name}</strong>
            </li>
          ))}
        </ul>
      </div>

      {/* Evolution Chain Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-100">Evolution Chain:</h2>
        {evolutionChain ? (
          <>
            {renderEvolutionChain(evolutionChain)}
            <div className="mt-4 text-center">
              <Link
                to={`/pokemon/${id}/evolution`}
                className="text-yellow-400 hover:text-yellow-500"
              >
                View Evolution Chain Details
              </Link>
            </div>
          </>
        ) : (
          <p className="text-gray-300">No evolution chain available.</p>
        )}
      </div>

      {/* Moves Section */}
      <div className="mt-8 text-gray-100">
        <h2 className="text-2xl font-semibold">Moves:</h2>
        <ul className="mt-4">
          {pokemon.moves.slice(0, 10).map((move) => ( // Show the first 10 moves for simplicity
            <li key={move.move.name} className="text-lg">
              <Link
                to={`/move/${move.move.name}`}
                className="text-yellow-400 hover:underline"
              >
                {move.move.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Back Button */}
      <div className="mt-8 text-center">
        <Link
          to="/"
          className="bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors"
        >
          Back to Pokémon List
        </Link>
      </div>
    </div>
  );
};

export default PokemonDetails;
