"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPlus = void 0;
const data_node_1 = require("./data-node");
const utils_1 = require("./utils");
/**
 * A B++ Tree implementation in TypeScript.
 */
class BPlus {
    get Count() {
        return this._dataBlockCount;
    }
    constructor(orderOfTheTree = this.ORDER_OF_THE_TREE, numChildMovedAtSplit = orderOfTheTree / 2, minNumChildBeforeUnderflow = orderOfTheTree / 2) {
        this.ORDER_OF_THE_TREE = 5;
        this._root = null;
        this._dataBlockCount = 0;
        this._orderOfTheTree = orderOfTheTree > 2 ? orderOfTheTree : 2;
        this._numChildMovedAtSplit = numChildMovedAtSplit > 1 ? numChildMovedAtSplit : 1;
        this._minNumChildBeforeUnderflow = minNumChildBeforeUnderflow > 1 ? minNumChildBeforeUnderflow : 1;
    }
    Add(dataBlock) {
        if (this._root != null) {
            this._root.Add(dataBlock);
        }
        else {
            this._root = new data_node_1.DataNode(null, this._orderOfTheTree, this._numChildMovedAtSplit, this._minNumChildBeforeUnderflow, dataBlock);
        }
        this._dataBlockCount++;
    }
    Get(key) {
        const result = this.GetFirstOnOrAfter(key);
        if (result != null && key.CompareTo(result.Key) == 0) {
            return result;
        }
        else {
            return null;
        }
    }
    GetFirstOnOrAfter(key) {
        if (this._root != null) {
            return this._root.Get(key);
        }
        else {
            return null;
        }
    }
    GetWithRapport(key) {
        return new utils_1.TraverseRapport();
    }
}
exports.BPlus = BPlus;
