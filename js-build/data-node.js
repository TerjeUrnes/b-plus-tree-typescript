"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataNode = void 0;
const b_plus_node_1 = require("./b-plus-node");
const removestatus_1 = require("./enums/removestatus");
class DataNode extends b_plus_node_1.BPlusNode {
    get Key() {
        return this.SmallestKey;
    }
    get SmallestKey() {
        return this._children[0].Key;
    }
    constructor(parent, numBlocks, afterAtSplit, minBeforeUnderflow, firstBlock) {
        super(parent, numBlocks);
        this._numBlocks = numBlocks;
        this._afterAtSplit = afterAtSplit;
        this._minBeforeUnderflow = minBeforeUnderflow;
        this._children[this._childrenCount++] = firstBlock;
    }
    Add(dataBlock) {
        this._children[this._childrenCount++] = dataBlock;
        return null;
    }
    Remove(key) {
        const index = this.GetChildIndex(key);
        if (index < this._childrenCount && this._children[index].Key.CompareTo(key) == 0) {
            this.RemoveChildAtIndex(index);
            if (this._childrenCount < this._minBeforeUnderflow) {
                return removestatus_1.RemoveStatus.UnderflowAfterRemove;
            }
            else {
                return removestatus_1.RemoveStatus.RemovedComplete;
            }
        }
        else {
            return removestatus_1.RemoveStatus.NotFound;
        }
    }
    Get(key) {
        const index = this.GetChildIndex(key);
        if (index >= this._childrenCount) {
            return null;
        }
        return this._children[index];
    }
}
exports.DataNode = DataNode;
