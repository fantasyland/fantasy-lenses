'use strict';

const { tagged } = require('daggy');
const { compose } = require('fantasy-combinators');
const Const = require('fantasy-consts');

const Forget = M => {
    const Forget = tagged('runForget');
    const constM = Const(M);

    Forget.prototype.dimap = function(f, g) {
        return Forget(x => this.runForget(f(x)));
    };

    Forget.prototype.first = function() {
        return Forget(x => this.runForget(x._1));
    };

    Forget.prototype.second = function() {
        return Forget(x => this.runForget(x._2));
    };

    Forget.prototype.left = function() {
        return Forget(x => x.fold(this.runForget, M.empty));
    };

    Forget.prototype.right = function() {
        return Forget(x => x.fold(M.empty, this.runForget));
    };

    Forget.prototype.wander = function(f) {
        return Forget(s => f(constM.of, x => constM(this.runForget(x)), s).x);
    };

    return Forget;
};

module.exports = Forget;