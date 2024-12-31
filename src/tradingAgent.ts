import { Keypair } from '@solana/web3.js';
import { TradingStrategy } from './tradingStrategy';
import { CONFIG } from './config';

export class TradingAgent {
    private strategy: TradingStrategy;
    private wallet: Keypair;

    constructor() {
        this.strategy = new TradingStrategy(CONFIG.TRADING_PAIR);
        this.wallet = Keypair.fromSecretKey(
            Buffer.from(JSON.parse(CONFIG.PRIVATE_KEY))
        );
    }

    async start() {
        console.log('Starting AI Trading Agent...');
        
        setInterval(async () => {
            try {
                const action = await this.strategy.analyze();
                
                switch (action) {
                    case 'buy':
                        await this.executeBuyOrder();
                        break;
                    case 'sell':
                        await this.executeSellOrder();
                        break;
                    case 'hold':
                        console.log('Holding position...');
                        break;
                }
            } catch (error) {
                console.error('Error in trading loop:', error);
            }
        }, CONFIG.INTERVAL);
    }

    private async executeBuyOrder() {
        // Implement DEX buy order logic here
        console.log('Executing buy order...');
    }

    private async executeSellOrder() {
        // Implement DEX sell order logic here
        console.log('Executing sell order...');
    }
} 