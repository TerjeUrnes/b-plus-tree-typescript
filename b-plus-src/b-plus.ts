import { BPlusNode } from "./b-plus-node";
import { IDataBlock } from "./idatablock";
import { IKey } from "./ikey";
import { TraverseRapport } from "./utils";

/**
 * A B++ Tree implementation in TypeScript.
 */
export class BPlus {

    public get DataBlocksCount() : number {
        return 0;
    }

    constructor() {}

    public Get(key: IKey) : IDataBlock | null {
        return null;
    }

    public GetFirstOnOrAfter(key: IKey) : IDataBlock | null {
        return null;
    }

    public GetWithRapport(key: IKey) : TraverseRapport {
        return new TraverseRapport();
    }
}