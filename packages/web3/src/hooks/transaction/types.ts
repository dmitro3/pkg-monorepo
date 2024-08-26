import { Address, Hex } from 'viem';

import { SimpleAccountAPI } from '../../smart-wallet';
import { WinrBundlerClient } from '../use-bundler-client';

export interface CreateUserOpRequest {
  target: Address;
  encodedData: Hex;
  accountApi?: SimpleAccountAPI;
  value?: bigint;
}

export interface TxRequest {
  customBundlerClient?: WinrBundlerClient;
  customAccountApi?: SimpleAccountAPI;
  encodedTxData?: `0x${string}`;
  target?: Address;
  value?: bigint;
}

export interface SocialAccountTxRequest extends TxRequest {
  method?: 'sendUserOperation' | 'sendGameOperation';
}

export interface Web3AccountTxRequest extends TxRequest {
  permit?: Hex;
  part?: Hex;
}

export interface SendTxRequest extends TxRequest {
  permit?: Hex;
  part?: Hex;
  method?: 'sendUserOperation' | 'sendGameOperation';
}
