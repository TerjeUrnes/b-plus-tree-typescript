import { BPlusNode } from "./b-plus-node.js";
import { RemoveStatus } from "./enums/removestatus.js";
export class InternalNode extends BPlusNode {
    _key;
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
        return RemoveStatus.Unknown;
    }
    Get(key) {
        throw new Error("Method not implemented.");
    }
    GetRange(fromKey, toKey, toEndpoint) {
        const index = this.GetChildInsertIndex(fromKey);
        return this._children[index].GetRange(fromKey, toKey, toEndpoint);
    }
    SplitInternalNode() {
        return this;
    }
}
