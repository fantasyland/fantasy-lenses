'use strict';

const { adapters: { nodeunit: λ } } = require('fantasy-check');
const { isInstanceOf } = require('fantasy-helpers');
const { equals } = require('fantasy-equality');
const { constant } = require('fantasy-combinators');
const { Unit } = require('fantasy-monoids');

const environment = require('fantasy-environment');

const p = require('fantasy-land/laws/profunctor');

const Re = require('../../src/internal/re');

const env = environment()
    .method('equals', isInstanceOf(Re), (x, y) => equals(x.run(Unit), y.run(Unit)));

const λʹ = λ.envAppend(env);

exports.profunctor = {
    'identity': λʹ.law(p.identity)(x => Re(constant(x))),
    'composition': λʹ.law(p.composition)(x => Re(constant(x)))
};