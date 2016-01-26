'use strict';

const {tagged} = require('daggy');
const {Tuple} = require('fantasy-tuples');

const Shop = tagged('x', 'y');

Shop.prototype.dimap = function(f, g) {
    return Shop( (x) => this.x(f(x))
               , (y) => (s) => g(this.y(f(s))(y))
               );
};

Shop.prototype.first = function() {
    return Shop( (x) => this.x(x.x)
               , (y) => (s) => Tuple(this.y(x.x)(s), y.y)
               );
};

Shop.prototype.second = function() {
    return Shop( (x) => this.x(x.y)
               , (y) => (s) => Tuple(y.x, this.y(y.x)(s))
               );
};

module.exports = Shop;