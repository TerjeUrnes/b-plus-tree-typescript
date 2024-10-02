import { BPlusNode } from "./b-plus-node";
import { DataNode } from "./data-node";
import { IDataBlock } from "./idatablock";
import { IKey } from "./ikey";
import { TraverseRapport } from "./dataclasses/traverserapport";
import { RemoveStatus } from "./enums/removestatus";
import { RangeToEndpoint } from "./enums/rangetoendpoint";

/**
 * A B++ Tree implementation in TypeScript.
 */
export class BPlus {

    private readonly ORDER_OF_THE_TREE: number = 5;

    private readonly _orderOfTheTree: number;
    private readonly _numChildAfterSplit: number;
    private readonly _minNumChildBeforeUnderflow: number;

    private _root: BPlusNode | null = null;

    private _dataBlockCount: number = 0;

    public get Count(): number {
        return this._dataBlockCount;
    }

    constructor(
        orderOfTheTree: number = this.ORDER_OF_THE_TREE,
        numChildAfterSplit: number = orderOfTheTree / 2,
        minNumChildBeforeUnderflow: number = orderOfTheTree / 2    
    ) {
        this._orderOfTheTree = orderOfTheTree > 2 ? orderOfTheTree : 2;
        this._numChildAfterSplit = numChildAfterSplit > 1 ? numChildAfterSplit : 1;
        this._minNumChildBeforeUnderflow = minNumChildBeforeUnderflow > 1 ? minNumChildBeforeUnderflow : 1;
    }

    public Add(dataBlock: IDataBlock) : void {
        if (this._root != null) {
           this._root.Add(dataBlock);
        }
        else {
            this._root = new DataNode(
                null,
                this._orderOfTheTree,
                this._numChildAfterSplit, 
                this._minNumChildBeforeUnderflow, 
                dataBlock);
        }
        this._dataBlockCount++;
    }

    public Remove(key: IKey) : void {
        var removeStatus: RemoveStatus = RemoveStatus.Unknown;
        if (this._root != null) {
            removeStatus = this._root.Remove(key);
        }
        if (removeStatus != RemoveStatus.NotFound && removeStatus != RemoveStatus.Unknown) {
            this._dataBlockCount--;
            if (this._dataBlockCount == 0) {
                this._root = null;
            } 
        }
    }

    public Get(key: IKey) : IDataBlock | null {
        const result = this.GetFirstOnOrAfter(key);
        if(result != null && key.CompareTo(result.Key) == 0) {
            return result;
        }
        else {
            return null;
        }
    }

    public GetRange(fromKey: IKey, toKey: IKey, toEndpoint: RangeToEndpoint) : IDataBlock[] | null {
        if (this._root != null) {
            return this._root.GetRange(fromKey, toKey, toEndpoint);
        }
        return null;
    }

    public GetFirstOnOrAfter(key: IKey) : IDataBlock | null {
        if (this._root != null) {
            return this._root.Get(key);
        }
        else {
            return null;
        }
    }

    public GetWithRapport(key: IKey) : TraverseRapport {
        var rapport = new TraverseRapport();
        if (this._root != null) {
            this._root.GetWithRapport(key, rapport);
        }
        return rapport;
    }
}