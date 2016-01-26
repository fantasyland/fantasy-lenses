const { view } = require('./src/getter');
const { over, set: set } = require('./src/setter');
const { lens, lens_ } = require('./src/lens');

module.exports = { lens, lens_, view, over, set: set };