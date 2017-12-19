import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Portfolio } from '../models/portfolio.model';
import { CoinDataService } from './coindata.service';
import { PortfolioSum } from 'app/models/portfoliosum.model';

@Injectable()
export class PortfolioService {

    constructor(private userService: UserService, private coinDataService: CoinDataService) {}

    getUserPortfolios(): Portfolio[] {
        const currentUser = this.userService.getCurrentUser();
        if (currentUser != null) {
            return currentUser.portfolios;
        } else {
            return [];
        }
    }

    getUserPortfolioSum(): PortfolioSum {
        const currentUser = this.userService.getCurrentUser();
        if (currentUser != null) {
            return currentUser.portfolioSum;
        } else {
            return new PortfolioSum();
        }
    }

    refreshPortfolio(portfolio: Portfolio): Promise<void> {
        return this.coinDataService.refreshCoins(portfolio.CoinItems).then(() => {
            this.calculatePortFolioValue(portfolio);
            this.calculateInvestment(portfolio);
            this.calculateProfit(portfolio);
        });
    }

    refreshUserPortfolios() {
        const refreshedPortofolios: Promise<void>[] = [];
        this.getUserPortfolios().forEach(portfolio => {
            refreshedPortofolios.push(this.refreshPortfolio(portfolio));
          });
        Promise.all(refreshedPortofolios).then(() => {
            const portfolioSum = this.getUserPortfolioSum();
            portfolioSum.investment = portfolioSum.value = 0;
            this.getUserPortfolios().forEach(portfolio => {
                portfolioSum.value += portfolio.portfolioValue;
                portfolioSum.investment += portfolio.investment;
            });
        });
    }

    private calculatePortFolioValue(portfolio: Portfolio) {
        let pValue = 0;
        portfolio.CoinItems.forEach(coin => { pValue += coin.value_usd; });
        portfolio.portfolioValue = pValue;
    }

    private calculateInvestment(portfolio: Portfolio) {
        let invValue = 0;
        portfolio.CashFlowItems.forEach(cashFlow => { invValue += cashFlow.amount; });
        portfolio.investment = invValue;
    }

    private calculateProfit(portfolio: Portfolio) {
        portfolio.profit = portfolio.portfolioValue - portfolio.investment;
        portfolio.profitPercent = portfolio.investment === 0 ?
            100 :
            portfolio.profit / (portfolio.investment / 100);
    }

}
