"use client";

import { RollTemplate } from "@winrlabs/games";
import React from "react";

const RollPage = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <div>
      <button onClick={() => setLoading(!loading)}>trigger loading</button>
      <RollTemplate
        maxWager={100}
        minWager={1}
        options={{
          scene: {
            backgroundImage: "url(/coin-flip/coin-flip-bg.png)",
          },
        }}
        onSubmit={() => console.log("submit")}
        loading={loading}
        winner={4}
      />
    </div>
  );
};

export default RollPage;
