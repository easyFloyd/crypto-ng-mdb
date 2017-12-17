import { CoinItem } from '../models/coinitem.model';

export class Watchlist {
    public CoinItems: CoinItem[] = [];
    constructor(
        public name: string
    ) {}
}
