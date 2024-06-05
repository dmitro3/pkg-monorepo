"use client";

import { useDisconnect } from "wagmi";
import { LogoMain, Wallet } from "../../svgs";
import { cn } from "../../utils";
import { Button } from "../button";
import { Chat } from "../chat";
import useModalsStore from "../modals/modals.store";
import { useCurrentAccount } from "@winrlabs/web3";

export interface HeaderProps {
  appLogo?: React.ReactNode;
  leftSideComponents?: React.ReactNode[];
  chat: {
    show?: boolean;
  };
  containerClassName?: string;
}

export const Header = ({
  appLogo,
  leftSideComponents,
  chat,
  containerClassName,
}: HeaderProps) => {
  const modalStore = useModalsStore();
  const account = useCurrentAccount();
  const { disconnect } = useDisconnect();
  console.log(account, "account");

  return (
    <header
      className={cn(
        "wr-sticky -wr-top-6 wr-z-40 wr-mx-auto wr-max-w-[1140px] wr-bg-zinc-950  wr-pb-[22px] wr-pt-[18px] lg:wr-top-0",
        containerClassName
      )}
    >
      <nav className="wr-relative wr-top-0 wr-flex writems-center wr-justify-between">
        <section className="wr-flex wr-items-center wr-gap-2 lg:wr-gap-6">
          {appLogo ? appLogo : <LogoMain />}

          {leftSideComponents &&
            leftSideComponents.length &&
            leftSideComponents.map((component, index) => (
              <div key={index}>{component}</div>
            ))}
        </section>
        {account.address ? (
          <Button
            onClick={() => {
              disconnect();
            }}
          >
            {account.address}
          </Button>
        ) : (
          <section className="wr-ml-6 wr-flex wr-gap-2">
            <Button
              onClick={() => {
                modalStore.openModal("login");
              }}
              withIcon
              variant="success"
              className="wr-flex  wr-items-center wr-gap-2"
              style={{ flex: "0 0 auto" }}
            >
              <Wallet className="wr-h-5 wr-w-5" /> Log In
            </Button>

            {chat.show && <Chat />}
          </section>
        )}
      </nav>
    </header>
  );
};
