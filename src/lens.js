var daggy = require('daggy'),
    C = require('fantasy-combinators'),
    Option = require('fantasy-options'),
    Store = require('fantasy-stores'),
    Lens = daggy.tagged('run');

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
Lens.prototype.andThen = function(b) {
    return b.compose(this);
};
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

// Export
if(typeof module != 'undefined')
    module.exports = Lens;
