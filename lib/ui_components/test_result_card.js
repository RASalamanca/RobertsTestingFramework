export class TestResultCard {
    constructor(test) {
        this.test = test;
        
        this.outputPassed = test.outputPassed ? 'Correct function output ◕‿↼' : 'Wrong function output (ￗ﹏ￗ )'; 
        this.statePassed = test.statePassed ? 'Correct object state ◕‿↼' : 'Wrong object state (ￗ﹏ￗ )';
        this.pass = test.pass ? 'Test Passed! (^_^)' : 'Test Failed!! (0_0)';
        
        this.instance = document.createElement('div');
        this.instance.classList.add('test');
        this.instance.classList.add( test.pass ? 'passed' : 'failed' );
        this.instance.append( this.header(this.pass, 'h2'));

        if(test.mustPassState) {
            this.instance.append( this.showDetails(
                this.header(this.statePassed, 'span'),
                this.header("Expected State:", "h3"),
                this.objectToTable( test.expectedState ),
                this.header("Resulting State:", 'h3'),
                this.objectToTable( test.resultingState )
            ));
        }
        if(test.mustPassOutput) { 
            this.instance.append( this.showDetails(
                this.header(this.outputPassed, 'span'),
                this.header('Expected Output:', 'h3'),
                this.determineFormat(test.expectedOutput),
                this.header('Resulting Output:', 'h3'),
                this.determineFormat(test.resultingOutput)
            ));
        }
        if(test.parameters && test.parameters.length > 0) {
            this.instance.append( this.showDetails(
                this.header("Constructor Parameters", 'span'),
                this.arrayToList([...test.parameters])
            ));
        }
        if(test.inputs && test.inputs.length > 0) {
            this.instance.append( this.showDetails(
                this.header("Inputs", 'span'),
                this.arrayToList([...test.inputs])
            ));
        }
    }
    
    showDetails() {
        const contents = [...arguments];
        const summary = document.createElement('summary');
        const details = document.createElement('details');
        const container = document.createElement('div');
        
        details.append(summary);
        details.append(container);
        summary.classList.add('bold');
        summary.classList.add( this.test.pass ? 'result-passed' : 'result-failed');
        container.classList.add('result-container');
        
        summary.append(contents[0]);
        for(let i = 1; i < contents.length; i++) {
            container.append(contents[i]);
        }

        return details;
    }
    
    header(text, level, CSSClass = '') {
        const element = document.createElement(level);
        element.textContent = text;
        
        if(CSSClass !== '') {
            element.classList.add(CSSClass);
        }
        
        return element;
    }
    
    determineFormat(data, CSSClass = 'data') {   //returns the correct markup depending on the format of the data 
        let element;
        if( typeof data === "object") {
            element = this.objectToTable(data);
        } else {
            element = this.header(data, 'span', CSSClass);
        }
        
        return element;
    }
    
    arrayToList(array, CSSClass = 'data') {     //displays an array as an unordered list
        const list = document.createElement('ul');
        list.classList.add(CSSClass);
        
        for(const item of array) {
            const listItem = document.createElement('li');
            listItem.append( this.determineFormat(item, 'none') );
            list.append(listItem);
        }
        
        return list;
    }
    
    objectToTable(obj, CSSClass = 'data') {   //displas an object as a table
        const caption = document.createElement('caption');
        const legend = document.createElement('tr');
        
        caption.textContent = Array.isArray(obj) ? 'Array' : 'Object';
        legend.innerHTML = Array.isArray(obj) ?
        `<th>Key</th><th>Value</th>` :
        `<th>Property</th><th>Value</th>`;
       
        const table = document.createElement('table');
        table.append(caption);
        table.append(legend);
        table.classList.add(CSSClass);
        
        for(const key in obj) {
            const tableRow = document.createElement('tr');
            const keyCell = document.createElement('td');
            const valueCell = document.createElement('td');
            
            keyCell.textContent = key;
            valueCell.append( this.determineFormat(obj[key], 'none') );
            
            tableRow.append(keyCell);
            tableRow.append(valueCell);
            table.append(tableRow);
        }
        
        return table;
    }
    
    hide() {
        if(this.test.pass) {
            this.instance.classList.add('hidden');
        }
    }
    
    show() {
        this.instance.classList.remove('hidden');
    }
}