'use strict';

const { constant } = require('fantasy-combinators');
const { curry } = require('fantasy-helpers');

const over = curry((l, f, s) => l(f)(s)); 

const set = curry((l, b, s) => over(l, constant(b), s));

const map = curry((f, x) => x.map(f));

module.exports = { over
                 , set: set
                 , map
                 };