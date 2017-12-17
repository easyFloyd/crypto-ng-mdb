import { Resolve } from '@angular/router/src/interfaces';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { NavigationService } from '../navigation.service';

@Injectable()
export class PortfolioResolver implements Resolve<number> {

    constructor(private navigationService: NavigationService) {}

    resolve(): number | Observable<number> | Promise<number> {
        return this.navigationService.currentPortfolioId;
    }

}
