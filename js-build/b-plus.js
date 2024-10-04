import { DataNode } from "./data-node";
import { RemoveStatus } from "./enums/removestatus";
/**
 * A B++ Tree implementation in TypeScript.
 */
export class BPlus {
    ORDER_OF_THE_TREE = 5;
    _orderOfTheTree;
    _numChildAfterSplit;
    _minNumChildBeforeUnderflow;
    _root = null;
    _dataBlockCount = 0;
    get RootNode() {
        return this._root;
    }
    get Count() {
        return this._dataBlockCount;
    }
    constructor(orderOfTheTree = this.ORDER_OF_THE_TREE, numChildAfterSplit = orderOfTheTree / 2, minNumChildBeforeUnderflow = orderOfTheTree / 2) {
        this._orderOfTheTree = orderOfTheTree > 2 ? orderOfTheTree : 2;
        this._numChildAfterSplit = numChildAfterSplit > 1 ? numChildAfterSplit : 1;
        this._minNumChildBeforeUnderflow = minNumChildBeforeUnderflow > 1 ? minNumChildBeforeUnderflow : 1;
    }
    Add(dataBlock) {
        if (this._root != null) {
            this._root.Add(dataBlock);
        }
        else {
            this._root = new DataNode(null, this._orderOfTheTree, this._numChildAfterSplit, this._minNumChildBeforeUnderflow, dataBlock);
        }
        this._dataBlockCount++;
    }
    Remove(key) {
        var removeStatus = RemoveStatus.Unknown;
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
    Get(key) {
        const result = this.GetFirst(key);
        if (result != null && key.CompareTo(result.Key) == 0) {
            return result;
        }
        else {
            return null;
        }
    }
    GetRange(fromKey, toKey, toEndpoint) {
        if (this._root != null) {
            return this._root.GetRange(fromKey, toKey, toEndpoint);
        }
        return [];
    }
    GetFirst(key) {
        if (this._root != null) {
            return this._root.Get(key);
        }
        else {
            return null;
        }
    }
}
