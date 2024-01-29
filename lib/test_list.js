import { TestBuilder } from './test_builder.js';
import { compareObject } from './utility_functions.js';
import { objectContains } from './utility_functions.js';

export class TestList {
    constructor(method) {
        this.subject = method;
        this.params = [];
        this.lastTestedMethod = 'constructor';
        this.lastResultingState;
        this.isClass = false;
        this.tests = [];
        this.testsPassed = 0;
        this.saveObject = false;
    }
    
    withParams() {
        this.params = [...arguments];
        this.isClass = true;
        
        const testBuilder = new TestBuilder(this)
        .withParams(...arguments);
        
        return testBuilder;
    }
    
    testMethod(methodName) {
        const testBuilder = new TestBuilder(this)
        .testMethod(methodName);
        this.isClass = true;
        
        return testBuilder;
    }
    
    on() {
        const testBuilder = new TestBuilder(this)
        .on(...arguments);
        
        return testBuilder;
    }
    
    run() {
        for(const test of this.tests) {
            if(this.isClass){
                const paramsChanged = test.parameters !== undefined;
                test.parameters = paramsChanged ? test.parameters : this.params;
                this.params = test.parameters;
                
                test.method = test.method === undefined ? this.lastTestedMethod : test.method;
                this.lastTestedMethod = test.method;
                
                test.saveObject = test.saveObject === undefined ? this.saveObject : test.saveObject;
                this.saveObject = test.saveObject;
                
                this.lastResultingState = paramsChanged ? new this.subject(...test.parameters) : this.lastResultingState;
                test.resultingState = test.saveObject ? this.lastResultingState : new this.subject(...test.parameters);
                
                if(test.method !== 'constructor') {
                    test.resultingOutput = test.resultingState[test.method](...test.inputs);
                }
                test.statePassed = test.strictState ? 
                    compareObject(test.resultingState, test.expectedState) :
                    objectContains(test.expectedState, test.resultingState);
                test.statePassed = test.negativeState ? !test.statePassed : test.statePassed;
                    
                test.resultingState = test.saveObject ? structuredClone(test.resultingState) : test.resultingState;
                
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
            test.outputPassed = test.negativeOutput ? !test.outputPassed : test.outputPassed;
            
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