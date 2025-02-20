import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MoveDetails = () => {
  const { moveName } = useParams(); // Get the move name from the URL params
  const [move, setMove] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoveDetails = async () => {
      setLoading(true);
      try {
        // Fetch move details
        const response = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);
        if (!response.ok) throw new Error("Failed to fetch move data.");
        const data = await response.json();
        setMove(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchMoveDetails();
  }, [moveName]);

  if (loading) return <p className="text-center text-xl text-gray-300 animate-pulse">Loading Move Details...</p>;
  if (error) return <p className="text-center text-red-500 text-xl font-semibold">{error}</p>;

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Move Name and Type */}
      <h1 className="text-4xl font-bold text-center text-yellow-400 mt-8 drop-shadow-lg">
        {move.name.toUpperCase()} Move Details
      </h1>

      <div className="mt-6 text-gray-100">
        <h2 className="text-2xl font-semibold">Move Type:</h2>
        <p>{move.type.name}</p>
      </div>

      {/* Move Power and Accuracy */}
      <div className="mt-6 text-gray-100">
        <h2 className="text-2xl font-semibold">Power:</h2>
        <p>{move.power || "N/A"}</p>
      </div>
      <div className="mt-6 text-gray-100">
        <h2 className="text-2xl font-semibold">Accuracy:</h2>
        <p>{move.accuracy || "N/A"}</p>
      </div>

      {/* Move PP (Power Points) */}
      <div className="mt-6 text-gray-100">
        <h2 className="text-2xl font-semibold">PP (Power Points):</h2>
        <p>{move.pp}</p>
      </div>

      {/* Effect and Description */}
      <div className="mt-6 text-gray-100">
        <h2 className="text-2xl font-semibold">Effect:</h2>
        <p>{move.effect_entries?.[0]?.effect || "No description available."}</p>
      </div>

      {/* Back Button */}
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

export default MoveDetails;
