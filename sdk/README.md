# @mayhem-tax/sdk

<div align="center">

**Official SDK for mayhem.tax platform**

Create tax tokens on pump.fun using the mayhem protocol with the 2022 token standard.

[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Solana](https://img.shields.io/badge/Solana-Web3.js-purple.svg)](https://solana.com/)
[![Version](https://img.shields.io/badge/Version-1.0.0-green.svg)](package.json)

[Website](https://mayhem.tax) • [GitHub](https://github.com/mayhem-tax/mayhem) • [Twitter](https://x.com/mayhem_tax)

</div>

---

## 🚀 Quick Start

### Installation

```bash
npm install @mayhem-tax/sdk
```

### Basic Usage

```typescript
import { MayhemTaxSDK } from '@mayhem-tax/sdk';
import { Connection, Keypair } from '@solana/web3.js';

// Initialize SDK
const connection = new Connection('https://api.mainnet-beta.solana.com');
const sdk = new MayhemTaxSDK({
  connection,
  network: 'mainnet-beta'
});

// Launch a tax token
const result = await sdk.launchToken({
  config: {
    metadata: {
      name: 'My Token',
      symbol: 'MTK',
      description: 'My awesome tax token',
      website: 'https://example.com',
      twitter: 'https://x.com/mytoken'
    },
    tax: {
      buyTax: 5,    // 5% tax on buys
      sellTax: 10,  // 10% tax on sells
      randomTax: false
    },
    decimals: 9
  },
  payer: wallet.publicKey
});

console.log('Token launched:', result.mint.toString());
console.log('Explorer:', result.explorerUrl);
```

## 📚 Documentation

### MayhemTaxSDK

Main SDK class for interacting with mayhem.tax platform.

#### Constructor

```typescript
new MayhemTaxSDK(config: {
  connection: Connection;
  network?: 'mainnet-beta' | 'devnet' | 'testnet';
})
```

#### Methods

##### `launchToken(params: LaunchTokenParams): Promise<LaunchResult>`

Launch a new tax token on pump.fun.

**Parameters:**
- `config`: Token configuration (metadata, tax settings)
- `payer`: Public key of the payer
- `network`: Network to deploy on (optional)

**Returns:**
- `mint`: Token mint address
- `ata`: Associated token account
- `signature`: Transaction signature
- `explorerUrl`: Explorer URL for the transaction

##### `getTokenInfo(mint: PublicKey)`

Get information about a deployed token.

##### `updateTaxConfig(mint, taxConfig, authority)`

Update tax configuration for an existing token (requires authority).

## 🌐 Network Support

| Network | Status | Description |
|---------|--------|-------------|
| **Mainnet** | 🟡 Pending | Full support after mayhem contract deployment |
| **Devnet** | 🟢 Active | Currently available for testing |
| **Testnet** | 🟢 Available | Available for development |

## 🔗 Mayhem Program Address

The mayhem protocol program address:

**`BStR2jgmN6X1ZqMyjhTcYkHqC7kT7WenYeNZLkACYdbW`**

[View on Solscan](https://solscan.io/account/BStR2jgmN6X1ZqMyjhTcYkHqC7kT7WenYeNZLkACYdbW)

## 💡 Examples

See the [`/examples`](./examples) directory for complete usage examples:

- [`basic-launch.ts`](./examples/basic-launch.ts) - Basic token launch
- [`advanced-config.ts`](./examples/advanced-config.ts) - Advanced configuration with random tax
- [`update-tax.ts`](./examples/update-tax.ts) - Update tax configuration

## 🛠️ Tech Stack

<div align="left">

- **Language**: TypeScript 5.3+
- **Blockchain**: Solana
- **Token Standard**: SPL Token 2022
- **Libraries**: 
  - `@solana/web3.js` - Solana Web3 interactions
  - `@solana/spl-token` - Token operations

</div>

## 📦 Package Info

- **Name**: `@mayhem-tax/sdk`
- **Version**: `1.0.0`
- **License**: Proprietary
- **Repository**: [github.com/mayhem-tax/mayhem](https://github.com/mayhem-tax/mayhem)

## 🔗 Links

- **Website**: [mayhem.tax](https://mayhem.tax)
- **GitHub**: [github.com/mayhem-tax/mayhem](https://github.com/mayhem-tax/mayhem)
- **Twitter**: [@mayhem_tax](https://x.com/mayhem_tax)

## 📄 License

**Proprietary License** - See [LICENSE](./LICENSE) file for details.

---

<div align="center">

**© 2025 mayhem.tax. All rights reserved.**

</div>
