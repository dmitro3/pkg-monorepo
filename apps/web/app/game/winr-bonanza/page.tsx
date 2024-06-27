"use client";

import dynamic from "next/dynamic";

const WinrBonanzaTemplateWithWeb3 = dynamic(
  () => import("@winrlabs/web3-games").then((mod) => mod.WinrBonanzaWithWeb3),
  {
    ssr: false,
  }
);
const CDN_URL = process.env.NEXT_PUBLIC_BASE_CDN_URL || "";

export default function WinrBonanzaPage() {
  return (
    <WinrBonanzaTemplateWithWeb3
      buildedGameUrl={`${CDN_URL}/winrlabs-games/winr-bonanza`}
      buildedGameUrlMobile={`${CDN_URL}/winrlabs-games/winr-bonanza`}
    />
  );
}
