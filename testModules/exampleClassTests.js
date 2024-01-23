import { RTF } from '../lib/TestFramework.js';

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

.withParams(1).testMethod('addAndReturn').on(2).state({value: 3}).out(3);