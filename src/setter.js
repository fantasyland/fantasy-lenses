'use strict';

const { compose, constant } = require('fantasy-combinators');
const { Strong } = require('fantasy-profunctors');

const over = (l) => compose(l)(Strong);

const set = (l) => compose(over(l))(constant);

module.exports = { over, set: set };