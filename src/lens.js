const {tagged} = require('daggy');
const {identity, constant, compose} = require('fantasy-combinators');
const {extend, singleton} = require('fantasy-helpers');
const Option = require('fantasy-options');
const Store = require('fantasy-stores');

const Lens = tagged('run');

// Methods
Lens.id = () => {
    return Lens((target) => {
        return Store(identity, constant(target));
    });
};
Lens.prototype.compose = function(b) {
    return Lens((target) => {
        const c = b.run(target);
        const d = this.run(c.get());
        return Store(compose(c.set)(d.set), d.get);
    });
};
Lens.prototype.andThen = function(b) {
    return b.compose(this);
};
Lens.prototype.toPartial = function() {
    return PartialLens((target) => Option.Some(this.run(target)));
};

Lens.objectLens = function(property) {
    return Lens(function(o) {
        return Store(
            (s) => {
                return extend(o, singleton(property, s));
            },
            constant(o[property])
        );
    });
};
Lens.arrayLens = function(index) {
    return Lens(function(a) {
        return Store(
            (s) => {
                var r = a.concat();
                r[index] = s;
                return r;
            },
            constant(a[index])
        );
    });
};

module.exports = Lens;
