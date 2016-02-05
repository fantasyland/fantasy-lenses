'use strict';

const λ = require('./lib');
const { laws: { identity:identity
              , retention:retention
              , doubleSet:doubleSet 
              }
      , _1
      , _2
      } = require('../fantasy-lenses');

function testLensTupleLaws(f) {
    return lens => λ.check(f(lens)(λ.equals), [λ.tupleOf(String, λ.AnyVal), λ.AnyVal]);
}

exports._1 = {
    'identity': testLensTupleLaws(identity)(_1),
    'retention': testLensTupleLaws(retention)(_1),
    'doubleSet': testLensTupleLaws(doubleSet)(_1)
};

exports._2 = {
    'identity': testLensTupleLaws(identity)(_2),
    'retention': testLensTupleLaws(retention)(_2),
    'doubleSet': testLensTupleLaws(doubleSet)(_2)
};