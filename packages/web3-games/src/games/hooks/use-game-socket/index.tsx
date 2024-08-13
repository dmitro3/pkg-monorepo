'use client';

import { BundlerNetwork } from '@winrlabs/web3';
import React from 'react';

interface GameSocket {
  bundlerWsUrl: string;
  network: BundlerNetwork;
}
const GameSocketContext = React.createContext<GameSocket>({
  bundlerWsUrl: '',
  network: BundlerNetwork.WINR,
});

export const useGameSocketContext = () => {
  return React.useContext(GameSocketContext);
};

export const GameSocketProvider: React.FC<{
  bundlerWsUrl: string;
  network: BundlerNetwork;
  children: React.ReactNode;
}> = ({ bundlerWsUrl, network, children }) => {
  return (
    <GameSocketContext.Provider
      value={{
        bundlerWsUrl,
        network,
      }}
    >
      {children}
    </GameSocketContext.Provider>
  );
};
