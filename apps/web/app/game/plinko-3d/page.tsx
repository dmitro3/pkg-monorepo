"use client";

import { Plinko3DTemplateWithWeb3 } from "@winrlabs/web3-games";
import React from "react";

const Plinko3d = () => {
  return (
    <Plinko3DTemplateWithWeb3
      buildedGameUrl={"https://jbassets.fra1.digitaloceanspaces.com"}
      options={{
        scene: {
          loader: "/plinko-3d/loader.png",
        },
        betController: {
          logo: "/plinko-3d/plinko.png",
        },
      }}
      minWager={0.1}
      maxWager={100}
    />
  );
};

export default Plinko3d;
