"use client";

import { LogoMain, Wallet } from "../../svgs";
import { Button } from "../button";

interface HeaderProps {
  appLogo?: React.ReactNode;
  leftSideComponents?: React.ReactNode[];
}

export const Header = ({ appLogo, leftSideComponents }: HeaderProps) => {
  return (
    <header className="wr-sticky -wr-top-6 wr-z-40 wr-mx-auto wr-max-w-[1140px] wr-bg-zinc-950  wr-pb-[22px] wr-pt-[18px] lg:wr-top-0">
      <nav className="wr-relative wr-top-0 wr-flex writems-center wr-justify-between">
        <section className="wr-flex wr-items-center wr-gap-2 lg:wr-gap-6">
          {appLogo ? appLogo : <LogoMain />}

          {leftSideComponents &&
            leftSideComponents.length &&
            leftSideComponents.map((component, index) => (
              <div key={index}>{component}</div>
            ))}
        </section>
        <section className="wr-ml-6">
          <div className="wr-flex wr-w-full wr-items-center wr-justify-end wr-gap-0 lg:wr-justify-start lg:wr-gap-2">
            <Button
              onClick={() => {
                console.log("clicked");
              }}
              withIcon
              variant="success"
              className="flex  items-center gap-2"
              style={{ flex: "0 0 auto" }}
            >
              <Wallet className="h-5 w-5" /> Log In
            </Button>
          </div>
        </section>
      </nav>
    </header>
  );
};
