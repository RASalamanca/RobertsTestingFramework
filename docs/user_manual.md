# User Manual

## Testing a Function
1. Open the `./test_modules` folder and create a new `.js` file inside.
You may name it however you like. We've named ours `example_function_tests.js`. 
This file will be the test module and it will contain all the tests for that function. 
2. Inside the file, import the RTF module `import { RTF } from '../lib/test_framework.js';`
3. Either import or write  the function you want to test. In this example, we will be testing:
```
function exampleFunction(a, b) {
    return a + b;
}
```
4. Pass that function to RTF using the `.testSubject()` method:
`RTF.testSubject(exampleFunction)`
Do not close the statement yet. RTF builds a test suite by chaining multiple methods specifying input and output values.
5. Use the `.on()` method to specify input values.
6. Use the `.out()` method to specify an expected output value and close the test. 

Our example would look like this:
```
RTF.testSubject(exampleFunction)
.on(2, 2).out(4);
```
It would call the function `exampleFunction()` with 2 and 2 as the parameters, and check that it outputs 4.
> **Note:** *When testing for output objects, it is not necessary to write out the entire object or array. An object can have hundreds of properties, 
> but you only need to write the properties of the object you are interested in. If you wan to test for the exact object, use* `.strictOut()`

7. Keep chaining `.on()` & `.out()` calls to register multiple tests.
```
RTF.testSubject(exampleFunction)
.on(2, 2).out(4)
.on(3, 2).out(5)
.on(4, 4).out(8);
```
9. Save the module and edit the file `./results.html`
10. Inside the body tag, add a script tag pointing to your test module. 
`<script type="module" src="testModules/example_function_tests.js"></script>`
11. That's it! Just save and open `./results.html` on your browser to check out the results

This is the full code of our example module for reference:
```
import { RTF } from '../lib/test_framework.js';

function exampleFunction(a, b) {
    return a + b;
}

RTF.testSubject(exampleFunction)
.on(2, 2).out(4)
.on(3, 2).out(5)
.on(4, 4).out(8);
```
A copy of said module, along side other example modules, are included on the directory `./test_modules`. You may delete them and replace them with your own modules. Just remember to update `./results.html` every time you create or delete test modules.

---

## Testing a Class
Writing tests for a class works much the same way as a function. Read [Testing a Function](##testing-a-function) if you haven't done so.
1. Make a new test module and either import or paste the class you want to test. In this example we will be testing this class:
```
class ExampleClass {
    constructor(initialValue) {
        this.value = initialValue;
    }
    
    addOne() {
        this.value += 1;
    }
    
    add(number) {
        this.value += number;
    }
    
    addAndReturn(number) {
        this.value += number;
        return this.value;
    }
}
```
2. Pass the class to RTF using the `.testSubject()` method:
`RTF.testSubject(ExampleClass)`
4. Use the `.withParams()` method to specify constructor parameters
5. Use the `.state()` method to specify expected object state
6. Close the test with the `.out()` method. All tests must be ended with the `.out()` method, even if you are not expecting any output.

Our example test would look like this:
```
RTF.testSubject(TestSubject)
.withParams(1).state({value: 1}).out();
```
Since we have not specified a method, all it will do is call the constructor with the number 1 as it's sole parameter, and test that it produces and object with a property "value" that has a value of 1.
> **Note:** *When testing for output objects, it is not necessary to write out the entire object or array. An object can have hundreds of properties, 
> but you only need to write the properties of the object you are interested in. If you wan to test for the exact object, use* `.strictState()`

7. Use `.testMethod()` to specify a method to test.

A test for the `.addOne()` method of our example class would look like this:
```
RTF.testSubject(TestSubject)
.testMethod('addOne').withParams(1).state({value: 2}).out();
```
This test would invoke the constructor with 1 as the parameter, and then invoke the `.addOne()` method on the newly constructed object. Finally it would test that the object has a property named "value" and that said property has a value of 2

8. Use `.on()` in conjuntion with `.testMethod()` to specify parameters for the method we are testing. 

A test for the `.add()` method on our example class would look like this:
```
RTF.testSubject(TestSubject)
.testMethod('add').withParams(0).on(2).state({value: 2}).out();
```
This would create an object with 0 as the constructor parameter, invoke the `.add()` method on said object, pass it the parameter 2, and test it against the specified object state.

9. `.withParams()`, `.saveObject()` and `.testMethod()` only have to be invoked once. If a previous test used it, subsequent tests will remember the previously specified constructor parameters and method. 

This set of tests all use the same method and parameters.
```
RTF.testSubject(TestSubject)
.testMethod('add').withParams(0)
.on(2).state({value: 2}).out()
.on(3).state({value: 3}).out()
.on(4).state({value: 4}).out();
```

10. Methods sometimes require that other methods have been called first for them to affect the object state in any manner. Normally, the framework makes a new instance of the object for every test, but we can change that by using `.saveObject()`. 

This set of tests all call the `.add()` method on the same object
```
RTF.testSubject(TestSubject)
.testMethod('add').withParams(0).saveObject()
.on(2).state({value: 2}).out()
.on(3).state({value: 5}).out()
.on(5).state({value: 10}).out();
```

11. Both object state and method output can be checked simulateneously, but each test must always end with `.out()`. 
 
A test for the `.addAndReturn()` method would look like this:
```
RTF.testSubject(TestSubject)
.testMethod('addAndReturn').withParams(1).on(2).state({value: 3}).out(3);
```
This test would create an object passing 1 to the class constructor, then invoke the `.addAndReturn()` method of said object, pass it the number 2, and check that both the method returned the number 3 and the object has a property named "value" with a value of 3.

12. Once you finish writing your tests, save the module to the `./test_modules` folder and add it as a script tag on `./results.html`. 

For reference, this is the full code of the `example_class_tests.js` file
```
import { RTF } from '../lib/test_framework.js';

class TestSubject {
    constructor(initialValue) {
        this.value = initialValue;
    }
    
    addOne() {
        this.value += 1;
    }
    
    add(number) {
        this.value += number;
    }
    
    addAndReturn(number) {
        this.value += number;
        return this.value;
    }
    
}

RTF.testSubject(TestSubject)
.withParams(1).state({value: 1}).out()
.withParams('a').state({value: "a"}).out()
.withParams("fail").state({value: "succeed"}).out()     //This test fails on purpose to showcase the UI 

.testMethod('addOne').withParams(1).state({value: 2}).out()
.testMethod('addOne').withParams(2).state({value: 3}).out()
.testMethod('addOne').withParams(4).state({value: 5}).out()
.testMethod('addOne').withParams('a').state({value: 'a1'}).out()

.testMethod('add').withParams(0)
.on(2).state({value: 2}).out()
.on(3).state({value: 3}).out()
.on(4).state({value: 4}).out()

.withParams(0).saveObject()
.on(2).state({value: 2}).out()
.on(3).state({value: 5}).out()
.on(5).state({value: 10}).out()

.withParams(1).testMethod('addAndReturn')
.on(2).state({value: 3}).out(3)
```
---