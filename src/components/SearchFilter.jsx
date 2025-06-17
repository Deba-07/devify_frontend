import React, { useState } from 'react';

const SearchFilter = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="my-4 text-blue-700">
      <input
        type="text"
        placeholder="Search dependency..."
        value={query}
        onChange={handleChange}
        className="border px-2 py-1 rounded w-full"
      />
    </div>
  );
};

export default SearchFilter;
