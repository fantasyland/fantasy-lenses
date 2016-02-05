'use strict';

const { adapters: { nodeunit: λ } } = require('fantasy-check');
const { isInstanceOf } = require('fantasy-helpers');
const { equals } = require('fantasy-equality');
const { constant } = require('fantasy-combinators');

const environment = require('fantasy-environment');

const p = require('fantasy-land/laws/profunctor');

const Exchange = require('../../src/internal/exchange');

const env = environment()
    .method('equals', isInstanceOf(Exchange), (x, y) => equals(x.f(), y.f()));

const λʹ = λ.envAppend(env);

exports.profunctor = {
    'identity': λʹ.law(p.identity)(x => Exchange(constant(x), constant(x))),
    'composition': λʹ.law(p.composition)(x => Exchange(constant(x), constant(x)))
};