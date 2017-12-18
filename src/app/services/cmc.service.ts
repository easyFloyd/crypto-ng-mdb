
export class CmcService {
    private readonly _cmcApi =  {
        baseUrl: 'https://api.coinmarketcap.com/v1/ticker/',
        coinImgUrl: 'https://files.coinmarketcap.com/static/img/coins/'
    };

    constructor() {}

    private baseHttpRequest(obj: any) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(obj.method || 'GET', obj.url);
            if (obj.headers) {
                Object.keys(obj.headers).forEach(key => {
                    xhr.setRequestHeader(key, obj.headers[key]);
                });
            }
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(obj.body);
        });
    };

    private request(url: string) {
        const self = this;
        return new Promise(function(resolve, reject) {
            self.baseHttpRequest({url: url}).then((data: string) => {
                const jsonData = JSON.parse(data);
                if (jsonData.Response === 'Error') {
                    return reject(jsonData.Message);
                } else {
                    return resolve(jsonData);
                }
            }).catch(errorMsg => {
                return reject('Error in the requested url (' + url + '): ' + errorMsg);
            })
        });
    };

    tickers() {
        const refLink = this._cmcApi.baseUrl;
        return this.request(refLink);
    };

    loadCoin(coinId: string) {
        const refLink = this._cmcApi.baseUrl + coinId + '/';
        return this.request(refLink).then((data) => {
            const coinObj = data[0];
            const coin =  {
                id: coinId,
                img_16x16_src: this._cmcApi.coinImgUrl + '16x16/' + coinId + '.png',
                img_64x64_src: this._cmcApi.coinImgUrl + '64x64/' + coinId + '.png',
            };
            for (const property in coinObj) {
                if (coinObj.hasOwnProperty(property)) {
                    coin[property] = coinObj[property];
                }
            }
            return coin;
        });
    }

    loadCoins(coinIdArr: string[]) {
        const resolveArr = [];
        coinIdArr.forEach((coinId) => {
            resolveArr.push(this.loadCoin(coinId));
        });
        return Promise.all(resolveArr);
    }
}
