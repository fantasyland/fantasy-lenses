const { extend, singleton } = require('fantasy-helpers');

const getter = require('./src/getter');
const setter = require('./src/setter');
const lens = require('./src/lens');
const iso = require('./src/iso');

const tuple = require('./src/lens/tuple');

const lensʹ = require('./src/laws/lens');

const laws = singleton('laws', extend({}, lensʹ));

function merge(obj) {
    const go = (x, y) => y.length < 1 ? x : extend(x, go(y[0], y.slice(1)));
    return go(obj, [].slice.call(arguments, 1));
}

module.exports = merge(laws, lens, getter, setter, iso, tuple);