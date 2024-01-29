export class TestBuilder {
    constructor(parent){
        this.parent = parent;
        this.test = {};
        return this;
    }
    
    withParams() {
        this.test.parameters = [...arguments];
        this.test.saveObject = false;
        return this;
    }
    
    saveObject() {
        this.test.saveObject = true;
        return this;
    }
    
    testMethod(methodName) {
        this.test.method = methodName;
        return this;
    }
    
    on() {
        this.test.inputs = [...arguments];
        return this;
    }
    
    state(obj) {
        this.test.expectedState = obj;
        this.test.mustPassState = true;
        return this;
    }
    
    out(expectedValue) {
        this.test.expectedOutput = expectedValue;
        
        if( expectedValue !== undefined ) {
            this.test.mustPassOutput = true;
        }
        
        this.build();
        return this.parent;
    }
    
    strictOut(expectedValue) {
        this.test.strictOutput = true;
        return this.out(expectedValue);
    }
    
    strictState(obj) {
        this.test.strictState = true;
        return this.state(obj);
    }
    
    stateIsNot(obj) {
        this.test.negativeState = true;
        return this.state(obj);
    }
    
    outNot(expectedValue) {
        this.test.negativeOutput = true;
        return this.out(expectedValue);
    }
    
    build() {
        this.parent.tests.push( new Test(this.test) );
    }

}

class Test {
    constructor(obj) {
        this.parameters = obj.parameters;
        this.method = obj.method;
        this.inputs = obj.inputs === undefined ? [] : obj.inputs;
        this.expectedState = obj.expectedState === undefined ? {} : obj.expectedState;
        this.expectedOutput = obj.expectedOutput;
        this.resultingOutput = obj.resultingOutput;
        this.resultingState = obj.resultingState;
        this.strictOutput = obj.strictOutput === undefined ? false : obj.strictOutput;
        this.strictState = obj.strictState === undefined ? false : obj.strictState;
        this.negativeState = obj.negativeState === undefined ? false : obj.negativeState;
        this.negativeOutput = obj.negativeOutput === undefined ? false : obj.negativeOutput;
        this.mustPassOutput = obj.mustPassOutput === undefined ? false : obj.mustPassOutput;
        this.mustPassState = obj.mustPassState === undefined ? false : obj.mustPassState;
        this.outputPassed = obj.outputPassed === undefined ? false : obj.outputPassed;
        this.statePassed = obj.statePassed === undefined ? false : obj.statePassed;
        this.pass = obj.pass === undefined ? false : obj.pass;
        this.saveObject = obj.saveObject === undefined ? undefined : obj.saveObject;
    }
}
