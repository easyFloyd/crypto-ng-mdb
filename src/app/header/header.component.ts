import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { PanelType } from '../enums/paneltype.model'

@Component({
  selector: 'mdb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [NavigationService]
})
export class HeaderComponent implements OnInit {

    PanelType = PanelType;

    constructor(private navigationService: NavigationService) {}

    ngOnInit() {}

    onSelect(panelType: PanelType) {
        switch (panelType) {
            case PanelType.Watchlist:
                this.navigationService.navigateToWatchlist();
                break;
            case PanelType.PortfolioList:
                this.navigationService.navigateToPortfolioList();
                break;
        }
    }

    onRefresh() {
        this.navigationService.onRefresh();
    }

}
