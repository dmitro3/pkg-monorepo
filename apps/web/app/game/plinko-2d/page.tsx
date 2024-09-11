'use client';

import { LiveResults, PlinkoGame, Web3GamesModals } from '@winrlabs/web3-games';

export default function PlinkoPage() {
  return (
    <>
      <PlinkoGame
        options={{
          scene: {
            backgroundImage: 'url(/plinko.png)',
          },
          // hideWager: true,
          // disableStrategy: true,
          maxPayout: {
            label: 'Max Gems',
            icon: '/custom/mines/rev-gem.png',
          },
          controllerHeader: <div>Plinko 2D</div>,
          hideTabs: true,
          hideTotalWagerInfo: true,
          hideWager: true,
          tokenPrefix: '',
        }}
        minWager={0.1}
        maxWager={2000}
      />
      <LiveResults />
      <Web3GamesModals />
    </>
  );
}
