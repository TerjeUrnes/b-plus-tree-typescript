import { TraverseRapport } from "./dataclasses/traverserapport";
import { RemoveStatus } from "./enums/removestatus";
import { IDataBlock } from "./idatablock";
import { IKey } from "./ikey";

export abstract class BPlusNode {

    /**
     * Contains the children.
     * Size n + 1, last position is for the child that forces a split.
     */
    protected readonly _children: Array<BPlusNode | IDataBlock>;
    protected _childrenCount: number = 0;
    protected _parentNode: WeakRef<BPlusNode> | null = null;

    public get ChildrenCount(): number {
        return this._childrenCount;
    }

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

    public abstract get Key() : IKey;
    public abstract get SmallestKey(): IKey
    public abstract Get(key: IKey) : IDataBlock | null;
    public abstract Add(dataBlock: IDataBlock) : void;
    public abstract Remove(key: IKey) : RemoveStatus;
    public abstract GetWithRapport(key: IKey, rapport: TraverseRapport) : void;

    constructor(parent: BPlusNode | null, order: number) {
        if (parent != null) {
            this._parentNode = new WeakRef(parent);
        }
        this._children = new Array<BPlusNode | IDataBlock>(order + 1);
    }

    protected InsertChildAtIndex(index: number, child: BPlusNode | IDataBlock) : void {
        for (let i = this._childrenCount; i > index; i--) {
            this._children[i] = this._children[i - 1];
        }
        this._children[index] = child;
        this._childrenCount++;
    }

    protected RemoveChildAtIndex(index: number) : void {
        for (let i = index; i < this._childrenCount - 1; i++) {
            this._children[i] = this._children[i + 1];
        }
        this._childrenCount--;
    }

    protected GetChildIndex(key: IKey) : number {
        for (let i = this._childrenCount - 1; i >= 0; i--) {
            if (key.CompareTo(this._children[i].Key) > 0) {
                return i + 1;
            }
        }
        return 0;
    }

}