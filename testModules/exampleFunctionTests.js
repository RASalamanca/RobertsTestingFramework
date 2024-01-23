import { RTF } from '../lib/TestFramework.js';

function exampleFunction(a, b) {
    return a + b;
}

RTF.testSubject(exampleFunction)
.on(2, 2).out(4)
.on(3, 2).out(5)
.on(4, 4).out(8);
