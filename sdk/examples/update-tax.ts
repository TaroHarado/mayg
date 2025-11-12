/**
 * Example: Update tax configuration
 * 
 * This example shows how to update tax rates
 * for an existing token (requires authority).
 */

import { MayhemTaxSDK } from '../src';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';

async function main() {
  const connection = new Connection('https://api.devnet.solana.com');
  const sdk = new MayhemTaxSDK({
    connection,
    network: 'devnet'
  });

  // Token mint address
  const mint = new PublicKey('YOUR_TOKEN_MINT_ADDRESS');
  
  // Authority keypair (must be token authority)
  const authority = Keypair.generate(); // Replace with actual authority

  try {
    const signature = await sdk.updateTaxConfig(
      mint,
      {
        buyTax: 7,  // Update buy tax to 7%
        sellTax: 12 // Update sell tax to 12%
      },
      authority
    );

    console.log('✅ Tax configuration updated!');
    console.log('Signature:', signature);
  } catch (error) {
    console.error('❌ Error updating tax:', error);
  }
}

main().catch(console.error);

