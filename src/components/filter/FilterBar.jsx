import React, { useState, useEffect } from "react";

const FilterBar = ({ onFilterClick }) => {
  return (
    <div className="flex z-20 justify-between items-center mb-6">
      {/* Filter Button */}
      <button
        onClick={onFilterClick}
        className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg shadow-md hover:bg-yellow-500 transition-all"
      >
        Open Filters ⚙️
      </button>
    </div>
  );
};

export default FilterBar;
