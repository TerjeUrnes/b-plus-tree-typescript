import { BPlusNode } from "./b-plus-node";
import { TraverseRapport } from "./utils";

/**
 * A B++ Tree implementation in TypeScript.
 */
export class BPlus {

    public get DataBlocksCount() : number {
        return 0;
    }

    constructor() {}

    public GetWithRapport(key: number) : TraverseRapport {
        return new TraverseRapport();
    }
}