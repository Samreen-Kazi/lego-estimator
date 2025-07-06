import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        placeholder="Enter LEGO set number or name"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
      />
      <button type="submit" className="bg-legoRed text-white px-4 rounded-r-md hover:bg-red-700 transition">
        Search
      </button>
    </form>
  );
}