'use strict';

const { adapters: { nodeunit: λ } } = require('fantasy-check');
const { isInstanceOf } = require('fantasy-helpers');
const { equals } = require('fantasy-equality');
const { constant } = require('fantasy-combinators');
const { Additive } = require('fantasy-monoids');

const environment = require('fantasy-environment');

const p = require('fantasy-land/laws/profunctor');

const Forget = require('../../src/internal/forget');
const Forgetʹ = Forget(Additive);

const env = environment()
    .method('equals', isInstanceOf(Forgetʹ), (x, y) => equals(x.runForget(), y.runForget()));

const λʹ = λ.envAppend(env);

exports.profunctor = {
    'identity': λʹ.law(p.identity)(x => Forgetʹ(constant(x))),
    'composition': λʹ.law(p.composition)(x => Forgetʹ(constant(x)))
};