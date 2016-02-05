'use strict';

const λ = require('./lib');
const { _1, _2, view, iso } = require('../fantasy-lenses');
const { equals } = require('fantasy-equality');
const { Strong } = require('fantasy-profunctors');

const negate = x => {
    const f = n => n === 0 ? 0 : -n;
    return iso(f, f)(x);
};

const string = x => {
    const f = n => n.toString();
    const g = n => parseFloat(n, 10);
    return iso(f, g)(x);
};

exports.view = {
    'view first tuple argument using lens': λ.check(
        x => equals(x._1, view(_1)(x)),
        [λ.tupleOf(λ.AnyVal, λ.AnyVal)]
    ),
    'view second tuple argument using lens': λ.check(
        x => equals(x._2, view(_2)(x)),
        [λ.tupleOf(λ.AnyVal, λ.AnyVal)]
    ),
    'view iso using negate lens': λ.check(
        x => {
            return equals(-x, view(negate)(x));
        },
        [Number]
    ),
    'view iso using string lens': λ.check(
        x => equals(x.toString(), view(string)(x)),
        [Number]
    )
};