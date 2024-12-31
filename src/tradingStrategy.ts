import { Decimal } from 'decimal.js';
import { PriceFetcher } from './priceFetcher';

export class TradingStrategy {
    private priceFetcher: PriceFetcher;
    private lastAction: 'buy' | 'sell' | null = null;

    constructor(tradingPair: string) {
        this.priceFetcher = new PriceFetcher(tradingPair);
    }

    async analyze(): Promise<'buy' | 'sell' | 'hold'> {
        const currentPrice = await this.priceFetcher.fetchLatestPrice();
        const movingAverage = this.priceFetcher.getMovingAverage();

        // Simple MA crossover strategy
        if (currentPrice.greaterThan(movingAverage) && this.lastAction !== 'buy') {
            this.lastAction = 'buy';
            return 'buy';
        } else if (currentPrice.lessThan(movingAverage) && this.lastAction !== 'sell') {
            this.lastAction = 'sell';
            return 'sell';
        }

        return 'hold';
    }
} 