var Lens = require('./').Lens,
    PartialLens = require('./').PartialLens,
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
