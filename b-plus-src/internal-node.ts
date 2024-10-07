import { BPlusNode } from "./b-plus-node";
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

    public get DataBlockCount(): number {
        let count = 0;
        for (let i = 0; i < this._childrenCount; i++) {
            count += (this._children[i] as BPlusNode).DataBlockCount;
        }
        return count;
    } 
    
    constructor(parent: BPlusNode | null, 
        numBlocks: number, afterAtSplit: number, minBeforeUnderflow: number,
        firstNode: BPlusNode
    ) {
        super(parent, numBlocks, afterAtSplit, minBeforeUnderflow);
        this._children[this._childrenCount++] = firstNode;
        this._key = this.SmallestKey;
    }

    public Add(dataBlock: IDataBlock): BPlusNode | null {
        const index = this.GetChildFindIndex(dataBlock.Key);
        const result = (this._children[index] as BPlusNode).Add(dataBlock);
        if (result != null) {
            this.InsertChildAtIndex(index + 1, result);
        }
        if (this._childrenCount > this._treeOrder) {
            return this.SplitInternalNode();
        }
        return null;
    }

    public AddNode(node: BPlusNode): void {
        const index = this.GetChildInsertIndex(node.SmallestKey);
        this.InsertChildAtIndex(index, node);

    }

    public Remove(key: IKey): RemoveStatus {
        return RemoveStatus.Unknown;
    }

    public Get(key: IKey): IDataBlock | null {
        throw new Error("Method not implemented.");
    }
    
    public GetRange(fromKey: IKey, toKey: IKey, toEndpoint: RangeToEndpoint): IDataBlock[] {
        const index = this.GetChildInsertIndex(fromKey);
        return (this._children[index] as BPlusNode).GetRange(fromKey, toKey, toEndpoint);
    }

    private SplitInternalNode() : BPlusNode {
        return this;
    }
    
}

