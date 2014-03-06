var daggy = require('daggy'),
    C = require('fantasy-combinators'),
    Option = require('fantasy-options'),
    Store = require('fantasy-stores'),
    Lens = require('./lens'),
    PartialLens = daggy.tagged('run');

PartialLens.id = function() {
    return PartialLens(function(target) {
        return Option.Some(Lens.id().run(target));
    });
};
PartialLens.prototype.compose = function(b) {
    var a = this;
    return PartialLens(function(target) {
        return b.run(target).chain(function(c) {
            return a.run(c.get()).map(function(d) {
                return Store(
                    C.compose(c.set)(d.set),
                    d.get
                );
            });
        });
    });
};
PartialLens.prototype.andThen = function(b) {
    return b.compose(this);
};
PartialLens.objectLens = function(property) {
    var totalLens = Lens.objectLens(property);
    return PartialLens(function(target) {
        return property in target ? Option.Some(totalLens.run(target)) : Option.None;
    });
};
PartialLens.arrayLens = function(index) {
    var totalLens = Lens.arrayLens(index);
    return PartialLens(function(target) {
        return index >= 0 && index < target.length ? Option.Some(totalLens.run(target)) : Option.None;
    });
};

// Export
if(typeof module != 'undefined')
    module.exports = PartialLens;
