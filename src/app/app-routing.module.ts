import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { WatchlistComponent } from './watchlist/watchlist.component';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import { PortfolioItemComponent } from './portfolio-list/portfolio/portfolio-item/portfolio-item.component';
import { PortfolioResolver } from './services/resolvers/portfolio-resolver.service';
import { WatchlistItemComponent } from './watchlist/watchlist-item/watchlist-item.component';
import { WatchlistItemResolver } from './services/resolvers/watchlist-item-resolver.service';

const appRoutes: Routes = [
    {path: '', redirectTo: 'watchlist', pathMatch: 'full' },
    {path: 'watchlist', component: WatchlistComponent},
    {path: 'portfolios', component: PortfolioListComponent},
    {path: 'portfolio-item', component: PortfolioItemComponent, resolve: {portfolioId: PortfolioResolver}},
    {path: 'watchlist-item', component: WatchlistItemComponent, resolve: {symbol: WatchlistItemResolver}}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
