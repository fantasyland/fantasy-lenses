'use strict';

const {extend, singleton} = require('fantasy-helpers');
const {lens, view, over, set: set} = require('./fantasy-lenses');

const prop = (x) => (o) => o[x];

function assoc(x) {
    return (v, o) => {
        console.log(">>", v, o);
        return extend(o, singleton(x, v));
    };
}

const a = lens(prop('x'), assoc('x'));

console.log(view(a)({x: 1}));
console.log(over(a)({x: 1}));