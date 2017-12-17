import { Component, OnInit } from '@angular/core';
import { Portfolio } from 'app/models/portfolio.model';
import { PortfolioService } from 'app/services/portfolio.service';
import { NavigationService } from 'app/services/navigation.service';

@Component({
  selector: 'mdb-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss']
})
export class PortfolioListComponent implements OnInit {
  portfolioList: Portfolio[];
  constructor(private portfolioService: PortfolioService, private navigationService: NavigationService) { }

  ngOnInit() {
    this.portfolioList = this.portfolioService.getUserPortfolios();
    this.refreshPortfolios();
  }

  refreshPortfolios() {
    this.portfolioService.refreshUserPortfolios();
  }

  onSelect(portfolioId: number) {
    this.navigationService.navigateToPortfolio(portfolioId);
  }
}
