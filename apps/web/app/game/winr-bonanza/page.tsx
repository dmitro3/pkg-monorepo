"use client";

import { WinrBonanzaWithWeb3 } from "@winrlabs/web3-games";

const CDN_URL = process.env.NEXT_PUBLIC_BASE_CDN_URL || "";

export default function WinrBonanzaPage() {
  return (
    <WinrBonanzaWithWeb3
      buildedGameUrl={`${CDN_URL}/winrlabs-games/winr-bonanza`}
      buildedGameUrlMobile={`${CDN_URL}/winrlabs-games/winr-bonanza`}
    />
  );
}
