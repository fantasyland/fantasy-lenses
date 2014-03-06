var λ = require('fantasy-check/src/adapters/nodeunit'),
    lens = require('fantasy-check/src/laws/lens'),
    
    combinators = require('fantasy-combinators'),
    Identity = require('fantasy-identities'),
    lenses = require('../fantasy-lenses'),

    Lens = lenses.Lens,

    identity = combinators.identity;

exports.lens = {

    // Lens tests
    'All (Lens)': lens.laws(λ)(Lens.id, identity),
    'Left Identity (Lens)': lens.identity(λ)(Lens.id, identity),
    'Right Identity (Lens)': lens.retention(λ)(Lens.id, identity),
    'Associativity (Lens)': lens.doubleSet(λ)(Lens.id, identity),
};
