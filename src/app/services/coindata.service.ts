import { CoinItem } from '../models/coinitem.model';
import { Injectable } from '@angular/core';
import { CmcService } from 'app/services/cmc.service';
import { Ticker } from 'app/models/ticker.model';

@Injectable()
export class CoinDataService {
    private _tickers: Ticker[] = [];

    constructor(private cmcService: CmcService) {}

    getTickers(): Promise<Ticker[]> {
        if (this._tickers.length === 0) {
            return this.cmcService.tickers().then(data => {
                this.mapTickers(data);
                return this._tickers;
            });
        } else {
            return new Promise((resolve) => resolve(this._tickers));
        }
    }

    refreshCoin(coin: CoinItem) {
        this.cmcService.loadCoin(coin.id).then(data => {
            this.mapCoin(coin, data);
        });
    }

    refreshCoins(coinArray: CoinItem[]): Promise<void> {
        const idArr = coinArray.map(coin => {return coin.id});
        return this.cmcService.loadCoins(idArr).then((data) => {
            idArr.forEach(coinId => {
                this.refreshCoinItemsById(coinId, coinArray, data);
            });
        });
    }

    private refreshCoinItemsById(coinId: string, coinArray: CoinItem[], data: any[]) {
        const cData = data.find(d => d.id === coinId);
        const coin = coinArray.find(c => c.id === coinId);
        this.mapCoin(coin, cData);
    }

    private mapCoin(coin: CoinItem, data: any) {
        if (!coin.initialized) {
            coin.name = data.name;
            coin.symbol = data.symbol;
            coin.img_16x16_src = data.img_16x16_src;
            coin.img_64x64_src = data.img_64x64_src;
            coin.initialized = true;
        }
        coin.price_usd = data.price_usd;
        coin.price_btc = data.price_btc;
        coin.percent_change_1h = data.percent_change_1h;
        coin.percent_change_24h = data.percent_change_24h;
        coin.percent_change_7d = data.percent_change_7d;
        coin.volume_usd_24h = data['24h_volume_usd'];
        coin.market_cap_usd = data.market_cap_usd;
    }

    private mapTickers(data) {
        this._tickers = [];
        data.forEach(ticker => {
            this._tickers.push(new Ticker(ticker.id, ticker.symbol, ticker.name));
        });
    }
}
