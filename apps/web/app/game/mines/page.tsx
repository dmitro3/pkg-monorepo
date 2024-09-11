'use client';

import { MinesGame, Web3GamesModals } from '@winrlabs/web3-games';
import React from 'react';

const MinesPage = () => {
  return (
    <>
      <MinesGame
        maxWager={100}
        minWager={0.01}
        theme={
          {
            // tokenPrefix: '',
          }
        }
      />
      <Web3GamesModals />
    </>
  );
};

export default MinesPage;
