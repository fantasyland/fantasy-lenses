'use strict';

const {tagged} = require('daggy');
const {Tuple} = require('fantasy-tuples');

const Exchange = tagged('f', 'g');

Exchange.prototype.dimap = function(f, g) {
    return Exchange( (x) => this.f(f(x))
                   , (y) => g(this.g(y))
                   );
};

Exchange.prototype.map = function(f) {
    return Exchange( this.f
                   , (x) => f(this.g(x))
                   );
};

module.exports = Exchange;