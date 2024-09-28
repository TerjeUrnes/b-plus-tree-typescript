"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPlus = void 0;
const utils_1 = require("./utils");
/**
 * A B++ Tree implementation in TypeScript.
 */
class BPlus {
    constructor(orderOfTheTree = this.ORDER_OF_THE_TREE, numChildMovedAtSplit = orderOfTheTree / 2, minNumChildBeforeUnderflow = orderOfTheTree / 2) {
        this.ORDER_OF_THE_TREE = 5;
        this._root = null;
        this._orderOfTheTree = orderOfTheTree > 2 ? orderOfTheTree : 2;
        this._numChildMovedAtSplit = numChildMovedAtSplit > 1 ? numChildMovedAtSplit : 1;
        this._minNumChildBeforeUnderflow = minNumChildBeforeUnderflow > 1 ? minNumChildBeforeUnderflow : 1;
    }
    Get(key) {
        return null;
    }
    GetFirstOnOrAfter(key) {
        return null;
    }
    GetWithRapport(key) {
        return new utils_1.TraverseRapport();
    }
}
exports.BPlus = BPlus;
