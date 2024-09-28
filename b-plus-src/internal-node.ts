import { BPlusNode } from "./b-plus-node";
import { IKey } from "./ikey";

export class InternalNode extends BPlusNode {
    
    public get SmallestKey(): IKey {
        return this._keys[0];
    }
    
    constructor() {
        super(0);
    }
}