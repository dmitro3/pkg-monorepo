import { useMemo } from "react";
import { erc20Abi } from "../abis";
import { useReadContracts } from "wagmi";

const getContractsToRead = ({
  balancesToRead,
  account,
}: {
  balancesToRead: `0x${string}`[];
  account: `0x${string}`;
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

export const useTokenBalances = ({
  account,
  balancesToRead,
}: {
  account: `0x${string}`;
  balancesToRead: `0x${string}`[];
}) => {
  const contractsToRead = useMemo(() => {
    if (!balancesToRead || !account) return [];
    return getContractsToRead({ balancesToRead, account });
  }, [balancesToRead, account]);

  return useReadContracts({
    contracts: contractsToRead,
    query: {
        enabled: !!contractsToRead || !!account,
    }
  });
};
