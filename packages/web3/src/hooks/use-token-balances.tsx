import { useMemo } from "react";
import { erc20Abi } from "../abis";
import { useReadContracts } from "wagmi";
import { useTokenStore } from "../providers/token";
import { Address } from "viem";

const getContractsToRead = ({
  balancesToRead,
  account,
}: {
  balancesToRead: Address[];
  account: Address;
}) => {
  return balancesToRead.map((tokenAddress) => {
    return {
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [account],
    };
  });
};

/**
 *
 * @param account
 * @param balancesToRead
 * @returns
 *
 * If no balancesToRead is provided, it will return the balances of all the tokens in the token store
 */
export const useTokenBalances = ({
  account,
  balancesToRead,
}: {
  account: Address;
  balancesToRead?: Address[];
}) => {
  const { tokens } = useTokenStore();
  const targetBalanceToRead =
    balancesToRead && balancesToRead?.length > 0
      ? balancesToRead
      : tokens.map((token) => token.address);

  console.log(tokens, targetBalanceToRead, account);

  const contractsToRead = useMemo(() => {
    if (!targetBalanceToRead || !account) return [];
    return getContractsToRead({ balancesToRead: targetBalanceToRead, account });
  }, [targetBalanceToRead, account]);

  const result = useReadContracts({
    contracts: contractsToRead,
    query: {
      enabled: !!contractsToRead || !!account,
    },
  });

  const formattedResult = useMemo(() => {
    let data: Record<Address, bigint> = {};
    if (!result?.data) return {};

    data = Object.fromEntries(
      Object.entries(result.data).map(([key, value], index) => {
        return [targetBalanceToRead[index], value.result];
      })
    );

    return data;
  }, [result]);

  return {
    ...result,
    data: formattedResult,
  };
};
