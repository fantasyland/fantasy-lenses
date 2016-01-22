const λ = require('fantasy-check/src/adapters/nodeunit');
const lens = require('fantasy-check/src/laws/lens');
    
const {identity} = require('fantasy-combinators');
const Identity = require('fantasy-identities');
const {Lens} = require('../fantasy-lenses');

exports.lens = {

    // Lens tests
    'All (Lens)': lens.laws(λ)(Lens.id, identity),
    'Left Identity (Lens)': lens.identity(λ)(Lens.id, identity),
    'Right Identity (Lens)': lens.retention(λ)(Lens.id, identity),
    'Associativity (Lens)': lens.doubleSet(λ)(Lens.id, identity),
};
