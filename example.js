'use strict';

const { constant } = require('fantasy-combinators');
const { _1, view, over, set: set, lens } = require('./fantasy-lenses');
const Forget = require('./src/internal/forget');
const { Strong, Profunctor } = require('fantasy-profunctors');
const { Tuple } = require('fantasy-tuples');
const { Unit } = require('fantasy-monoids');


const prop = k => o => o[k];
const assoc = k => (v, o) => {
    o[k] = v;
    return o;
};

const l = lens(prop('x'), assoc('x'));

console.log('View', view(l, {x:1}));

console.log('Over', over(l, constant(2), {x:1}));

console.log('Set', set(l, 2, {x:1}));

console.log('---------');

console.log(view(_1)(Tuple(1, 2)));

console.log(over(_1)(constant({x:1}), Tuple({x:2}, {x:3})));

console.log(set(_1)({x:1}, Tuple({x:2}, {x:3})));
