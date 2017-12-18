export class TextHelper {

    static seperateThousands(n: number): string {
        const nStr = n + '';
        const x = nStr.split('.');
        let x1 = x[0];
        const x2 = x.length > 1 ? '.' + x[1] : '';
        const rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    static toCurrencyString(value: number, currencySymbol = '$', after = false): string {
        if (value == null) {
            return '';
        } else {
            const n = Math.round(value * 100) / 100;
            const seperated = this.seperateThousands(n);
            return after ? seperated + ' ' + currencySymbol : currencySymbol + ' ' + seperated;
        }
    }

    static toLocaleString(value: number) {
        if (value == null) {
            return '';
        } else {
            return value.toLocaleString().replace(/\D\d\d$/, '');
        }
    }

    static toPercentString(value: number): string {
        return this.toLocaleString(value) + '%';
    }
}
