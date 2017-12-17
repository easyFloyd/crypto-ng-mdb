import { Resolve } from '@angular/router/src/interfaces';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { NavigationService } from '../navigation.service';

@Injectable()
export class WatchlistItemResolver implements Resolve<string> {

    constructor(private navigationService: NavigationService) {}

    resolve(): string | Observable<string> | Promise<string> {
        return this.navigationService.currentWatchlistItemSymbol;
    }

}
