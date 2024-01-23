import { TestResultCard } from './test_result_card.js';

export class ResultList {
    constructor(testList) {
        this.instance = document.createElement('div');
        this.sections = [];
        
        for(const subjectName in testList) {
            const testSubject = testList[subjectName];
            const section = new Box(`${testSubject.subject.name}()`);
            
            for(const test of testSubject.tests) {
                if(!testSubject.isClass){
                    section.add( new TestResultCard(test) );
                    
                } else {
                    let subSectionName = test.method === undefined ? 'constructor()' : `${test.method}()`;
                    subSectionName = `${testSubject.subject.name}.${subSectionName}`;
                    section.getSub(subSectionName).add( new TestResultCard(test) );
                }
            }
            
            section.updateCounter();
            this.sections.push(section);
            this.instance.append(section.instance);
        }
    }
    
    hide() {
        for(const section of this.sections) {
            section.hide();
        }
    }
    
    show() {
        for(const section of this.sections) {
            section.show();
        }
    }
}

class Box {
    constructor(name, level = 'section') {
        this.instance = document.createElement('div');
        this.counter = document.createElement('span');
        this.list = document.createElement('ul');
        this.title = document.createElement( level === 'section' ? 'h1' : 'h2');
        this.contents = [];
        this.passedTests = 0;
        this.totalTests = 0;

        this.counter.classList.add('counter');
        this.list.classList.add( level === 'section' ? 'test-list' : 'sub-list');
        this.title.textContent = name;
        this.title.append(this.counter);
        
        this.instance.classList.add(level);
        this.instance.id = name;
        this.instance.append(this.title);
        this.instance.append(this.list);
    }
    
    getSub(name) {
        let output;
        
        for(const content of this.contents) {
            if(content.title.textContent === name) {
                output = content;
            }
        }
        
        if(output === undefined) {
            output =  new Box(name, 'sub-section');
            this.add(output);
        }
        
        return output;
    }
    
    updateCounter() {
        this.passedTests = 0;
        this.totalTests = 0;
        
        for(const content of this.contents) {
            if(content instanceof Box) {
                content.updateCounter();
                this.totalTests += content.totalTests;
                this.passedTests += content.passedTests;
                
            } else {
                this.totalTests += 1;
                this.passedTests += content.test.pass ? 1 : 0;
            }
        }
        
        this.counter.textContent = ` ${this.passedTests}/${this.totalTests} tests passed`;
    }
    
    add(content) {
        this.contents.push(content);
        this.list.append(content.instance);
    }

    hide() {
        for(const content of this.contents) {
            content.hide();
        }
        if(this.passedTests === this.totalTests) {
            this.instance.classList.add('hidden');
        }
    }
    
    show() {
        this.instance.classList.remove('hidden');
        for(const content of this.contents) {
            content.show();
        }
    }
}