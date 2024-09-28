import { BPlusNode } from "./b-plus-node"
import { IDataBlock } from "./idatablock";
import { IKey } from "./ikey";


export class DataNode extends BPlusNode {

    private readonly _numBlocks: number;
    private readonly _movedAtSplit: number;
    private readonly _minBeforeUnderflow: number;

    private _dataBlocks: Array<IDataBlock>

    public get SmallestKey() : IKey {
        return this._dataBlocks[0].Key;
    }

    constructor(numBlocks: number, moveAtSplit: number, minBeforeUnderflow: number,
        firstBlock: IDataBlock
    ) {
        super(numBlocks);
        this._numBlocks = numBlocks;
        this._movedAtSplit = moveAtSplit;
        this._minBeforeUnderflow = minBeforeUnderflow;
        this._dataBlocks = new Array<IDataBlock>(numBlocks + 1);
        this._dataBlocks[0] = firstBlock;
    }
}