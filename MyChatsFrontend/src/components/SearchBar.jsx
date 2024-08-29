import React from 'react';

const SearchBar = () => {
  return (
    <>
      <input
        type="search"
        placeholder="Search"
        //onChange={handleChange}
        className="px-4 py-2 rounded-l-md border shadow border-gray-300 focus:outline-none focus:border-indigo-500"
      />
      <button
        //onClick={handleClick}
        className="px-4 py-2 bg-indigo-500 shadow text-white rounded-r-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
      >
        Search
      </button>
    </>
  );
};

export default SearchBar;