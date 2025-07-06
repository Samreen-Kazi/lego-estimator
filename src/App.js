import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import SetCard from './components/SetCard';

function App() {
  const [legoSet, setLegoSet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const searchSet = async (query) => {
  setLoading(true);
  setError(null);
  setLegoSet(null);
 console.log("API Key:", process.env.REACT_APP_REBRICKABLE_API_KEY);

  try {
    const response = await axios.get(
      "https://rebrickable.com/api/v3/lego/sets/",
      {
        headers: {
          Authorization: `key ${process.env.REACT_APP_REBRICKABLE_API_KEY}`,
        },
        params: {
          search: query,    // passes the full query with hyphens or partial names
        },
      }
    );

    if (response.data.count > 0) {
      // Take the first matched set
      setLegoSet(response.data.results[0]);
    } else {
      setError("No sets found matching that query.");
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
    setError("Error searching for set.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-legoBlue text-white p-6">
      <h1 className="text-4xl font-lego text-legoYellow mb-6 text-center">
        LEGO Build Time Estimator
      </h1>

      <SearchBar onSearch={searchSet} />

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      {legoSet && <SetCard set={legoSet} />}
    </div>
  );
}

export default App;
