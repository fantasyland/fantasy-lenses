const {tagged} = require('daggy');
const {compose} = require('fantasy-combinators');

const Option = require('fantasy-options');
const Store = require('fantasy-stores');
const Lens = require('./lens');

const PartialLens = tagged('run');

PartialLens.id = () => {
    return PartialLens((target) => {
        return Option.Some(Lens.id().run(target));
    });
};
PartialLens.prototype.compose = function(b) {
    return PartialLens((target) => {
        return b.run(target).chain((c) => {
            return this.run(c.get()).map((d) => {
                return Store(compose(c.set)(d.set), d.get);
            });
        });
    });
};
PartialLens.prototype.andThen = function(b) {
    return b.compose(this);
};
PartialLens.objectLens = function(property) {
    const totalLens = Lens.objectLens(property);
    return PartialLens(function(target) {
        return property in target ? Option.Some(totalLens.run(target)) : Option.None;
    });
};
PartialLens.arrayLens = function(index) {
    const totalLens = Lens.arrayLens(index);
    return PartialLens(function(target) {
        return index >= 0 && index < target.length ? Option.Some(totalLens.run(target)) : Option.None;
    });
};

module.exports = PartialLens;
