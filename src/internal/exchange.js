'use strict';

const { tagged } = require('daggy');

const Exchange = tagged('f', 'g');

Exchange.prototype.dimap = function(f, g) {
    return Exchange( x => this.f(f(x))
                   , y => g(this.g(y))
                   );
};

module.exports = Exchange;