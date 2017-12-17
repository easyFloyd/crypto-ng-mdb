import { CoinItem } from '../models/coinitem.model';

declare var _cc: any;

export class CoinDataService {

    refreshCoin(coin: CoinItem) {
        if (!coin.initialized) {
            coin.coinObj = _cc(coin.id);
        }
        coin.coinObj.loadCoin(() => this.mapCoin(coin));
    }

    refreshCoins(coinArray: CoinItem[]) {
        coinArray.forEach(coin => {
            this.refreshCoin(coin);
          });
    }

    private mapCoin(coin: CoinItem) {
        if (!coin.initialized) {
            coin.name = coin.coinObj.coin.name;
            coin.symbol = coin.coinObj.coin.symbol;
            coin.img_16x16_src = coin.coinObj.coin.img_16x16_src;
            coin.img_64x64_src = coin.coinObj.coin.img_64x64_src;
            coin.initialized = true;
        }
        coin.price_usd = coin.coinObj.coin.price_usd;
        coin.price_btc = coin.coinObj.coin.price_btc;
        coin.percent_change_1h = coin.coinObj.coin.percent_change_1h;
        coin.percent_change_24h = coin.coinObj.coin.percent_change_24h;
        coin.percent_change_7d = coin.coinObj.coin.percent_change_7d;
        coin.volume_usd_24h = coin.coinObj.coin['24h_volume_usd'];
        coin.market_cap_usd = coin.coinObj.coin.market_cap_usd;
    }
}
