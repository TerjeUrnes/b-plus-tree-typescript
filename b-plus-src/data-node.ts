import { BPlusNode } from "./b-plus-node"
import { IDataBlock } from "./idatablock";
import { IKey } from "./ikey";


export class DataNode extends BPlusNode {

    private readonly _numBlocks: number;
    private readonly _movedAtSplit: number;
    private readonly _minBeforeUnderflow: number;

    public get Key() : IKey {
        return this.SmallestKey;
    }

    public get SmallestKey() : IKey {
        return this._children[0].Key;
    }

    constructor(parent: BPlusNode | null, 
        numBlocks: number, moveAtSplit: number, minBeforeUnderflow: number,
        firstBlock: IDataBlock
    ) {
        super(parent, numBlocks);
        this._numBlocks = numBlocks;
        this._movedAtSplit = moveAtSplit;
        this._minBeforeUnderflow = minBeforeUnderflow;
        this._children[this._childrenCount++] = firstBlock;
    }

    public Add(dataBlock: IDataBlock) : BPlusNode | null {
        this._children[this._childrenCount++] = dataBlock;
        return null;
    } 

    public Get(key: IKey): IDataBlock | null {
        const index = this.GetChildIndex(key);
        if (index >= this._childrenCount) {
            return null;
        }
        return this._children[index] as IDataBlock;
    }
}