import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { WatchlistService } from './watchlist.service';
import { PortfolioService } from './portfolio.service';
import { PanelType } from '../enums/paneltype.model';

@Injectable()
export class NavigationService {
    private _selectedPanel = PanelType.Watchlist;
    private _currentPortfolioId: number;
    private _currentWatchlistItemSymbol: string;

    constructor(private router: Router, private watchlistService: WatchlistService, private portfolioService: PortfolioService) {}

    get selectedPanel() {
        return this._selectedPanel;
    }

    get currentPortfolioId() {
        return this._currentPortfolioId;
    }

    get currentWatchlistItemSymbol() {
        return this._currentWatchlistItemSymbol;
    }

    navigateToWatchlist() {
        this._selectedPanel = PanelType.Watchlist;
        this.router.navigate(['watchlist']);
    }

    navigateToPortfolioList() {
        this._selectedPanel = PanelType.PortfolioList;
        this.router.navigate(['portfolios']);
    }

    navigateToPortfolio(portfolioId: number) {
        this._selectedPanel = PanelType.PortfolioItem;
        this._currentPortfolioId = portfolioId;
        this.router.navigate(['portfolio-item']);
    }

    navigateToPortfolioItem() {}

    navigateToWatchlistItem(symbol: string) {
        this._selectedPanel = PanelType.WatchlistItem;
        this._currentWatchlistItemSymbol = symbol;
        this.router.navigate(['watchlist-item']);
    }

    navigateToNewItem() {}

    onRefresh() {
        switch (this._selectedPanel) {
            case PanelType.PortfolioList:
            this.portfolioService.refreshUserPortfolios();
              break;
            case PanelType.Watchlist:
              this.watchlistService.refreshWatchlist();
              break;
            default:
              break;
        }
    }
}
