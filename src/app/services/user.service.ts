import { User } from '../models/user.model';
import { Watchlist } from '../models/watchlist.model';
import { Portfolio } from '../models/portfolio.model';
import { CoinItem } from '../models/coinitem.model';

export class UserService {
    private users: User[] = [];

    private options = {
        jaxx : {
            name: 'JAXX Portfolio',
            id: 1,
            cashflow: [
                {date: '2017.07.28', amount: 325},
                {date: '2017.09.27', amount: 375},
            ],
            portfolioItems: [
                { id: 'bitcoin', amount: 0.09357638 },
                { id: 'bitcoin-cash', amount: 0.03446294 },
                { id: 'ethereum', amount: 0.87961457 },
                { id: 'neo', amount: 4 },
                { id: 'gas', amount: 0.09246704 },
            ]
        },
        newwave : {
            name: 'new_wave',
            id: 2,
            cashflow: [
                {date: '2017.11.30', amount: 760}
            ],
            portfolioItems: [
                { id: 'bitcoin', amount: 0.0734 }
            ]
        },
        watchlist : {
            name: 'Watchlist',
            cashflow: [],
            portfolioItems: [
                { id: 'lisk', amount: 0.0 },
                { id: 'litecoin', amount: 0.0 },
                { id: 'omisego', amount: 0.0 },
                { id: 'iota', amount: 0.0 },
            ]
        }
    };

    constructor() {
        const defaultUser: User = new User();
        defaultUser.id = 1;

        defaultUser.watchList = new Watchlist('Watchlist');
        this.setUser(defaultUser);
        this.users.push(defaultUser);
    }

    private setUser(user: User) {

        Object.keys(this.options).forEach(key => {
            const val = this.options[key];

            let pModel;
            pModel = (key === 'watchlist' ? user.watchList : new Portfolio(val.id, val.name) );

            val.portfolioItems.forEach(element => {
                const nw = new CoinItem(element.id);
                nw.value = element.amount;
                pModel.CoinItems.push(nw);
                if (pModel !== user.watchList && !user.watchList.CoinItems.some(x => x.id === element.id)) {
                    user.watchList.CoinItems.push(nw);
                }
            });

            if (pModel !== user.watchList) {
                val.cashflow.forEach(element => {
                    pModel.CashFlowItems.push(element);
                });
                user.portfolios.push(pModel);
            }
        });
    }

    getUserById(id: number): User {
        return this.users.find(x => x.id === id);
    }

    getCurrentUser(): User {
        return this.getUserById(1);
    }
}
