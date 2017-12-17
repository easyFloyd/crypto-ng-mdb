
export class CoinItem {
    public id: string;
    public name: string;
    public symbol: string;
    public price_usd: number;
    public price_btc: number;
    public percent_change_1h: number;
    public percent_change_24h: number;
    public percent_change_7d: number;
    public volume_usd_24h: number;
    public market_cap_usd: number;
    public img_16x16_src: string;
    public img_64x64_src: string;

    public amount: number;
    public value: number;

    coinObj: any;
    initialized: boolean;

    constructor(id: string) {
        this.id = id;
        this.initialized = false;
        this.value = 0;
        this.amount = 0;
    }

    get value_usd() {
        return this.value * this.price_usd;
    }
}
