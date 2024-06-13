"use client";

import { KenoTemplate } from "@winrlabs/games";
import React from "react";

const KenoPage = () => {
  return (
    <KenoTemplate
      options={{
        scene: {
          backgroundImage: "url(/coin-flip/coin-flip-bg.png)",
        },
      }}
      minWager={0.1}
      maxWager={2000}
      gameResults={[]}
      onSubmitGameForm={(e) => console.log(e)}
      onAnimationSkipped={() => console.log("skipped")}
      onAnimationStep={(e) => console.log("STEP", e)}
    />
  );
};

export default KenoPage;
