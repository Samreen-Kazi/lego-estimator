export default function HowToUse() {
  return (
    <div className="max-w-2xl mx-auto bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded mb-6">
      <h2 className="text-xl font-semibold mb-2">How to Use This App</h2>
      <ol className="list-decimal list-inside space-y-1">
        <li>
          <strong>Search by LEGO Set Number or Name:</strong> Enter a set number like <code>10265-1</code> or a keyword like <em>Mustang</em>, then click <em>Search</em>. The app will show the set details and estimated build time.
        </li>
        <li>
          <strong>Manual Estimate by Piece Count:</strong> If you know the number of pieces but not the set, enter the count in the box below, select your build speed (Beginner, Average, Expert), and click <em>Estimate</em>.
        </li>
        <li>
          <strong>Build Speed:</strong> This adjusts how fast you build each piece (e.g., Expert = faster). Choose the one that fits your style.
        </li>
      </ol>
    </div>
  );
}