import { RTF } from '../lib/test_framework.js';
import { objectContains } from '../lib/utility_functions.js';

RTF.testSubject(objectContains)
.on({}, {})
.out(true)

.on({}, {a: 1})
.out(true)

.on(
    {a: 1}, 
    {a: 1, b: 2}
)
.out(true)

.on(
    {a: 1},
    {a: 2, b: 2}
)
.out(false)

.on(
    {a: 'b'},
    {a: 'b', b: 12}
)
.out(true)

.on(
    {a: 'c'},
    {a: 'b', b: 12}
)
.out(false)

.on(
    {
        a: {
            b: 1,
            d: [0, 1, 2]
        },
        c: 2
    },
    {a: 'b', b: 12}
)
.out(false)

.on(
    {
        a: {
            b: 1,
            d: [0, 1, 2]
        },
        c: 2
    },
    {
        a: {
            b: 1,
            d: [0, 1, 2]
        },
        c: 2,
        d: 3,
        f: ["a", "b", "c"]
    }
)
.out(true);