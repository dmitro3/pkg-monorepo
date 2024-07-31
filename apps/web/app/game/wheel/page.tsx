"use client";

import { LiveResults, Web3GamesModals, WheelGame } from "@winrlabs/web3-games";

export default function WheelPage() {
  return (
    <>
      <WheelGame minWager={2} maxWager={2000} options={{}} />;
      <LiveResults />
      <Web3GamesModals />
    </>
  );
}
