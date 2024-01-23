export class TestBuilder {
    constructor(parent){
        this.parent = parent;
        this.test = {
            parameters: undefined,
            method: undefined,
            inputs: [],
            expectedState: {},
            expectedOutput: undefined,
            resultingOutput: undefined,
            resultingState: undefined,
            strictOutput: false,
            strictState: false,
            mustPassOutput: false,
            mustPassState: false,
            outputPassed: false,
            statePassed: false,
            pass: false
        };
        
        return this;
    }
    
    withParams() {
        this.test.parameters = [...arguments];
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

}
