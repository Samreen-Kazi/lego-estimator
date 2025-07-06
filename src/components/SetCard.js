import React from 'react';

export default function SetCard({ set }) {
  if (!set) return null;

  // Simple time estimation: assume 1 minute per part as a base
  const estimatedTimeMinutes = set.num_parts;

  // Format time in hours and minutes
  const hours = Math.floor(estimatedTimeMinutes / 60);
  const minutes = estimatedTimeMinutes % 60;

  return (
    <div className="border p-4 rounded shadow bg-white text-black max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-2">{set.name}</h2>
      <img src={set.set_img_url || set.set_img_url} alt={set.name} className="mb-4 w-full" />
      <p><strong>Set Number:</strong> {set.set_num}</p>
      <p><strong>Year:</strong> {set.year}</p>
      <p><strong>Parts:</strong> {set.num_parts}</p>
      <p><strong>Estimated Build Time:</strong> {hours} hr {minutes} min</p>
      <a href={set.set_url} target="_blank" rel="noopener noreferrer" className="text-legoRed hover:underline">
        View on Rebrickable
      </a>
    </div>
  );
}
