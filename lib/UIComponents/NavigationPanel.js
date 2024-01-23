export class NavigationPanel {
    constructor(testList) {
        this.instance = document.createElement('ul');
        this.sections = [];
        this.instance.classList.add('no-style');
        
        for(const subjectName in testList) {
            const testSubject = testList[subjectName];
            
            if(testSubject.isClass) {
                const section = new ClassLinks(`${testSubject.subject.name}()`);
                for(const test of testSubject.tests) {
                    section.add(test);
                }
                section.checkPass();
                this.sections.push(section);
                this.instance.append(section.instance);
               
            } else {
                let pass = testSubject.tests.length === testSubject.testsPassed;
                let link = new FunctionLink(`${testSubject.subject.name}()`, 'main-link', pass);
                link.totalTests = testSubject.tests.length;
                link.testsPassed = testSubject.testsPassed;
                this.addLink(link);
            }
        }
    }
    
    addLink(navLink) {
        this.instance.append(navLink.instance);
        this.sections.push(navLink);
    }
    
    show() {
        for(const section of this.sections) {
            section.show();
        }
    }
    
    hide() {
        for(const section of this.sections) {
            section.hide();
        }
    }
}

class ClassLinks {
    constructor(target) {
        this.instance = document.createElement('div');
        this.mainLink = document.createElement('a');
        this.list = document.createElement('ul');
        this.links = [];
        this.pass = false;
        
        this.list.classList.add('method-list');
        this.mainLink.classList.add('navLink');
        this.mainLink.textContent = target;
        this.mainLink.href = `#${target}`;
        
        this.instance.append(this.mainLink);
        this.instance.append(this.list);
    }

    add(test) {
        const className = this.text.slice(0, this.text.length - 2);
        let methodName = test.method === undefined? 'constructor': test.method;
        methodName = `${className}.${methodName}()`;
        
        let inList = false;
        
        for(const link of this.links) {
            if(link.text === methodName) {
                inList = true;
                link.totalTests += 1;
                link.testsPassed += test.pass ? 1 : 0;
                link.checkPass();
            }
        }
        if(!inList) {
            let link = new FunctionLink(methodName, 'sub-link', test.pass);
            link.totalTests += 1;
            link.testsPassed += test.pass ? 1 : 0;
            link.checkPass();
            
            this.links.push(link);
            this.list.append(link.instance);
        }
    }
    
    checkPass() {
        let passCount = 0;
        for(const link of this.links) {
            passCount += link.pass? 1 : 0;
        }

        const pass = (passCount === this.links.length);
        if(pass){
            this.instance.classList.remove('failedLink');
            this.instance.classList.add('passedLink');
        } else {
            this.instance.classList.remove('passedLink');
            this.instance.classList.add('failedLink');
        }
        
        this.pass = pass;
    }
    
    hide() {
        for(const link of this.links) {
            link.hide();
        }
        
        if(this.pass) {
            this.instance.classList.add('hidden');   
        }
    }
    
    show() {
        this.instance.classList.remove('hidden');
        for(const link of this.links) {
            link.show();
        }
    }
    
    get text() {
        return this.mainLink.textContent;
    }
    
    set text(newText) {
        this.mainLink.textContent = newText;
    }
}

class FunctionLink {
    constructor(target, cssClass, pass) {
        this.link = document.createElement('a');
        this.instance = document.createElement('li');
        this.link.classList.add('navLink');
        this.link.classList.add(pass ? 'passedLink' : 'failedLink');
        this.link.classList.add(cssClass);
        this.link.textContent = target;
        this.link.href = `#${target}`;
        this.instance.append(this.link);
        
        this.pass = pass;
        this.totalTests = 0;
        this.testsPassed = 0;
    }
    
    checkPass() {
        this.pass = this.totalTests === this.testsPassed;
        if(this.pass) {
            this.link.classList.remove('failedLink');
            this.link.classList.add('passedLink');
        } else {
            this.link.classList.remove('passedLink');
            this.link.classList.add('failedLink');
        }
    }
    
    hide() {
        if(this.pass) {
            this.instance.classList.add('hidden');
        }
    }
    
    show() {
        this.instance.classList.remove('hidden');
    }
    
    get text() {
        return this.link.textContent;
    }
    
    set text(newText) {
        this.link.textContent = newText;
    }
}