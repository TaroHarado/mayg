/**
 * Basic example: Launch a tax token
 * 
 * This example demonstrates how to launch a simple tax token
 * using the mayhem.tax SDK.
 */

import { MayhemTaxSDK } from '../src';
import { Connection, Keypair } from '@solana/web3.js';

async function main() {
  // Initialize connection
  const connection = new Connection('https://api.devnet.solana.com');
  
  // Initialize SDK
  const sdk = new MayhemTaxSDK({
    connection,
    network: 'devnet'
  });

  // Your wallet (in production, load from environment or wallet adapter)
  const payer = Keypair.generate(); // Replace with actual wallet

  // Launch token
  try {
    const result = await sdk.launchToken({
      config: {
        metadata: {
          name: 'Example Token',
          symbol: 'EXT',
          description: 'An example tax token created with mayhem.tax SDK',
          website: 'https://example.com',
          twitter: 'https://x.com/example'
        },
        tax: {
          buyTax: 5,   // 5% tax on purchases
          sellTax: 10, // 10% tax on sales
          randomTax: false
        },
        decimals: 9
      },
      payer: payer.publicKey
    });

    console.log('✅ Token launched successfully!');
    console.log('Mint:', result.mint.toString());
    console.log('ATA:', result.ata.toString());
    console.log('Signature:', result.signature);
    console.log('Explorer:', result.explorerUrl);
  } catch (error) {
    console.error('❌ Error launching token:', error);
  }
}

main().catch(console.error);

