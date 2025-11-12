/**
 * Unit tests for mayhem.tax SDK
 * 
 * Note: These are placeholder tests for demonstration.
 * In production, comprehensive tests would be implemented.
 */

import { MayhemTaxSDK } from './sdk';
import { Connection } from '@solana/web3.js';

describe('MayhemTaxSDK', () => {
  let sdk: MayhemTaxSDK;
  let connection: Connection;

  beforeEach(() => {
    connection = new Connection('https://api.devnet.solana.com');
    sdk = new MayhemTaxSDK({
      connection,
      network: 'devnet',
    });
  });

  test('should initialize SDK', () => {
    expect(sdk).toBeDefined();
    expect(sdk.getNetwork()).toBe('devnet');
  });

  test('should get program ID', () => {
    const programId = sdk.getProgramId();
    expect(programId).toBeDefined();
  });

  // Additional tests would be added here
});

