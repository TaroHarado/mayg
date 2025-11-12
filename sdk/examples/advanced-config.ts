/**
 * Advanced example: Launch token with random tax
 * 
 * This example demonstrates launching a token with
 * advanced tax configuration including random tax variations.
 */

import { MayhemTaxSDK } from '../src';
import { Connection, Keypair } from '@solana/web3.js';

async function main() {
  const connection = new Connection('https://api.devnet.solana.com');
  const sdk = new MayhemTaxSDK({
    connection,
    network: 'devnet'
  });

  const payer = Keypair.generate(); // Replace with actual wallet

  try {
    const result = await sdk.launchToken({
      config: {
        metadata: {
          name: 'Random Tax Token',
          symbol: 'RTT',
          description: 'Token with random tax variations',
          website: 'https://example.com',
          twitter: 'https://x.com/randomtoken',
          telegram: 'https://t.me/randomtoken'
        },
        tax: {
          buyTax: 3,
          sellTax: 7,
          randomTax: true,
          randomTaxRange: [1, 5] // Random variation between 1-5%
        },
        decimals: 9,
        initialSupply: 1_000_000_000
      },
      payer: payer.publicKey
    });

    console.log('✅ Advanced token launched!');
    console.log('Mint:', result.mint.toString());
    console.log('View on explorer:', result.explorerUrl);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

main().catch(console.error);

