import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import SetCard from "./components/SetCard";
import HowToUse from "./components/HowToUse";

const SPEEDS = {
  Beginner: 2,
  Average: 1,
  Expert: 0.5,
};

function App() {
  const [legoSets, setLegoSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const [manualPieces, setManualPieces] = useState("");
  const [manualResult, setManualResult] = useState(null);
  const [speedManual, setSpeedManual] = useState("Average");
  const [speedApi, setSpeedApi] = useState("Average");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchSet = async (query) => {
    setLoading(true);
    setError(null);
    setSelectedSet(null);
    setManualResult(null);

    try {
      const response = await axios.get(
        "https://rebrickable.com/api/v3/lego/sets/",
        {
          headers: {
            Authorization: `key ${process.env.REACT_APP_REBRICKABLE_API_KEY}`,
          },
          params: { search: query },
        }
      );

      if (response.data.count > 0) {
        setLegoSets(response.data.results.slice(0, 5));
      } else {
        setError("No sets found matching that query.");
        setLegoSets([]);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Error searching for set.");
      setLegoSets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    setSelectedSet(null);
    setError(null);

    const pieces = parseInt(manualPieces);
    if (!pieces || pieces <= 0) {
      setError("Please enter a valid number of pieces.");
      return;
    }

    const totalMinutes = pieces * SPEEDS[speedManual];
    const hours = Math.floor(totalMinutes / 60);
    const remMinutes = Math.round(totalMinutes % 60);

    setManualResult({
      pieces,
      hours,
      minutes: remMinutes,
      speed: speedManual,
    });

    setLegoSets([]);
  };

  return (
    <div
      className="min-h-screen text-white p-6 relative"
      style={{
        backgroundImage: "url('/lego.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        filter: "brightness(0.85)",
      }}
    >
      {/* Transparent Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 0,
        }}
      />

      {/* Main Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 className="text-4xl font-bold text-center text-white-400 mb-4">
          🧱 LEGO Build Time Estimator
        </h1>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Left Side */}
          <div className="flex-1">
            <HowToUse />
            <SearchBar onSearch={searchSet} />

            {loading && <p className="text-center">Loading...</p>}
            {error && (
              <p className="text-center text-red-400 font-semibold">{error}</p>
            )}

            {!selectedSet && legoSets.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {legoSets.map((set) => (
                  <div
                    key={set.set_num}
                    onClick={() => setSelectedSet(set)}
                    className="cursor-pointer border rounded shadow p-4 bg-white text-black hover:shadow-lg transition"
                  >
                    <h3 className="font-bold mb-2">{set.name}</h3>
                    <img
                      src={set.set_img_url}
                      alt={set.name}
                      className="mb-2 w-full rounded"
                    />
                    <p>Parts: {set.num_parts}</p>
                  </div>
                ))}
              </div>
            )}

            {selectedSet && (
              <SetCard
                set={selectedSet}
                speed={speedApi}
                onSpeedChange={setSpeedApi}
              />
            )}
          </div>

          {/* Manual Estimate */}
          <div className="w-full md:w-96 bg-white text-black p-4 rounded shadow max-h-[600px] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Manual Build Time Estimate
            </h2>
            <form onSubmit={handleManualSubmit} className="flex flex-col gap-4">
              <input
                type="number"
                placeholder="Enter number of pieces"
                value={manualPieces}
                onChange={(e) => setManualPieces(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
              />

              <select
                value={speedManual}
                onChange={(e) => setSpeedManual(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              >
                {Object.keys(SPEEDS).map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Estimate Time 🔍
              </button>
            </form>

            {manualResult && (
              <div className="mt-6 border p-4 rounded shadow bg-white text-black">
                <h2 className="text-xl font-semibold mb-2">Manual Estimate</h2>
                <p>
                  <strong>Pieces:</strong> {manualResult.pieces}
                </p>
                <p>
                  <strong>Build Speed:</strong> {manualResult.speed}
                </p>
                <p>
                  <strong>Estimated Build Time:</strong> {manualResult.hours} hr{" "}
                  {manualResult.minutes} min
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-yellow-400">
          Data and images provided by{" "}
          <a
            href="https://rebrickable.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-red-400"
          >
            Rebrickable
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
