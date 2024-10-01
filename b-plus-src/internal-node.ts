import { BPlusNode } from "./b-plus-node";
import { RemoveStatus } from "./enums/removestatus";
import { IDataBlock } from "./idatablock";
import { IKey } from "./ikey";

export class InternalNode extends BPlusNode {
    
    private _key: IKey;

    public get Key(): IKey {
        return this._key;
    }

    public get SmallestKey(): IKey {
        return (this._children[0] as BPlusNode).SmallestKey;
    }
    
    constructor(firstNode: BPlusNode) {
        super(null, 0);
        this._key = firstNode.SmallestKey;
    }

    public Add(dataBlock: IDataBlock): void {
        throw new Error("Method not implemented.");
    }

    public Remove(key: IKey): RemoveStatus {
        return RemoveStatus.Unknown;
    }

    public Get(key: IKey): IDataBlock | null {
        throw new Error("Method not implemented.");
    }
}