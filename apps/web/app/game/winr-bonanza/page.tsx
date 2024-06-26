"use client";

import dynamic from "next/dynamic";

const WinrBonanzaTemplateWithWeb3 = dynamic(
  () => import("./_components/web3/winr-bonanza"),
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
