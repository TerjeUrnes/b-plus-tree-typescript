import { BPlusNode } from "./b-plus-node"
import { IDataBlock } from "./idatablock";
import { IKey } from "./ikey";


export class DataNode extends BPlusNode {

    private readonly _numBlocks: number;
    private readonly _movedAtSplit: number;
    private readonly _minBeforeUnderflow: number;

    private _dataBlocks: Array<IDataBlock>
    private _blockCount: number = 0;

    public get SmallestKey() : IKey {
        return this._dataBlocks[0].Key;
    }

    constructor(parent: BPlusNode | null, 
        numBlocks: number, moveAtSplit: number, minBeforeUnderflow: number,
        firstBlock: IDataBlock
    ) {
        super(parent, numBlocks);
        this._numBlocks = numBlocks;
        this._movedAtSplit = moveAtSplit;
        this._minBeforeUnderflow = minBeforeUnderflow;
        this._dataBlocks = new Array<IDataBlock>(numBlocks + 1);
        this._dataBlocks[0] = firstBlock;
        this._blockCount++;
    }

    public Add(dataBlock: IDataBlock) : BPlusNode | null {
        this._dataBlocks[this._blockCount++] = dataBlock;
        return null;
    } 

    public Get(key: IKey): IDataBlock | null {
        return null;
    }
}