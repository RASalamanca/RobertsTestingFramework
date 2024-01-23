# RTF
## `RTF.testSubject()`
Use it to declare a list of tests for a particular class or function.
Tests are declared using the `TestList` and `TestBuilder` classes

**Takes:** A function or class.
**Returns:** An instance of the `TestList` class.

## `RTF.runTests()`
Used to run the test lists.
Loops through all declared instances of `TestList` and calls their `.run()` method.
Calls `RTF.printResults()` after it's done.

> **Note:** *You will never call this on a test module.*

## `RTF.printResults()`
Prints out the results to HTML. This method does not directly generates the HTML. 
Instead, it instanciates a bunch of UI componets and appends them to the DOM.

> **Note:** *You will never call this on a test module.*

# TestList
## `TestList.withParams()`
- Creates a new instance of the `TestBuilder` class
- Passes all provided parameters to the `TestBuilder` by invoking it's `.withParams()` method 
- Marks this test subject as a class
- Returns the `TestBuilder` instance so we can chain more methods

**Takes:** Any number of arguments of any type
**Returns** An instance of the `TestBuilder` class

## `TestList.testMethod()`
- Creates a new instance of the `TestBuilder` class
- Passes the method name to the `TestBuilder` by invoking it's `.testMethod()` method 
- Marks this test subject as a class
- Returns the `TestBuilder` instance so we can chain more methods

**Takes:** A string representing a method name of the class we are testing
**Returns** An instance of the `TestBuilder` class

## `TestList.on()`
- Creates a new instance of the `TestBuilder` class
- Passes all provided parameters to the `TestBuilder` by invoking it's `.on()` method 
- Returns the `TestBuilder` instance so we can chain more methods

**Takes:** Any number of arguments of any type
**Returns** An instance of the `TestBuilder` class

## `TestList.run()`
Loops through all tests on this list, runs them, compares the output to the expected output, and updates their result.

> **Note:** *You will never call this on a test module.*

# TestBuilder
## `TestBuilder.withParams()`
Creates an array with all input arguments, and stores it on the test object.

**Takes:** Any number of arguments of any type
**Returns** This instance of the `TestBuilder` object

## `TestBuilder.testMethod()`
Stores the method name on the test object.

**Takes:** A string representing a method name of the class we are testing
**Returns** This instance of the `TestBuilder` object

## `TestBuilder.on()`
Creates an array with all input arguments, and stores it on the test object.

**Takes:** Any number of arguments of any type
**Returns** This instance of the `TestBuilder` object

## `TestBuilder.state()`
Stores the expected object state on the test object.

**Takes:** An object representing an expected state of an object instanciated by the class we are testing
**Returns** This instance of the `TestBuilder` object

## `TestBuilder.strictState()`
Stores the expected object state on the test object, and marks it as a strict test.

**Takes:** An object representing an expected state of an object instanciated by the class we are testing
**Returns** This instance of the `TestBuilder` object

> **Note:** *Normally, object checks only require that all the properties and values specified are in the object we are testing. That is to say, an object with properties in addition to the ones we are testing for would pass the check. This is not the case in strict mode. The object we are testing must be **EXACTLY** like the one we specify.*

## `TestBuilder.out()`
- Stores the expected output of the test on the test object. 
- Builds the test object
- Returns the parent `TestList` object so we can chain more methods

**Takes:** A value or object representing an expected output of the function or method we are testing
**Returns** The parent `TestList` Object

## `TestBuilder.strictOut()`
Marks the output as a strict test, and calls `TestBuilder.out()` with whatever input we provided.

**Takes:** A value or object representing an expected output of the function or method we are testing
**Returns** The parent `TestList` Object

> **Note:** *Normally, object checks only require that all the properties and values specified are in the object we are testing. That is to say, an object with properties in addition to the ones we are testing for would pass the check. This is not the case in strict mode. The object we are testing must be **EXACTLY** like the one we specify.*
