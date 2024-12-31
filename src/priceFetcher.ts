import axios from 'axios';
import Decimal from 'decimal.js';
import { CONFIG } from './config';

export class PriceFetcher {
    private prices: Decimal[] = [];
    private readonly pair: string;

    constructor(tradingPair: string) {
        this.pair = tradingPair;
    }

    async fetchLatestPrice(): Promise<Decimal> {
        try {
            // This is a simplified example - you should replace with actual DEX price fetching
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
                params: {
                    ids: 'solana',
                    vs_currencies: 'usd'
                }
            });
            
            const price = new Decimal(response.data.solana.usd);
            this.prices.push(price);
            
            // Keep only the last MA_PERIOD prices
            if (this.prices.length > CONFIG.MA_PERIOD) {
                this.prices.shift();
            }
            
            return price;
        } catch (error) {
            console.error('Error fetching price:', error);
            throw error;
        }
    }

    getMovingAverage(): Decimal {
        if (this.prices.length === 0) return new Decimal(0);
        
        const sum = this.prices.reduce((acc, price) => acc.plus(price), new Decimal(0));
        return sum.dividedBy(this.prices.length);
    }
} 