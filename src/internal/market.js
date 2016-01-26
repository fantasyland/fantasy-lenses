'use strict';

const {tagged} = require('daggy');
const {Tuple} = require('fantasy-tuples');
const {identity} = require('fantasy-combinators');
const Either = require('fantasy-eithers');

const Market = tagged('f', 'g');

Market.prototype.dimap = function(f, g) {
    return Market( (x) => g(this.f(x))
                 , (y) => this.g(f(y)).dimap(g, identity)
                 );
};

Market.prototype.map = function(f) {
    return Market( (x) => f(this.f(x))
                 , (y) => this.g(y).dimap(f, identity)
                 );
};

Market.prototype.left = function() {
    return Market( (x) => Either.Left(this.f(x))
                 , (y) => y.cata({ Left: (x) => this.g(x).dimap(Either.Left, identity)
                                 , Right: (x) => Either.Left(Either.Right(x))
                                 });
                 );
};

Market.prototype.right = function() {
    return Market( (x) => Either.Right(this.f(x))
                 , (y) => y.cata({ Left: (x) => Either.Left(Either.Left(x))
                                 , Right: (x) => this.g(x).dimap(Either.Right, identity)
                                 });
                 );
};

module.exports = Market;