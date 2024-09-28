"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPlus = void 0;
const utils_1 = require("./utils");
/**
 * A B++ Tree implementation in TypeScript.
 */
class BPlus {
    get DataBlocksCount() {
        return 0;
    }
    constructor() { }
    GetWithRapport(key) {
        return new utils_1.TraverseRapport();
    }
}
exports.BPlus = BPlus;
