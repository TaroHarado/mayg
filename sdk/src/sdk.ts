import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { MayhemProgram } from './program';
import { TokenLauncher } from './launcher';
import { LaunchTokenParams, LaunchResult, MAYHEM_PROGRAM_IDS } from './types';

/**
 * Main SDK class for mayhem.tax
 * 
 * @example
 * ```typescript
 * const sdk = new MayhemTaxSDK({
 *   connection: new Connection('https://api.mainnet-beta.solana.com'),
 *   network: 'mainnet-beta'
 * });
 * 
 * const result = await sdk.launchToken({
 *   config: {
 *     metadata: {
 *       name: 'My Token',
 *       symbol: 'MTK',
 *       description: 'My awesome token'
 *     },
 *     tax: {
 *       buyTax: 5,
 *       sellTax: 10
 *     }
 *   },
 *   payer: wallet.publicKey
 * });
 * ```
 */
export class MayhemTaxSDK {
  private connection: Connection;
  private network: 'mainnet-beta' | 'devnet' | 'testnet';
  private program: MayhemProgram;
  private launcher: TokenLauncher;

  constructor(config: {
    connection: Connection;
    network?: 'mainnet-beta' | 'devnet' | 'testnet';
  }) {
    this.connection = config.connection;
    this.network = config.network || 'mainnet-beta';
    
    const programId = MAYHEM_PROGRAM_IDS[this.network];
    this.program = new MayhemProgram(this.connection, programId);
    this.launcher = new TokenLauncher(this.connection, this.program);
  }

  /**
   * Launch a new tax token
   */
  async launchToken(params: LaunchTokenParams): Promise<LaunchResult> {
    return this.launcher.launch(params);
  }

  /**
   * Get token information
   */
  async getTokenInfo(mint: PublicKey) {
    return this.program.getTokenInfo(mint);
  }

  /**
   * Update token tax configuration
   */
  async updateTaxConfig(
    mint: PublicKey,
    taxConfig: { buyTax?: number; sellTax?: number },
    authority: Keypair
  ) {
    return this.program.updateTaxConfig(mint, taxConfig, authority);
  }

  /**
   * Get current network
   */
  getNetwork(): 'mainnet-beta' | 'devnet' | 'testnet' {
    return this.network;
  }

  /**
   * Get mayhem program ID for current network
   */
  getProgramId(): PublicKey {
    return MAYHEM_PROGRAM_IDS[this.network];
  }
}

