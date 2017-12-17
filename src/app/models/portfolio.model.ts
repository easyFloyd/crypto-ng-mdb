import { CoinItem } from './coinitem.model';
import { CashFlow } from './cashflow.model';

declare var _cc: any;

export class Portfolio {
    public CoinItems: CoinItem[] = [];
    public CashFlowItems: CashFlow[] = [];

    public portfolioValue = 0;
    public investment = 0;
    public profit = 0;

    constructor(
        public portfolioId: number, public name: string
    ) {}

    get headerText() {
        return this.name + ' (' + _cc.utils.toCurrencyString(this.portfolioValue) + ')';
    }

    get valueText() {
        return  _cc.utils.toCurrencyString(this.portfolioValue);
    }

    get profitText() {
        return  _cc.utils.toCurrencyString(this.investment);
    }
}
