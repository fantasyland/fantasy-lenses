'use strict';

const { view, iso } = require('../../fantasy-lenses');

const identity = l => eq => (k, v) => {
    // TODO:
    return eq(v, a);
};

const reverseIdentity = l => eq => (k, v) => {
    // TODO:
    return eq(v, a);
};

module.exports = { identity
                 , reverseIdentity 
                 };