import React, { useState, useEffect } from "react";

const PopupFilter = ({ isOpen, onClose, onApplyFilters }) => {
  const [types, setTypes] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    ability: "",
    minStat: "",
    maxStat: "",
  });

  useEffect(() => {
    const fetchTypesAndAbilities = async () => {
      const [typesRes, abilitiesRes] = await Promise.all([
        fetch("https://pokeapi.co/api/v2/type"),
        fetch("https://pokeapi.co/api/v2/ability?limit=100"),
      ]);

      const typesData = await typesRes.json();
      const abilitiesData = await abilitiesRes.json();

      setTypes(typesData.results);
      setAbilities(abilitiesData.results);
    };

    fetchTypesAndAbilities();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 bg-gray-900 bg-opacity-70 flex items-center justify-center">
      <div className="bg-gray-800 text-gray-100 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Advanced Filters</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-2">Type</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded-lg"
            >
              <option value="">Select Type</option>
              {types.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Ability</label>
            <select
              name="ability"
              value={filters.ability}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded-lg"
            >
              <option value="">Select Ability</option>
              {abilities.map((ability) => (
                <option key={ability.name} value={ability.name}>
                  {ability.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Base Stat Range</label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="minStat"
                placeholder="Min"
                value={filters.minStat}
                onChange={handleChange}
                className="w-1/2 p-2 bg-gray-700 rounded-lg"
              />
              <input
                type="number"
                name="maxStat"
                placeholder="Max"
                value={filters.maxStat}
                onChange={handleChange}
                className="w-1/2 p-2 bg-gray-700 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="bg-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-500"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupFilter;
