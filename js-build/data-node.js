"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataNode = void 0;
const b_plus_node_1 = require("./b-plus-node");
class DataNode extends b_plus_node_1.BPlusNode {
    get SmallestKey() {
        return this._dataBlocks[0].Key;
    }
    constructor(parent, numBlocks, moveAtSplit, minBeforeUnderflow, firstBlock) {
        super(parent, numBlocks);
        this._blockCount = 0;
        this._numBlocks = numBlocks;
        this._movedAtSplit = moveAtSplit;
        this._minBeforeUnderflow = minBeforeUnderflow;
        this._dataBlocks = new Array(numBlocks + 1);
        this._dataBlocks[0] = firstBlock;
        this._blockCount++;
    }
    Add(dataBlock) {
        this._dataBlocks[this._blockCount++] = dataBlock;
        return null;
    }
    Get(key) {
        return null;
    }
}
exports.DataNode = DataNode;
