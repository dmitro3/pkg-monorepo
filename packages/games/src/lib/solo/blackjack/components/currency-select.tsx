import { Token, BalanceMap } from "@winrlabs/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../../ui/select";
import { buttonVariants } from "../../../ui/button";
import { cn } from "../../../utils/style";

export const CurrencySelect = ({
  currencyList,
  selectedCurrency,
  balances,
  onChange,
}: {
  currencyList: Token[];
  selectedCurrency: Token;
  balances: BalanceMap;
  onChange: (token: Token) => void;
}) => {
  if (!balances || !currencyList) return null;

  return (
    <div className="wr-z-[400] wr-top-3 wr-right-3 wr-fixed">
      <Select
        onValueChange={(val) => {
          const token = currencyList.find((token) => token.address === val);
          if (!token) return;
          onChange(token);
        }}
        value={selectedCurrency.address}
      >
        <SelectTrigger
          className={cn(
            buttonVariants({ variant: "third" }),
            "wr-border-0 px-2 wr-gap-2"
          )}
        >
          <img
            src={selectedCurrency.icon}
            alt={selectedCurrency.symbol}
            className="wr-shrink-0"
            width={20}
            height={20}
          />
        </SelectTrigger>
        <SelectContent className="wr-z-[400] wr-w-[200px]  wr-border-0 wr-bg-unity-white-15 wr-font-semibold wr-text-unity-white-50 wr-backdrop-blur-md">
          {currencyList.map((token) => (
            <SelectItem
              key={token.address}
              value={token.address}
              className="wr-flex wr-justify-between"
            >
              <span>{token.symbol}</span>
              <span>${balances[token.address] ?? 0}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
