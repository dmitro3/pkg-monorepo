"use client";

import { DiceTemplate } from "@winrlabs/games";
import { useState } from "react";

export default function Home() {
  // const [results, setResults] = useState();

  return (
    <div>
      <DiceTemplate
        options={{
          scene: {
            backgroundImage: "url(/range.svg)",
          },
        }}
      />
      {/* <button
        style={{ marginTop: 400 }}
        onClick={() => {
          setResults([
            {
              payout: 0,
              payoutInUsd: 0,
              resultNumber: 30,
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
      </button> */}
    </div>
  );
}
