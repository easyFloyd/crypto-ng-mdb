(function (global, jQuery) {
    
    var _cc = function() {
        return new _cc.init();
    };
    
    _cc.VERSION = '0.2';
    
    _cc.utils = {/**/};

    var cmcApi =  {
        BaseImageUrl: 'https://www.cryptocompare.com',
        requests: {
            coinlist: 'https://min-api.cryptocompare.com/data/all/coinlist',
            price: 'https://min-api.cryptocompare.com/data/price',
            pricemulti: 'https://min-api.cryptocompare.com/data/pricemulti',
            pricemultifull: 'https://min-api.cryptocompare.com/data/pricemultifull'
        }
    };
    
    var coinlist = [];
    
    var coinBaseMapper = function(coinData) {
        return {
            Id: coinData.Id,
            Symbol: coinData.Symbol,
            CoinName: coinData.CoinName,
            FullName: coinData.FullName,
            ImageUrl: cmcApi.BaseImageUrl + coinData.ImageUrl,
            Url: coinData.Url
        }
    }
    
    var coinPriceMapper = function(priceData) {
        return {
            Symbol: priceData.FROMSYMBOL,
            ToSymbol: priceData.TOSYMBOL,
            Price: priceData.PRICE,
            Open_24h: priceData.OPEN24HOUR,
            High_24h: priceData.HIGH24HOUR,
            Low_24h: priceData.LOW24HOUR,
            Change_24h: priceData.CHANGE24HOUR,
            Change_pct_24h: priceData.CHANGEPCT24HOUR,
            MarketCap: priceData.MKTCAP
        }
    }
    
    var request = function(url, mapper) {
        return new Promise(function(resolve, reject) {
            requestwoj({url: url}).then((data) => {
                const jsonData = JSON.parse(data);
                if (jsonData.Response === 'Error') {
                    return reject(jsonData.Message);
                } else {
                    return resolve(mapper(jsonData));
                }
            }).catch(errorMsg => {
                return reject("Error in the requested url (" + url + "): " + errorMsg);
            })
        });
    }
    let requestwoj = obj => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(obj.method || "GET", obj.url);
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
    
    _cc.prototype = {
        // get the specified coin details
        getCoin: function(symbol) {
            var self = this;
            if (coinlist.length === 0) {
                return self.tickers().then((data) => {
                    return data.find((coin) => {return coin.Symbol === symbol;})
                });
            } else {
                return new Promise((resolve, reject) => resolve(
                    coinlist.find((coin) => {return coin.Symbol === symbol;})
                )); 
            }
        },
        getPriceMultiFull: function(symbolArr, toSymbol) {
            var refLink = cmcApi.requests.pricemultifull + '?fsyms=' + symbolArr.join(',') + '&tsyms=' + toSymbol;
            return request(refLink, (data) => {
                var resultArr =  [];
                symbolArr.forEach( (symbol) => {
                    const rawData = data.RAW[symbol];
                    if(rawData) {
                        resultArr.push(coinPriceMapper(rawData[toSymbol]));
                    } else {
                        console.log('Cannot find symbol in data: ' + symbol);   
                    }
                });
                return resultArr;
            });
        },
        // get all tickers from CMP
        tickers: function() {
            if (coinlist.length === 0){
                var refLink = cmcApi.requests.coinlist;
                return request(refLink, (data) => {
                    for(var key in data.Data) {
                        if (data.Data.hasOwnProperty(key)) {
                            coinlist.push(coinBaseMapper(data.Data[key]));
                        }
                    }
                    return coinlist;
                });
            }
            
            return new Promise((resolve, reject) => resolve(coinlist)); 
        }
    };
    
    var _utils = {
        // 1234.12 => 1,234
        toLocaleString: function (value) {
            if (value == null) {
                return '';
            } else {
                return value.toLocaleString().replace(/\D\d\d$/, '');
            }
        },
        // 1234.12 => 1,234.12
        seperateThousands: function (nStr) {
            nStr += '';
            var x = nStr.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        },
        // 1234.12 => $ 1,234.12
        toCurrencyString: function(value, currencySymbol, after) {
            if (value == null || isNaN(value)) {
                return '';
            } else {
                var cs = currencySymbol === undefined ? '$' : currencySymbol;
                var n = Math.round(value * 100) / 100;
                return after ? this.seperateThousands(n) + ' ' + cs : cs + ' ' + this.seperateThousands(n);
            }
        }
    };
    
    jQuery.extend(_cc.utils, _utils);
    
    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    _cc.init = function() {};
    
    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    _cc.init.prototype = _cc.prototype;

    // attach our _cc to the global object
    global._cc  = _cc;
}(window, jQuery));
