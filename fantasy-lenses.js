var Lens = require('./src/lens'),
    PartialLens = require('./src/partial-lens');

if (typeof module != 'undefined')
    module.exports = {
        Lens: Lens,
        PartialLens: PartialLens
    };
