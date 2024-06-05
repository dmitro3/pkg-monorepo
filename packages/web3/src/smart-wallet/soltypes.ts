// import {
//   IEntryPointSimulations,
//   IStakeManager
// } from './types/@account-abstraction/contracts/interfaces/IEntryPointSimulations'

import { Hex } from "viem";
import { Address } from "viem";

// export { PackedUserOperationStruct } from './types/@account-abstraction/contracts/core/EntryPoint'
// export {
//   IAccount, IAccount__factory,
//   IEntryPoint, IEntryPoint__factory,
//   IStakeManager, IStakeManager__factory,
//   IPaymaster, IPaymaster__factory,
//   IEntryPointSimulations, IEntryPointSimulations__factory,
//   SenderCreator__factory,
//   CodeHashGetter__factory,
//   SampleRecipient, SampleRecipient__factory,
//   SimpleAccount, SimpleAccount__factory,
//   SimpleAccountFactory, SimpleAccountFactory__factory
// } from './types'
// export { TypedEvent } from './types/common'

// export {
//   AccountDeployedEvent,
//   SignatureAggregatorChangedEvent,
//   UserOperationEventEvent
// } from './types/@account-abstraction/contracts/interfaces/IEntryPoint'

// export type ValidationResultStructOutput = IEntryPointSimulations.ValidationResultStructOutput
// export type ExecutionResultStructOutput = IEntryPointSimulations.ExecutionResultStructOutput
// export type StakeInfoStructOutput = IStakeManager.StakeInfoStructOutput

export type PackedUserOperationStruct = {
  sender: Address;
  nonce: bigint;
  initCode: Hex;
  callData: Hex;
  accountGasLimits: Hex;
  preVerificationGas: bigint;
  gasFees: Hex;
  paymasterAndData: Hex;
  signature: Hex;
};
