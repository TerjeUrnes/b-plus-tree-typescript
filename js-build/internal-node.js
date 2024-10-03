"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalNode = void 0;
const b_plus_node_1 = require("./b-plus-node");
const removestatus_1 = require("./enums/removestatus");
class InternalNode extends b_plus_node_1.BPlusNode {
    get Key() {
        return this._key;
    }
    get SmallestKey() {
        return this._children[0].SmallestKey;
    }
    get DataBlockCount() {
        let count = 0;
        for (let i = 0; i < this._childrenCount; i++) {
            count += this._children[i].DataBlockCount;
        }
        return count;
    }
    constructor(parent, numBlocks, afterAtSplit, minBeforeUnderflow, firstNode) {
        super(parent, numBlocks, afterAtSplit, minBeforeUnderflow);
        this._children[this._childrenCount++] = firstNode;
        this._key = this.SmallestKey;
    }
    Add(dataBlock) {
        const index = this.GetChildInsertIndex(dataBlock.Key);
        const result = this._children[index].Add(dataBlock);
        if (result != null) {
            this.InsertChildAtIndex(index + 1, result);
        }
        if (this._childrenCount > this._treeOrder) {
            return this.SplitInternalNode();
        }
        return null;
    }
    AddNode(node) {
        const index = this.GetChildInsertIndex(node.SmallestKey);
        this.InsertChildAtIndex(index, node);
    }
    Remove(key) {
        return removestatus_1.RemoveStatus.Unknown;
    }
    Get(key) {
        throw new Error("Method not implemented.");
    }
    GetRange(fromKey, toKey, toEndpoint) {
        const index = this.GetChildInsertIndex(fromKey);
        return this._children[index].GetRange(fromKey, toKey, toEndpoint);
    }
    GetWithRapport(key, rapport) {
        rapport.StepCount++;
        var path = new Array();
        for (var i = 0; i < this._childrenCount; i++) {
            path.push(this._children[i].Key.ToString());
        }
        rapport.path.push(path);
        const index = this.GetChildFindIndex(key);
        this._children[index].GetWithRapport(key, rapport);
    }
    SplitInternalNode() {
        return this;
    }
}
exports.InternalNode = InternalNode;
