'use strict';

const { tagged } = require('daggy');
const { dimap } = require('fantasy-profunctors');

const iso = dimap;

module.exports = { iso
                 };