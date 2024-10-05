
export class DataBlock {
    
    _key;
    _previous;
    _next;

    get Key() {
        return this._key;
    }

    get Previous() {
        return this._previous;
    }
    set Previous(value) {
        this._previous = value;
    }
    get Next() {
        return this._next;
    }
    set Next(value) {
        this._next = value;
    }

    constructor(key) {
        this._key = key;
    }  

}