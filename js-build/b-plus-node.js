"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPlusNode = void 0;
class BPlusNode {
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
    constructor(parent, numKeys) {
        this._parentNode = null;
        if (parent != null) {
            this._parentNode = new WeakRef(parent);
        }
        this._keys = new Array(numKeys + 1);
    }
}
exports.BPlusNode = BPlusNode;
