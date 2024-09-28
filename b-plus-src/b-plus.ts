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

    public Get(key: IKey) : IDataBlock | null {
        return null;
    }

    public GetFirstOnOrAfter(key: IKey) : IDataBlock | null {
        return null;
    }

    public GetWithRapport(key: IKey) : TraverseRapport {
        return new TraverseRapport();
    }
}