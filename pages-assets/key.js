
export class Key {
    
    _key;   

    constructor(key) {
        this._key = key;
    }
    
    CompareTo(other) {
        return this._key - other._key;
    }

    ToString() {
        return this._key.toString();
    }   
}