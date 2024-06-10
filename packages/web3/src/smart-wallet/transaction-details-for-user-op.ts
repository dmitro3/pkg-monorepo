import { Hex } from "viem";
import { Address } from "viem";

export interface TransactionDetailsForUserOp {
  target: Address;
  data: Hex;
  value?: bigint;
  gasLimit?: bigint;
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
  nonce?: bigint;
}
