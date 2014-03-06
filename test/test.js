var Lens = require('../fantasy-lenses').Lens,
    PartialLens = require('../fantasy-lenses').PartialLens,
    person = {
        name: "Brian McKenna",
        skills: [
            'JavaScript',
            'Scala'
        ],
        location: {
            number: 1006,
            street: "Pearl St",
            postcode: 80302
        }
    },
    data = [
        {
            name: "First record",
            config: {
                type: 2
            }
        },
        {
            description: "Hello world",
            config: {
                type: 3
            }
        },
        {
            name: "Third record"
        }
    ];

exports.testUpdatePersonLocationNumber = function(test) {
    var location = Lens.objectLens('location'),
        number = Lens.objectLens('number'),
        store = location.andThen(number).run(person);

    test.equal(store.get(), 1006);
    test.deepEqual(
        store.set(1007),
        {
            name: 'Brian McKenna',
            skills: [
                'JavaScript',
                'Scala'
            ],
            location: {
                number: 1007,
                street: 'Pearl St',
                postcode: 80302
            }
        }
    );
    test.done();
};

exports.testUpdatePersonFirstSkill = function(test) {
    var skills = Lens.objectLens('skills'),
        first = Lens.arrayLens(0),
        store = skills.andThen(first).run(person);

    test.equal(store.get(), 'JavaScript');
    test.deepEqual(
        store.set('Haskell'),
        {
            name: 'Brian McKenna',
            skills: [
                'Haskell',
                'Scala'
            ],
            location: {
                number: 1006,
                street: 'Pearl St',
                postcode: 80302
            }
        }
    );
    test.done();
};

exports.testNestedFilter = function(test) {
    var config = PartialLens.objectLens('config'),
        type = PartialLens.objectLens('type'),
        configType = config.andThen(type),
        result = data.filter(function(d) {
            return configType.run(d).fold(
                function(store) {
                    return store.get() == 2;
                },
                function() {
                    return false;
                }
            );
        });

    test.deepEqual(
        result,
        [
            {
                name: 'First record',
                config: {
                    type: 2
                }
            }
        ]
    );
    test.done();
};

exports.testValidation = function(test) {
    var Option = require('fantasy-options'),
        o = PartialLens.objectLens,
        a = PartialLens.arrayLens,
        validations = [
            // a must be a Number
            o('a').andThen(isTypeOf('number')),
            // b must be a Boolean
            o('b').andThen(isTypeOf('boolean')),
            // c must be a String
            o('c').andThen(isTypeOf('string')),
            // d.e.f[0] must be equal to 1
            o('d').andThen(o('e')).andThen(o('f')).andThen(a(1)).andThen(isEqual(2))
        ];

    // PartialLens for checking typeof a value
    function isTypeOf(t) {
        return PartialLens(function(target) {
            return typeof target == t ? PartialLens.id().run(target) : Option.None;
        });
    }

    // PartialLens for checking equality of a value
    function isEqual(e) {
        return PartialLens(function(target) {
            return target == e ? PartialLens.id().run(target) : Option.None;
        });
    }

    // Checks if an Option is Some (i.e. not None)
    function isSome(o) {
        return o.fold(
            function(s) {
                return true;
            },
            function() {
                return false;
            }
        );
    }

    // Array.prototype.map
    function map(a, f) {
        var r = [],
            i;

        for(i = 0; i < a.length; i++) {
            r[i] = f(a[i]);
        }

        return r;
    }

    // Array.prototype.reduce
    function reduce(a, f, o) {
        var r = o,
            i;

        for(i = 0; i < a.length; i++) {
            r = f(r, a[i]);
        }

        return r;
    }

    // &&
    function and(a, b) {
        return a && b;
    }

    // Runs all validations against an object
    function valid(o) {
        return reduce(
            map(validations, function(v) {
                return isSome(v.run(o));
            }),
            and,
            true
        );
    }

    test.ok(!valid({
        a: {},
        b: true,
        c: "three",
        d: {
            e: {
                f: [1, 2, 3]
            }
        }}),
        'a is not a Number'
    );
    test.ok(
        !valid({
            a: 1,
            b: true,
            c: 0,
            d: {
                e: {
                    f: [1, 2, 3]
                }
            }
        }),
        'c is not a String'
    );
    test.ok(
        !valid({
            a: 1,
            b: true,
            c: "three",
            d: {
                e: {
                    f: [1, 3, 3]
                }
            }
        }),
        'd.e.f[1] is not 2'
    );
    test.ok(
        valid({
            a: 1,
            b: true,
            c: "three",
            d: {
                e: {
                    f: [1, 2, 3]
                }
            }
        }),
        'Data satisfying validations is valid'
    );
    test.done();
};
