"use client";

import { Range } from "@winrlabs/games";
import { useState } from "react";

export default function Home() {
  const [results, setResults] = useState();

  return (
    <div style={{ width: 500 }}>
      <Range.Game results={results}>
        <Range.Body>
          <Range.TextRandomizer />
          <Range.Slider />
        </Range.Body>
      </Range.Game>

      <button
        style={{ marginTop: 20 }}
        onClick={() => {
          setResults([
            {
              payout: 0,
              payoutInUsd: 0,
              resultNumber: 49,
            },
            {
              payout: 2,
              payoutInUsd: 2,
              resultNumber: 49,
            },
            {
              payout: 0,
              payoutInUsd: 0,
              resultNumber: 10,
            },
          ]);
        }}
      >
        xd
      </button>
    </div>
  );
}
