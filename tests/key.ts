import { IKey } from "../b-plus-src/ikey";

export class Key implements IKey {
    
    protected _key: number;   

    constructor(key: number) {
        this._key = key;
    }
    
    CompareTo(other: IKey): number {
        if (other instanceof Key) {
            return this._key - other._key;
        }
        return -1;
    }
}