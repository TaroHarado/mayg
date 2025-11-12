import { PublicKey } from '@solana/web3.js';

/**
 * Tax configuration for token
 */
export interface TaxConfig {
  /** Buy tax percentage (0-25) */
  buyTax: number;
  /** Sell tax percentage (0-25) */
  sellTax: number;
  /** Enable random tax variations */
  randomTax?: boolean;
  /** Random tax range (min, max) */
  randomTaxRange?: [number, number];
}

/**
 * Token metadata configuration
 */
export interface TokenMetadata {
  name: string;
  symbol: string;
  description: string;
  image?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
}

/**
 * Complete token configuration
 */
export interface TokenConfig {
  metadata: TokenMetadata;
  tax: TaxConfig;
  /** Initial supply (optional) */
  initialSupply?: number;
  /** Decimals (default: 9) */
  decimals?: number;
}

/**
 * Parameters for launching a token
 */
export interface LaunchTokenParams {
  /** Token configuration */
  config: TokenConfig;
  /** Payer public key */
  payer: PublicKey;
  /** Optional: custom mayhem program ID */
  programId?: PublicKey;
  /** Network: 'mainnet-beta' | 'devnet' | 'testnet' */
  network?: 'mainnet-beta' | 'devnet' | 'testnet';
}

/**
 * Result of token launch
 */
export interface LaunchResult {
  /** Token mint address */
  mint: PublicKey;
  /** Associated token account */
  ata: PublicKey;
  /** Transaction signature */
  signature: string;
  /** Explorer URL */
  explorerUrl: string;
}

/**
 * Mayhem program addresses
 */
export const MAYHEM_PROGRAM_IDS = {
  'mainnet-beta': new PublicKey('BStR2jgmN6X1ZqMyjhTcYkHqC7kT7WenYeNZLkACYdbW'),
  'devnet': new PublicKey('BStR2jgmN6X1ZqMyjhTcYkHqC7kT7WenYeNZLkACYdbW'),
  'testnet': new PublicKey('BStR2jgmN6X1ZqMyjhTcYkHqC7kT7WenYeNZLkACYdbW'),
} as const;

