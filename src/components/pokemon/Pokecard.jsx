import React from "react";
import { Link } from "react-router-dom";

const Pokecard = ({ name, url }) => {
  const id = url.split("/").filter(Boolean).pop();
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link
      to={`/pokemon/${id}`}
      className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl shadow-md p-4 hover:scale-105 transition-transform duration-300"
    >
      <div className="flex justify-center">
        <img
          src={image}
          alt={name}
          className="w-32 h-32 object-contain"
        />
      </div>
      <h2 className="text-center text-lg font-semibold capitalize mt-4 text-gray-100 hover:text-yellow-400">
        {name}
      </h2>
    </Link>
  );
};

export default Pokecard;
