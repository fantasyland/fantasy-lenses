'use strict';

const { adapters: { nodeunit: λ } } = require('fantasy-check');
const { Tuple } = require('fantasy-tuples');
const { isInstanceOf, getInstance } = require('fantasy-helpers');
const environment = require('fantasy-environment');

function tupleOf(a, b) {
    const self = getInstance(this, tupleOf);
    self._1 = a;
    self._2 = b;
    return self;
}

const isTuple0f = isInstanceOf(tupleOf);

const env = environment()
    .property('tupleOf', tupleOf)
    .method('arb', isTuple0f, x => Tuple(λ.arb(x._1), λ.arb(x._2)));


module.exports = λ.envAppend(env);