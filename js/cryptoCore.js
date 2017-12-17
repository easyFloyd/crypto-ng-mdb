(function (global, jQuery) {
   // Make a module
//   var _cc = (function (name) {
//      var root = typeof window !== 'undefined' ? window : global,
//         had = Object.prototype.hasOwnProperty.call(root, name),
//         prev = root[name], me = root[name] = {};
//      if (typeof module !== 'undefined' && module.exports) {
//         module.exports = me;
//      }
//      me.noConflict = function () {
//         if (root[name] === me) {
//            root[name] = had ? prev : undefined;
//            if (!had) {
//               try {
//                  delete root[name];
//               } catch (ex) {
//               }
//            }
//         }
//         return me;
//      };
//      return me;
//   }());
   // Attach methods to myModule...
    
    var _cc = function(coinId) {
        return new _cc.init(coinId);
    };
    
    _cc.VERSION = '0.1';
    
    _cc.utils = {/**/};

    var cmcApi =  {
        baseUrl: 'https://api.coinmarketcap.com/v1/ticker/',
        coinImgUrl: 'https://files.coinmarketcap.com/static/img/coins/' 
    };
    
    _cc.prototype = {
        // get the specified coin details
        loadCoin: function(callback) {
            var self = this;
            if(!jQuery){
                throw 'jQuery not loaded'; 
            }
            var refLink = cmcApi.baseUrl + self.coinId + "/";
            jQuery.get(refLink).done( function (data) {
                var coinObj = data[0];
                for (var property in coinObj) {
                    if (coinObj.hasOwnProperty(property)) {
                        self.coin[property] = coinObj[property];
                    }
                }
                self.coin.isInitialized = true;
                if (callback){
                    if(jQuery.isFunction(callback)){
                        callback();
                    } else {
                        console.log('The callback is not a function!');
                    }
                }
            }).fail(function(xhr, status, error) {
                console.log('Cannot load the coin: ' + self.coinId);
            });
            return this;
        },
        // get all tickers from CMP
        tickers: function(callback) {
            var self = this;
            if(!jQuery){
                throw 'jQuery not loaded'; 
            }
            var refLink = cmcApi.baseUrl;
            jQuery.get(refLink).done( function (data) {
                if (callback){
                    if(jQuery.isFunction(callback)){
                        callback(data);
                    } else {
                        console.log('The callback is not a function!');
                    }   
                }
            }).fail(function(xhr, status, error) {
                console.log('Cannot load the tickers.');
            });
            return this;
        }
    };
    
    var _utils = {
        toLocaleString: function (value) {
            if (value == null) {
                return '';
            } else {
                return value.toLocaleString().replace(/\D\d\d$/, '');
            }
        },
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
    _cc.init = function(coinId) {
        var self = this;
        
        if(coinId){
            self.coinId = coinId;
            self.coin = {
                id: coinId,
                isInitialized: false,
                img_16x16_src: cmcApi.coinImgUrl + '16x16/' + coinId + '.png',
                img_64x64_src: cmcApi.coinImgUrl + '64x64/' + coinId + '.png',
            }
        }
        
    };
    
    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    _cc.init.prototype = _cc.prototype;
    
    // attach our _cc to the global object
    global._cc  = _cc;
}(window, jQuery));