'use strict';

const { view } = require('../getter');
const { set: set } = require('../setter');

const identity = l => eq => (k, v) => {
    const g = view(l);
    const s = set(l);

    const a = s(g(k), k);
    return eq(k, a);
};

const retention = l => eq => (k, v) => {
    const g = view(l);
    const s = set(l);

    const a = g(s(v, k));
    return eq(v, a);
};

const doubleSet = l => eq => (k, v) => {
    const g = view(l);
    const s = set(l);

    const a = g(s(v, s(v, k)));
    return eq(v, a);
};

module.exports = { identity
                 , retention
                 , doubleSet 
                 };