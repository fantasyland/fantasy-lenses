'use strict';

const { Tuple } = require('fantasy-tuples');
const { dimap, first } = require('fantasy-profunctors');
const { curry } = require('fantasy-helpers');

const lensʹ = curry((to, pab) => {
    return dimap(to, t => t._2(t._1), first(pab));
});

const lens = curry((getter, setter) => lensʹ(s => {
    return Tuple(getter(s), b => setter(b, s));
}));

module.exports = { lensʹ
                 , lens
                 };