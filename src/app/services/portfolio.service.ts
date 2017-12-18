import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Portfolio } from '../models/portfolio.model';
import { CoinDataService } from './coindata.service';

@Injectable()
export class PortfolioService {

    constructor(private userService: UserService, private coinDataService: CoinDataService) {}

    getUserPortfolios() {
        const currentUser = this.userService.getCurrentUser();
        if (currentUser != null) {
            return currentUser.portfolios;
        } else {
            return [];
        }
    }

    refreshPortfolio(portfolio: Portfolio) {
        this.coinDataService.refreshCoins(portfolio.CoinItems).then(() => {
            this.calculatePortFolioValue(portfolio);
            this.calculateInvestment(portfolio);
            this.calculateProfit(portfolio);
        });
    }

    refreshUserPortfolios() {
        this.getUserPortfolios().forEach(portfolio => {
            this.refreshPortfolio(portfolio);
          });
    }

    private calculatePortFolioValue(portfolio: Portfolio) {
        let pValue = 0;
        portfolio.CoinItems.forEach(coin => { pValue += coin.value_usd; });
        portfolio.portfolioValue = pValue;
    }

    private calculateInvestment(portfolio: Portfolio) {
        let invValue = 0;
        portfolio.CoinItems.forEach(coin => { invValue += coin.amount; });
        portfolio.investment = invValue;
    }

    private calculateProfit(portfolio: Portfolio) {
        portfolio.profit = portfolio.portfolioValue - portfolio.investment;
        portfolio.profitPercent = portfolio.investment === 0 ?
            100 :
            portfolio.profit / (portfolio.investment / 100);
    }

}
