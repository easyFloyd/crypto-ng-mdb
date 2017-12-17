import { Component, OnInit } from '@angular/core';
import { Watchlist } from 'app/models/watchlist.model';
import { WatchlistService } from 'app/services/watchlist.service';

@Component({
  selector: 'mdb-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  watchlist: Watchlist;

  constructor(private watchlistService: WatchlistService) { }

  ngOnInit() {
    this.watchlist = this.watchlistService.getUserWatchlist();
    this.refreshWatchList();
  }

  refreshWatchList() {
    this.watchlistService.refreshWatchlist();
  }
}
