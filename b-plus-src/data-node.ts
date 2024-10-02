import { BPlusNode } from "./b-plus-node"
import { TraverseRapport } from "./dataclasses/traverserapport";
import { RangeToEndpoint } from "./enums/rangetoendpoint";
import { RemoveStatus } from "./enums/removestatus";
import { IDataBlock } from "./idatablock";
import { IKey } from "./ikey";
import { InternalNode } from "./internal-node";


export class DataNode extends BPlusNode {

    public get Key() : IKey {
        return this.SmallestKey;
    }

    public get SmallestKey() : IKey {
        return this._children[0].Key;
    }

    public get DataBlockCount(): number {
        return this._childrenCount;
    } 

    constructor(parent: BPlusNode | null, 
        numBlocks: number, afterAtSplit: number, minBeforeUnderflow: number,
        firstBlock: IDataBlock
    ) {
        super(parent, numBlocks, afterAtSplit, minBeforeUnderflow);
        this._children[this._childrenCount++] = firstBlock;
    }

    public Add(dataBlock: IDataBlock) : BPlusNode | null {
        const index = this.GetChildIndex(dataBlock.Key);
        this.InsertChildAtIndex(index, dataBlock);
        this.UpdateLinkingAfterInsert(index);
        if (this._childrenCount > this._treeOrder) {
            return this.SplitDataNode();
        }
        return null;
    } 

    public Remove(key: IKey) : RemoveStatus {
        const index = this.GetChildIndex(key);
        if (index < this._childrenCount && this._children[index].Key.CompareTo(key) == 0) {
            this.RemoveChildAtIndex(index);
            if (this._childrenCount < this._minBeforeUnderflow) {
                return RemoveStatus.UnderflowAfterRemove;
            }
            else {
                return RemoveStatus.RemovedComplete
            }
        }
        else {
            return RemoveStatus.NotFound;
        }
    }

    public Get(key: IKey): IDataBlock | null {
        const index = this.GetChildIndex(key);
        if (index >= this._childrenCount) {
            return null;
        }
        return this._children[index] as IDataBlock;
    }

    public GetRange(fromKey: IKey, toKey: IKey, toEndpoint: RangeToEndpoint): IDataBlock[] {
        const index = this.GetChildIndex(fromKey);
        let count = 0;
        if (index < this._childrenCount) {
            let next: IDataBlock | null = (this._children[index] as IDataBlock);
            while (next != null && this.HasGotLastBlock(toEndpoint, next, toKey) == false) {
                count++;
                next = next.Next;
            }
        }
        const range = new Array<IDataBlock>(count);
        let next = this._children[index] as IDataBlock;
        for (let i = 0; i < count; i++) {
            range[i] = next;
            if (next.Next != null) {
                next = next.Next;
            }
            else {
                break;
            }
        }
        return range;
    }

    private HasGotLastBlock(endpoint: RangeToEndpoint, next: IDataBlock, toKey: IKey): boolean {
        if(endpoint == RangeToEndpoint.Included && next.Key.CompareTo(toKey) <= 0) {
            return false;
        }
        else if (endpoint == RangeToEndpoint.Excluded && next.Key.CompareTo(toKey) < 0) {
            return false;
        }
        return true;
    }

    public GetWithRapport(key: IKey, rapport: TraverseRapport): void {
        rapport.StepCount++;
        var path = new Array<string>(); 
        for (var i = 0; i < this._childrenCount; i++) {
            path.push(this._children[i].Key.ToString());
        }
        rapport.path.push(path);
    }

    private UpdateLinkingAfterInsert(index: number) : void {
        if (index > 0) {
            const previous = this._children[index - 1] as IDataBlock;
            const current = this._children[index] as IDataBlock;
            previous.Next = current;
            current.Previous = previous;
        }
        if (index < this._childrenCount - 1) {
            const current = this._children[index] as IDataBlock;
            const next = this._children[index + 1] as IDataBlock;
            current.Next = next;
            next.Previous = current;
        }
    }

    private SplitDataNode() : BPlusNode | DataNode {
        const parent = this.ParentNode;
        const newRightNode = new DataNode(parent, this._treeOrder, this._afterAtSplit, 
                        this._minBeforeUnderflow, this._children[this._afterAtSplit] as IDataBlock);
        this.RemoveChildAtIndex(this._afterAtSplit);
        this.SplitNode(newRightNode);
        if (parent == null) {
            const newParent = new InternalNode(parent, this._treeOrder, this._afterAtSplit, this._minBeforeUnderflow, this);
            newParent.AddNode(newRightNode);
            return newParent;
        }
        return newRightNode;
    }
}

