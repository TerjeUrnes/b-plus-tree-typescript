"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataNode = void 0;
const b_plus_node_1 = require("./b-plus-node");
class DataNode extends b_plus_node_1.BPlusNode {
    get Key() {
        return this.SmallestKey;
    }
    get SmallestKey() {
        return this._children[0].Key;
    }
    constructor(parent, numBlocks, moveAtSplit, minBeforeUnderflow, firstBlock) {
        super(parent, numBlocks);
        this._numBlocks = numBlocks;
        this._movedAtSplit = moveAtSplit;
        this._minBeforeUnderflow = minBeforeUnderflow;
        this._children[this._childrenCount++] = firstBlock;
    }
    Add(dataBlock) {
        this._children[this._childrenCount++] = dataBlock;
        return null;
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
