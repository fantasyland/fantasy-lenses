var daggy = require('daggy'),
    C = require('fantasy-combinators'),
    Option = require('fantasy-options'),
    Store = require('fantasy-stores'),
    Lens = daggy.tagged('run'),
    PartialLens = daggy.tagged('run');

function thisAndThen(b) {
    return b.compose(this);
}

// Methods
Lens.id = function() {
    return Lens(function(target) {
        return Store(
            C.identity,
            function() {
                return target;
            }
        );
    });
};
Lens.prototype.compose = function(b) {
    var a = this;
    return Lens(function(target) {
        var c = b.run(target),
            d = a.run(c.get());
        return Store(
            C.compose(c.set)(d.set),
            d.get
        );
    });
};
Lens.prototype.andThen = thisAndThen;
Lens.prototype.toPartial = function() {
    var self = this;
    return PartialLens(function(target) {
        return Option.Some(self.run(target));
    });
};
Lens.objectLens = function(property) {
    return Lens(function(o) {
        return Store(
            function(s) {
                var r = {},
                    k;
                for(k in o) {
                    r[k] = o[k];
                }
                r[property] = s;
                return r;
            },
            function() {
                return o[property];
            }
        );
    });
};
Lens.arrayLens = function(index) {
    return Lens(function(a) {
        return Store(
            function(s) {
                var r = a.concat();
                r[index] = s;
                return r;
            },
            function() {
                return a[index];
            }
        );
    });
};

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
PartialLens.prototype.andThen = thisAndThen;
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
if(typeof module != 'undefined') {
    exports.Lens = Lens;
    exports.PartialLens = PartialLens;
}
