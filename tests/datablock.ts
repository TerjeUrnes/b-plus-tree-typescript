import {IDataBlock} from "../b-plus-src/idatablock"
import {IKey} from "../b-plus-src/ikey";

export class DataBlock implements IDataBlock {
    
    private _key: IKey;
    private _previous: IDataBlock | null = null;
    private _next: IDataBlock | null = null;

    public get Key(): IKey {
        return this._key;
    }

    public get Previous(): IDataBlock | null {
        return this._previous;
    }
    public set Previous(value: IDataBlock | null) {
        this._previous = value;
    }
    public get Next(): IDataBlock | null {
        return this._next;
    }
    public set Next(value: IDataBlock | null) {
        this._next = value;
    }

    constructor(key: IKey) {
        this._key = key;
    }   

}