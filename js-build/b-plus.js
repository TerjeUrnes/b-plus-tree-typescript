"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPlus = void 0;
const data_node_1 = require("./data-node");
const traverserapport_1 = require("./dataclasses/traverserapport");
const removestatus_1 = require("./enums/removestatus");
/**
 * A B++ Tree implementation in TypeScript.
 */
class BPlus {
    get Count() {
        return this._dataBlockCount;
    }
    constructor(orderOfTheTree = this.ORDER_OF_THE_TREE, numChildAfterSplit = orderOfTheTree / 2, minNumChildBeforeUnderflow = orderOfTheTree / 2) {
        this.ORDER_OF_THE_TREE = 5;
        this._root = null;
        this._dataBlockCount = 0;
        this._orderOfTheTree = orderOfTheTree > 2 ? orderOfTheTree : 2;
        this._numChildAfterSplit = numChildAfterSplit > 1 ? numChildAfterSplit : 1;
        this._minNumChildBeforeUnderflow = minNumChildBeforeUnderflow > 1 ? minNumChildBeforeUnderflow : 1;
    }
    Add(dataBlock) {
        if (this._root != null) {
            this._root.Add(dataBlock);
        }
        else {
            this._root = new data_node_1.DataNode(null, this._orderOfTheTree, this._numChildAfterSplit, this._minNumChildBeforeUnderflow, dataBlock);
        }
        this._dataBlockCount++;
    }
    Remove(key) {
        var removeStatus = removestatus_1.RemoveStatus.Unknown;
        if (this._root != null) {
            removeStatus = this._root.Remove(key);
        }
        if (removeStatus != removestatus_1.RemoveStatus.NotFound && removeStatus != removestatus_1.RemoveStatus.Unknown) {
            this._dataBlockCount--;
            if (this._dataBlockCount == 0) {
                this._root = null;
            }
        }
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
    GetRange(fromKey, toKey, toEndpoint) {
        if (this._root != null) {
            return this._root.GetRange(fromKey, toKey, toEndpoint);
        }
        return null;
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
        var rapport = new traverserapport_1.TraverseRapport();
        if (this._root != null) {
            this._root.GetWithRapport(key, rapport);
        }
        return rapport;
    }
}
exports.BPlus = BPlus;
