'use strict';

const {identity} = require('fantasy-combinators');
const Forget = require('./internal/forget');

const view = (l) => {
    return l(Forget(identity)).run();
};

module.exports = { view };