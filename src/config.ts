import { Connection, PublicKey } from '@solana/web3.js';
import { config } from 'dotenv';

config();

export const CONFIG = {
    RPC_ENDPOINT: process.env.RPC_ENDPOINT || 'https://api.mainnet-beta.solana.com',
    PRIVATE_KEY: process.env.PRIVATE_KEY || '',
    MARKET_ADDRESS: new PublicKey(process.env.MARKET_ADDRESS || ''),
    TRADING_PAIR: process.env.TRADING_PAIR || 'SOL/USDC',
    INTERVAL: parseInt(process.env.INTERVAL || '300000'), // 5 minutes
    MA_PERIOD: parseInt(process.env.MA_PERIOD || '20'),
};

export const connection = new Connection(CONFIG.RPC_ENDPOINT); 