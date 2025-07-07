import React from "react";

const SPEEDS = {
  Beginner: 2,
  Average: 1,
  Expert: 0.5,
};

export default function SetCard({ set, speed, onSpeedChange }) {
  if (!set) return null;

  const estimatedMinutes = set.num_parts * SPEEDS[speed];
  const hours = Math.floor(estimatedMinutes / 60);
  const minutes = Math.round(estimatedMinutes % 60);

  return (
    <div className="border p-4 rounded shadow bg-white text-black max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-2">{set.name}</h2>
      <img src={set.set_img_url} alt={set.name} className="mb-4 w-full" />
      <p>
        <strong>Set Number:</strong> {set.set_num}
      </p>
      <p>
        <strong>Year:</strong> {set.year}
      </p>
      <p>
        <strong>Parts:</strong> {set.num_parts}
      </p>
      <p>
        <strong>Estimated Build Time:</strong> {hours} hr {minutes} min
      </p>

      <div className="mt-4">
        <label
          className="block mb-1 font-semibold"
          htmlFor="speed-select-api"
        >
          Select Build Speed:
        </label>
        <select
          id="speed-select-api"
          value={speed}
          onChange={(e) => onSpeedChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded w-full"
        >
          {Object.keys(SPEEDS).map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <a
        href={set.set_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-legoRed hover:underline mt-4 block"
      >
        View on Rebrickable
      </a>
    </div>
  );
}
