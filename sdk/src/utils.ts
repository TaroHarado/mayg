import { PublicKey } from '@solana/web3.js';

/**
 * Get Solana explorer URL for transaction
 */
export function getExplorerUrl(
  signature: string,
  network: 'mainnet-beta' | 'devnet' | 'testnet' = 'mainnet-beta'
): string {
  const cluster = network === 'mainnet-beta' ? '' : `?cluster=${network}`;
  return `https://solscan.io/tx/${signature}${cluster}`;
}

/**
 * Get SolanaFM explorer URL
 */
export function getSolanaFMUrl(
  address: string,
  network: 'mainnet-beta' | 'devnet' | 'testnet' = 'mainnet-beta'
): string {
  const cluster = network === 'mainnet-beta' ? '' : `?cluster=${network}`;
  return `https://solana.fm/address/${address}${cluster}`;
}

/**
 * Validate Solana address
 */
export function isValidAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

/**
 * Convert lamports to SOL
 */
export function lamportsToSol(lamports: number): number {
  return lamports / 1_000_000_000;
}

/**
 * Convert SOL to lamports
 */
export function solToLamports(sol: number): number {
  return Math.floor(sol * 1_000_000_000);
}

/**
 * Format number with decimals
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

/**
 * Truncate address for display
 */
export function truncateAddress(address: string, chars: number = 4): string {
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

