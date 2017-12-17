import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MDBBootstrapModule } from './typescripts/free';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import { PortfolioComponent } from './portfolio-list/portfolio/portfolio.component';
import { PortfolioItemComponent } from './portfolio-list/portfolio/portfolio-item/portfolio-item.component';
import { WatchlistItemComponent } from './watchlist/watchlist-item/watchlist-item.component';
import { HeaderComponent } from './header/header.component';

import { UserService } from 'app/services/user.service';
import { PortfolioService } from 'app/services/portfolio.service';
import { WatchlistService } from 'app/services/watchlist.service';
import { CoinDataService } from 'app/services/coindata.service';
import { NavigationService } from 'app/services/navigation.service';
import { PortfolioResolver } from 'app/services/resolvers/portfolio-resolver.service';
import { WatchlistItemResolver } from 'app/services/resolvers/watchlist-item-resolver.service';
import { AppRoutingModule } from 'app/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    WatchlistComponent,
    PortfolioListComponent,
    PortfolioComponent,
    PortfolioItemComponent,
    WatchlistItemComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    }),
    AppRoutingModule
  ],
  providers: [UserService, PortfolioService, WatchlistService, CoinDataService,
    NavigationService, PortfolioResolver, WatchlistItemResolver],
  bootstrap: [AppComponent],
  schemas:      [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
