"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalNode = void 0;
const b_plus_node_1 = require("./b-plus-node");
class InternalNode extends b_plus_node_1.BPlusNode {
    get Key() {
        return this._key;
    }
    get SmallestKey() {
        return this._children[0].SmallestKey;
    }
    constructor(firstNode) {
        super(null, 0);
        this._key = firstNode.SmallestKey;
    }
    Add(dataBlock) {
        throw new Error("Method not implemented.");
    }
    Get(key) {
        throw new Error("Method not implemented.");
    }
}
exports.InternalNode = InternalNode;
