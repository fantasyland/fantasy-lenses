'use strict';

const { foldOf } = require('./Fold');
const { Unit } = require('fantasy-monoids');

const view = foldOf(Unit);

module.exports = { view };