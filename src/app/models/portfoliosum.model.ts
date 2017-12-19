export class PortfolioSum {
    public value = 0;
    public investment = 0;

    get profit(): number {
        return this.value - this.investment;
    };

    get profitPercent(): number {
        return this.investment === 0 ?
            100 :
            this.profit / (this.investment / 100);
    };
}
