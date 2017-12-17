import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Watchlist } from '../models/watchlist.model';
import { CoinItem } from '../models/coinitem.model';
import { CoinDataService } from './coindata.service';

@Injectable()
export class WatchlistService {
    private watchlist: Watchlist;
    constructor(private userService: UserService, private coinDataService: CoinDataService) {}

    getUserWatchlist() {
        const currentUser = this.userService.getCurrentUser();
        if (currentUser != null) {
            this.watchlist = currentUser.watchList;
        } else {
            this.watchlist = new Watchlist('Watchlist');
        }
        return this.watchlist;
    }

    addWatchlistItem(coin: CoinItem) {
        this.watchlist.CoinItems.push(coin);
    }

    refreshWatchlist() {
        if (this.watchlist !== null) {
            this.coinDataService.refreshCoins(this.watchlist.CoinItems);
          }
    }
}
