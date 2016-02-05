'use strict';

const { tagged } = require('daggy');
const { dimap } = require('fantasy-profunctors');

const Re = tagged('run');

Re.prototype.dimap = function(f, g) {
    return Re(x => this.run(dimap(g, f, x)));
};

module.exports = Re;