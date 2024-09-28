"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalNode = void 0;
const b_plus_node_1 = require("./b-plus-node");
class InternalNode extends b_plus_node_1.BPlusNode {
    get SmallestKey() {
        return this._keys[0];
    }
    constructor() {
        super(0);
    }
}
exports.InternalNode = InternalNode;
