import { CoinItem } from './coinitem.model';
import { CashFlow } from './cashflow.model';
import { TextHelper } from 'app/utils/TextHelper';

export class Portfolio {
    public CoinItems: CoinItem[] = [];
    public CashFlowItems: CashFlow[] = [];

    public portfolioValue = 0;
    public investment = 0;
    public profit = 0;
    public profitPercent = 0;

    constructor(
        public portfolioId: number, public name: string
    ) {}

    // get headerText() {
    //     return this.name + ' (' + TextHelper.toCurrencyString(this.portfolioValue) + ')';
    // }

    get valueText() {
        return  TextHelper.toCurrencyString(this.portfolioValue);
    }

    get profitText() {
        return  TextHelper.toCurrencyString(this.profit);
    }

    get profitPercentText() {
        return TextHelper.toPercentString(this.profitPercent);
    }
}
