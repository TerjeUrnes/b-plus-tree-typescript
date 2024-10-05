export class BPlusNode {
    /**
     * Contains the children.
     * Size n + 1, last position is for the child that forces a split.
     */
    _children;
    _childrenCount = 0;
    _parentNode = null;
    _treeOrder;
    _afterAtSplit;
    _minBeforeUnderflow;
    get Children() {
        return this._children;
    }
    get ChildrenCount() {
        return this._childrenCount;
    }
    get ParentNode() {
        if (this._parentNode === null) {
            return null;
        }
        var parent = this._parentNode.deref();
        if (parent) {
            return parent;
        }
        return null;
    }
    set ParentNode(parent) {
        this._parentNode = new WeakRef(parent);
    }
    constructor(parent, order, afterAtSplit, minBeforeUnderflow) {
        if (parent != null) {
            this._parentNode = new WeakRef(parent);
        }
        this._children = new Array(order + 1);
        this._treeOrder = order;
        this._afterAtSplit = afterAtSplit;
        this._minBeforeUnderflow = minBeforeUnderflow;
    }
    InsertChildAtIndex(index, child) {
        for (let i = this._childrenCount; i > index; i--) {
            this._children[i] = this._children[i - 1];
        }
        this._children[index] = child;
        this._childrenCount++;
    }
    RemoveChildAtIndex(index) {
        for (let i = index; i < this._childrenCount - 1; i++) {
            this._children[i] = this._children[i + 1];
        }
        this._childrenCount--;
    }
    GetChildIndex(key) {
        return this.GetChildFindIndex(key);
    }
    GetChildFindIndex(key) {
        for (let i = this._childrenCount - 1; i >= 0; i--) {
            if (key.CompareTo(this._children[i].Key) >= 0) {
                return i;
            }
        }
        return 0;
    }
    GetChildInsertIndex(key) {
        for (let i = this._childrenCount - 1; i >= 0; i--) {
            if (key.CompareTo(this._children[i].Key) > 0) {
                return i + 1;
            }
        }
        return 0;
    }
    SplitNode(newRightNode) {
        for (let i = this._afterAtSplit; i < this._childrenCount; i++) {
            newRightNode.Add(this._children[i]);
        }
        for (let i = this._childrenCount - 1; i >= this._afterAtSplit; i--) {
            this.RemoveChildAtIndex(i);
        }
    }
}
