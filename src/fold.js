'use strict';

const { identity } = require('fantasy-combinators');
const { Strong } = require('fantasy-profunctors');
const { curry } = require('fantasy-helpers');
const Forget = require('./internal/forget');

const foldOf = M => {
    const forget = Forget(M);
    return curry((p, s) => {
        return p(forget(identity)).runForget(s);
    });
};

module.exports = { foldOf };