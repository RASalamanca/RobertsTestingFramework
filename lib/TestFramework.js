import { TestList } from './TestList.js';
import { ResultList } from './UIComponents/ResultList.js';
import { NavigationPanel } from './UIComponents/NavigationPanel.js';
import { ShowHideButton } from './UIComponents/ShowHideButton.js';

class TestFramework {
    constructor() {
        this.testLists = {};
        this.UIComponents = {};
    }
    
    testSubject(subject) {
        let name = subject.name;
        this.testLists[name] = new TestList(subject);
        return this.testLists[name];
    }
    
    runTests() {
        for(const list in this.testLists) {
            this.testLists[list].run();
        }
        this.printResults();
    }
    
    printResults() {
        this.UIComponents.resultList = new ResultList(this.testLists);
        this.UIComponents.navigationPanel = new NavigationPanel(this.testLists);
        this.UIComponents.showHideButton = new ShowHideButton();
        
        document.querySelector('main').append(this.UIComponents.resultList.instance);
        document.querySelector('#navbar').append(this.UIComponents.showHideButton.instance);
        document.querySelector('#navbar').append(this.UIComponents.navigationPanel.instance);
        
        this.UIComponents.showHideButton.subscribe(this.UIComponents.navigationPanel);
        this.UIComponents.showHideButton.subscribe(this.UIComponents.resultList);
        
        let allTests = 0;
        let allPassed = 0;
        for(const list in this.testLists) {
            allTests += this.testLists[list].tests.length;
            allPassed += this.testLists[list].testsPassed;
        }
        
        const sumaryPrompt = document.createElement('h1');
        sumaryPrompt.textContent = 'Summary';
        
        const totalPrompt = document.createElement('p');
        totalPrompt.classList.add('sumary');

        totalPrompt.innerHTML = `
            <span class="bold">Total tests:</span>
            <span class="data">${allTests}</span><br>
            <span class="bold">Passed:</span>
            <span class="data">${allPassed}</span><br>
            <span class="bold">Failed:</span>
            <span class="data">${allTests - allPassed}</span>
        `;

        document.querySelector('#sumary').append(sumaryPrompt);
        document.querySelector('#sumary').append(totalPrompt);
    }
}

export const RTF = new TestFramework();





