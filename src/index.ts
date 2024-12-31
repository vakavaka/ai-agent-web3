import { TradingAgent } from './tradingAgent';

async function main() {
    const agent = new TradingAgent();
    await agent.start();
}

main().catch(console.error); 