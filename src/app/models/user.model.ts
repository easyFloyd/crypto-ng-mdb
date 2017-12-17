import { Portfolio } from './portfolio.model';
import { Watchlist } from './watchlist.model';

export class User {
    public id: number;
    public watchList: Watchlist;
    public portfolios: Portfolio[] = [];
}
