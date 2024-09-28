import { IKey } from "./ikey";

export abstract class BPlusNode {

    /**
     * Contains the keys.
     * Size n + 1, last position is for the key that forces a split.
     */
    protected readonly _keys: Array<IKey>;

    public abstract get SmallestKey() : IKey;

    constructor(numKeys: number) {
        this._keys = new Array<IKey>(numKeys + 1)
    }

}