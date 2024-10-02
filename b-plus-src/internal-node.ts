import { BPlusNode } from "./b-plus-node";
import { TraverseRapport } from "./dataclasses/traverserapport";
import { RangeToEndpoint } from "./enums/rangetoendpoint";
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
    
    public GetRange(fromKey: IKey, toKey: IKey, toEndpoint: RangeToEndpoint): IDataBlock[] {
        const index = this.GetChildIndex(fromKey);
        return (this._children[index] as BPlusNode).GetRange(fromKey, toKey, toEndpoint);
    }

    public GetWithRapport(key: IKey, rapport: TraverseRapport): void {
        throw new Error("Method not implemented.");
    }
    
}