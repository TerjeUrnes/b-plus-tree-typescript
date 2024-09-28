"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPlusNode = void 0;
class BPlusNode {
    constructor(numKeys) {
        this._keys = new Array(numKeys + 1);
    }
}
exports.BPlusNode = BPlusNode;
