import { BPlusNode } from "./b-plus-node.js";
import { RangeToEndpoint } from "./enums/rangetoendpoint.js";
import { RemoveStatus } from "./enums/removestatus.js";
import { InternalNode } from "./internal-node.js";
export class DataNode extends BPlusNode {
    get Key() {
        return this.SmallestKey;
    }
    get SmallestKey() {
        return this._children[0].Key;
    }
    get DataBlockCount() {
        return this._childrenCount;
    }
    constructor(parent, numBlocks, afterAtSplit, minBeforeUnderflow, firstBlock) {
        super(parent, numBlocks, afterAtSplit, minBeforeUnderflow);
        this._children[this._childrenCount++] = firstBlock;
    }
    Add(dataBlock) {
        const index = this.GetChildInsertIndex(dataBlock.Key);
        this.InsertChildAtIndex(index, dataBlock);
        this.UpdateLinkingAfterInsert(index);
        if (this._childrenCount > this._treeOrder) {
            return this.SplitDataNode();
        }
        return null;
    }
    Remove(key) {
        const index = this.GetChildInsertIndex(key);
        if (index < this._childrenCount && this._children[index].Key.CompareTo(key) == 0) {
            this.RemoveChildAtIndex(index);
            if (this._childrenCount < this._minBeforeUnderflow) {
                return RemoveStatus.UnderflowAfterRemove;
            }
            else {
                return RemoveStatus.RemovedComplete;
            }
        }
        else {
            return RemoveStatus.NotFound;
        }
    }
    Get(key) {
        const index = this.GetChildInsertIndex(key);
        if (index >= this._childrenCount) {
            return null;
        }
        return this._children[index];
    }
    GetRange(fromKey, toKey, toEndpoint) {
        const index = this.GetChildInsertIndex(fromKey);
        let count = 0;
        if (index < this._childrenCount) {
            let next = this._children[index];
            while (next != null && this.HasGotLastBlock(toEndpoint, next, toKey) == false) {
                count++;
                next = next.Next;
            }
        }
        const range = new Array(count);
        let next = this._children[index];
        for (let i = 0; i < count; i++) {
            range[i] = next;
            if (next.Next != null) {
                next = next.Next;
            }
            else {
                break;
            }
        }
        return range;
    }
    HasGotLastBlock(endpoint, next, toKey) {
        if (endpoint == RangeToEndpoint.Included && next.Key.CompareTo(toKey) <= 0) {
            return false;
        }
        else if (endpoint == RangeToEndpoint.Excluded && next.Key.CompareTo(toKey) < 0) {
            return false;
        }
        return true;
    }
    UpdateLinkingAfterInsert(index) {
        if (index > 0) {
            const previous = this._children[index - 1];
            const current = this._children[index];
            previous.Next = current;
            current.Previous = previous;
        }
        if (index < this._childrenCount - 1) {
            const current = this._children[index];
            const next = this._children[index + 1];
            current.Next = next;
            next.Previous = current;
        }
    }
    SplitDataNode() {
        const parent = this.ParentNode;
        const newRightNode = new DataNode(parent, this._treeOrder, this._afterAtSplit, this._minBeforeUnderflow, this._children[this._afterAtSplit]);
        this.RemoveChildAtIndex(this._afterAtSplit);
        this.SplitNode(newRightNode);
        if (parent == null) {
            const newParent = new InternalNode(parent, this._treeOrder, this._afterAtSplit, this._minBeforeUnderflow, this);
            newParent.AddNode(newRightNode);
            this.ParentNode = newParent;
            return newParent;
        }
        return newRightNode;
    }
}
