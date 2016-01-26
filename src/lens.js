'use strict';

const {tagged} = require('daggy');
const {Tuple} = require('fantasy-tuples');
const {constant, identity} = require('fantasy-combinators');

const Shop = require('./internal/shop');

const lens_ = (to) => (pab) => {
    return pab.first().dimap(to, (t) => {
        return t._2(t._1);
    });
};

const lens = (get, set) => lens_((s) => {
    return Tuple(get(s), (b) => set(s, b));
});

const withLens = (l, f) => {
    const x = l(Shop(identity, constant(identity)));
    return f(x.x, x.y);
};

const cloneLens = (l) => withLens(l, (x, y) => (p) => lens(x, y)(p));

module.exports = { lens, lens_ };