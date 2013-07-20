# Fantasy Lenses

Lenses are composable, immutable getters and setters. Composable in
that they allow updating of nested data structures. Immutable in that
the setters return copies of the whole data structure.

## Examples

### Nested updating

```javascript
var person = {
        name: "Brian McKenna",
        location: {
            number: 1006,
            street: "Pearl St",
            postcode: 80302
        }
    },
    objectLens = require('fantasy-lenses').Lens.objectLens,
    locationLens = objectLens('location'),
    numberLens = objectLens('number'),
    store = locationLens.andThen(numberLens).run(person);

console.log(store.getter());
// 1006

console.log(store.setter(1007));
// { name: 'Brian McKenna',
//   location: { number: 1007, street: 'Pearl St', postcode: 80302 } }
```

### Accessing optional fields

```javascript
var data = [{
        name: "First record",
        config: {
            type: 2
        }
    }, {
        description: "Hello world",
        config: {
            type: 3
        }
    }, {
        name: "Third record"
    }],
    objectLens = require('fantasy-lenses').PartialLens.objectLens,
    configLens = objectLens('config'),
    typeLens = objectLens('type'),
    configTypeLens = configLens.andThen(typeLens);

console.log(data.filter(function(o) {
    return configTypeLens.run(o).fold(
        function(store) {
            // Get the field's content
            return store.getter() == 2;
        },
        function() {
            // Didn't find field
            return false;
        }
    );
}));
// [ { name: 'First record', config: { type: 2 } } ]
```
