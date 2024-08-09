import React from "react";
import SuperJSON from "superjson";

import { DecodedEvent, Event } from "../../utils";
import { useGameSocketContext } from "../use-game-socket";
import { Socket, io } from "socket.io-client";
import { useCurrentAccount } from "@winrlabs/web3";

export const useListenGameEvent = () => {
  const [gameEvent, setGameEvent] = React.useState<DecodedEvent<
    any,
    any
  > | null>(null);

  const [socket, setSocket] = React.useState<Socket | null>(null);

  const { address } = useCurrentAccount();

  const { bundlerWsUrl, network } = useGameSocketContext();

  // socket connection
  React.useEffect(() => {
    if (!socket) return;

    socket.connect();

    socket.on("connect", () => {
      console.log("socket connected!", socket);
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });

    return () => {
      socket.off("connect");

      socket.off("disconnect");

      socket.disconnect();
    };
  }, [socket]);

  React.useEffect(() => {
    if (!address || !bundlerWsUrl || !network) return;
    console.log(network, bundlerWsUrl, "bundler ws url");
    setSocket(
      io(bundlerWsUrl, {
        extraHeaders: {
          "x-address": address,
          "x-network": network,
        },
      })
    );
  }, [address, bundlerWsUrl, network]);

  React.useEffect(() => {
    if (!socket) return;

    socket.on("message", onListenEvent);

    return () => {
      socket.off("message", onListenEvent);
    };
  }, [socket]);

  const onListenEvent = (e: string) => {
    const _e = SuperJSON.parse(e) as Event;

    const context = _e.context as DecodedEvent<any, any>;

    console.log(context, "CONTEXT!");

    setGameEvent(context);
  };

  return gameEvent;
};
