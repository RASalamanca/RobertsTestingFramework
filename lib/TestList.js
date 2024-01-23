import { TestBuilder } from './TestBuilder.js';
import { compareObject } from './UtilityFunctions.js';
import { objectContains } from './UtilityFunctions.js';

export class TestList {
    constructor(method) {
        this.subject = method;
        this.params = [];
        this.lastTestedMethod = 'constructor';
        this.isClass = false;
        this.tests = [];
        this.testsPassed = 0;
    }
    
    withParams() {
        this.params = [...arguments];
        this.isClass = true;
        
        const testBuilder = new TestBuilder(this)
        .withParams(...arguments);
        
        this.tests.push(testBuilder.test);
        return testBuilder;
    }
    
    testMethod(methodName) {
        const testBuilder = new TestBuilder(this)
        .testMethod(methodName);
        this.isClass = true;
        
        this.tests.push(testBuilder.test);
        return testBuilder;
    }
    
    on() {
        const testBuilder = new TestBuilder(this)
        .on(...arguments);
        
        this.tests.push(testBuilder.test);
        return testBuilder;
    }
    
    run() {
        for(const test of this.tests) {
            if(this.isClass){
                test.parameters = test.parameters === undefined ? this.params : test.parameters;
                this.params = test.parameters;
                test.method = test.method === undefined ? this.lastTestedMethod : test.method;
                this.lastTestedMethod = test.method;
                
                test.resultingState = new this.subject(...test.parameters);
                if(test.method !== 'constructor') {
                    test.resultingOutput = test.resultingState[test.method](...test.inputs);
                }
                test.statePassed = test.strictState ? 
                    compareObject(test.resultingState, test.expectedState) :
                    objectContains(test.expectedState, test.resultingState);
                
            }else {
                test.resultingOutput = this.subject(...test.inputs);
            }
            
            if( typeof test.expectedOutput === "object") {
                test.outputPassed = test.strictOutput ? 
                    compareObject(test.resultingOutput, test.expectedOutput) :
                    objectContains(test.expectedOutput, test.resultingOutput);
                    
            } else {
                test.outputPassed = test.resultingOutput === test.expectedOutput;
            }
            
            let passedOutput = test.mustPassOutput ? test.outputPassed : true;
            let passedState = test.mustPassState ? test.statePassed : true;
            test.pass = passedOutput && passedState;
            
            if(test.pass) {
                this.testsPassed += 1;
            }
            console.log(test);
        }
    }
}