'use strict';

const {tagged} = require('daggy');
const {Tuple} = require('fantasy-tuples');

const Re = tagged('x');

Re.prototype.run = function() {
    return this.x;
};

Re.prototype.dimap = function(f, g) {
    return Re(this.x.dimap(g, f));
};

module.exports = Re;