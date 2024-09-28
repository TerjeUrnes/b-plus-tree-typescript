import {IKey} from "./ikey";

export interface IDataBlock {
    get Key() : IKey;
    get Previous() : IDataBlock | null;
    set Previous(value : IDataBlock | null);
    get Next() : IDataBlock | null;
    set Next(value : IDataBlock | null);
}