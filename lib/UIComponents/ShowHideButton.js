export class ShowHideButton {
    constructor() {
        this.instance = document.createElement('button');
        this.instance.textContent = 'Show only failures';
        this.instance.addEventListener('click', () => { this.click(); } );
        
        this.subscribers = [];
        this.state = 'hide';
    }
    
    click() {
        for(const subscriber of this.subscribers) {
            subscriber[this.state]();
        }
        if(this.state === 'hide') {
            this.state = 'show';
            this.instance.textContent = 'See all tests';
        } else {
            this.state = 'hide';
            this.instance.textContent = 'Show only failures';
        }
    }
    
    subscribe(objectReference) {
        this.subscribers.push(objectReference);
    }
}