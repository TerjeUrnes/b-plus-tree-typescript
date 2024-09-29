"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPlusNode = void 0;
class BPlusNode {
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
    constructor(parent, order) {
        this._childrenCount = 0;
        this._parentNode = null;
        if (parent != null) {
            this._parentNode = new WeakRef(parent);
        }
        this._children = new Array(order + 1);
    }
    GetChildIndex(key) {
        for (let i = this._childrenCount - 1; i >= 0; i--) {
            if (key.CompareTo(this._children[i].Key) > 0) {
                return i + 1;
            }
        }
        return 0;
    }
}
exports.BPlusNode = BPlusNode;
