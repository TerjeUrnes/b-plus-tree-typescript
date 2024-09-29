import { BPlusNode } from "./b-plus-node";
import { IDataBlock } from "./idatablock";
import { IKey } from "./ikey";

export class InternalNode extends BPlusNode {
    
    public get SmallestKey(): IKey {
        return this._keys[0];
    }
    
    constructor() {
        super(null, 0);
    }

    public Add(dataBlock: IDataBlock): void {
        throw new Error("Method not implemented.");
    }

    public Get(key: IKey): IDataBlock | null {
        throw new Error("Method not implemented.");
    }
}