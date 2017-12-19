import { Portfolio } from './portfolio.model';
import { Watchlist } from './watchlist.model';
import { PortfolioSum } from 'app/models/portfoliosum.model';

export class User {
    public id: number;
    public watchList: Watchlist;
    public portfolios: Portfolio[] = [];
    public portfolioSum: PortfolioSum = new PortfolioSum();
}
