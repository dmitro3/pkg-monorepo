"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
} from "../select";
import React from "react";

import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";
import { cn, toFormatted } from "../../utils";

import {
  useTokenStore,
  Token,
  useSelectedToken,
  useTokenBalances,
  useCurrentAccount,
} from "@winrlabs/web3";
import { Address, formatUnits } from "viem";

const SelectCurrencyItem = ({
  balance,
  token,
}: {
  balance: number;
  token: Token;
}) => {
  return (
    <SelectItem
      value={token.address}
      className="wr-flex wr-w-full wr-py-2 wr-font-semibold"
    >
      <Image
        alt="token_icon"
        src={token.icon}
        className="wr-mr-2 wr-rounded-full"
        width={20}
        height={20}
      />
      {toFormatted(formatUnits(balance, token.decimals), token.displayDecimals)}
      <span className="wr-ml-2 wr-text-zinc-500">{token.symbol}</span>
    </SelectItem>
  );
};

export const SelectGameCurrency: React.FC<{ triggerClassName?: string }> = ({
  triggerClassName,
}) => {
  const account = useCurrentAccount();
  const { tokens } = useTokenStore();
  const selectedToken = useSelectedToken();
  const { data: balances } = useTokenBalances({
    account: account?.address || "0x0",
  });

  return (
    <Select
    // onValueChange={(val) => {
    //   updateSelectedCurrency(val as GameCurrency);
    // }}
    // value={selectedCurrency}
    >
      {selectedToken && balances && (
        <SelectTrigger className="wr-min-w-fit wr-items-center wr-justify-center wr-gap-2">
          <Image
            src={selectedToken?.icon}
            alt="token_image"
            width={20}
            height={20}
            className="max-md:mr-1 "
          />
          <span className="mt-[2px]">
            {toFormatted(
              formatUnits(
                balances[selectedToken.address] ?? 0,
                selectedToken.decimals
              ),
              2
            )}
          </span>
        </SelectTrigger>
      )}

      <SelectContent
        className="wr-relative wr-z-[60] wr-w-[280px] wr-bg-zinc-950 wr-p-2"
        align="center"
      >
        <SelectGroup className="wr-w-full">
          {tokens.map((token) => (
            <SelectCurrencyItem
              lastPrice={1}
              balance={balances[token.address] ?? 0}
              token={token}
            />
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
