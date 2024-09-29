import { BPlusNode } from "./b-plus-node";
import { DataNode } from "./data-node";
import { IDataBlock } from "./idatablock";
import { IKey } from "./ikey";
import { TraverseRapport } from "./utils";

/**
 * A B++ Tree implementation in TypeScript.
 */
export class BPlus {

    private readonly ORDER_OF_THE_TREE: number = 5;

    private readonly _orderOfTheTree: number;
    private readonly _numChildMovedAtSplit: number;
    private readonly _minNumChildBeforeUnderflow: number;

    private _root: BPlusNode | null = null;

    constructor(
        orderOfTheTree: number = this.ORDER_OF_THE_TREE,
        numChildMovedAtSplit: number = orderOfTheTree / 2,
        minNumChildBeforeUnderflow: number = orderOfTheTree / 2    
    ) {
        this._orderOfTheTree = orderOfTheTree > 2 ? orderOfTheTree : 2;
        this._numChildMovedAtSplit = numChildMovedAtSplit > 1 ? numChildMovedAtSplit : 1;
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
                this._numChildMovedAtSplit, 
                this._minNumChildBeforeUnderflow, 
                dataBlock);
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

    public GetFirstOnOrAfter(key: IKey) : IDataBlock | null {
        if (this._root != null) {
            return this._root.Get(key);
        }
        else {
            return null;
        }
    }

    public GetWithRapport(key: IKey) : TraverseRapport {
        return new TraverseRapport();
    }
}