import React from "react";
import { useGameSocketContext } from "../use-game-socket";
import { DecodedEvent, Event, GAME_HUB_GAMES } from "../../utils";
import SuperJSON from "superjson";
import { Socket, io } from "socket.io-client";

export const useListenMultiplayerGameEvent = (game: GAME_HUB_GAMES) => {
  const { bundlerWsUrl } = useGameSocketContext();

  const [socket, setSocket] = React.useState<Socket | null>(null);

  const [gameEvent, setGameEvent] = React.useState<DecodedEvent<
    any,
    any
  > | null>(null);

  React.useEffect(() => {
    if (!bundlerWsUrl) return;

    setSocket(
      io(bundlerWsUrl, {
        extraHeaders: {
          "x-multiplayer-game": game,
        },
      })
    );
  }, [bundlerWsUrl]);

  // socket connection
  React.useEffect(() => {
    if (!socket) return;

    socket.connect();

    socket.on("connect", () => {
      console.log("multiplayer socket connected!");
    });

    socket.on("disconnect", () => {
      console.log("multiplayer socket disconnected");
    });

    return () => {
      socket.off("connect");

      socket.off("disconnect");

      socket.disconnect();
    };
  }, [socket]);

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

    console.log(context, "mp CONTEXT!");

    setGameEvent(context);
  };

  return gameEvent;
};
