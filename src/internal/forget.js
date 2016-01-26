'use strict';

const {tagged} = require('daggy');
const {compose} = require('fantasy-combinators');

const Forget = tagged('x');

Forget.prototype.run = function() {
    return this.x;
};

Forget.prototype.dimap = function(f, g) {
    return Forget(compose(this.x)(f));
};

Forget.prototype.first = function() {
    return Forget(compose(this.x)(x => x._1));
};

Forget.prototype.second = function() {
    return Forget(compose(this.x)(x => x._2));
};

module.exports = Forget;