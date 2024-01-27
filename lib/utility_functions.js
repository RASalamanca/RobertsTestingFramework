//Returns true if 2 objects are equal, and false if they are not. Recursively checks nested objects and arrays.
export function compareObject(obj1, obj2) {
    let output = true;
    
    if(Object.keys(obj1).length !== Object.keys(obj2).length) {
        output = false;
        return output;
    }
    
    for(const property in obj1) {
        if( !obj2.hasOwnProperty(property) ) {
            output = false;
            break;
        }
        
        if( typeof obj1[property] === 'object') {
            output = compareObject(obj1[property], obj2[property]);
        }else { 
            output = (obj1[property] === obj2[property]); 
        }
        
        if(!output) { 
            break;
        }
    }
    
    return output;
}

//Checks if all the properties of the contained object exists in the container object and have the same values.
export function objectContains(contained, container) {
    let checkPassed = true;
    
    for(const key in contained) {
        const value = contained[key];
        
        if( container.hasOwnProperty(key) ) {
            const cValue = container[key];
            checkPassed = typeof value === 'object' ? 
                objectContains(value, cValue) : 
                cValue === value;
        } else {
            checkPassed = false;
        }
        
        if(!checkPassed) {
            break;
        }
    }
    
    return checkPassed;
}