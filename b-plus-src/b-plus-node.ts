import { IDataBlock } from "./idatablock";
import { IKey } from "./ikey";

export abstract class BPlusNode {

    /**
     * Contains the keys.
     * Size n + 1, last position is for the key that forces a split.
     */
    protected readonly _keys: Array<IKey>;

    protected _parentNode: WeakRef<BPlusNode> | null = null;

    public get ParentNode(): BPlusNode | null {
        if (this._parentNode === null) {
            return null;
        }
        var parent = this._parentNode.deref();
        if (parent) {
            return parent;
        }
        return null;
    }
    public set ParentNode(parent: BPlusNode) {
        this._parentNode = new WeakRef(parent);
    }

    public abstract get SmallestKey() : IKey;
    public abstract Get(key: IKey) : IDataBlock | null;
    public abstract Add(dataBlock: IDataBlock) : void;

    constructor(parent: BPlusNode | null, numKeys: number) {
        if (parent != null) {
            this._parentNode = new WeakRef(parent);
        }
        this._keys = new Array<IKey>(numKeys + 1);
    }



}