import { BPlusNode } from "./b-plus-node"
import { TraverseRapport } from "./dataclasses/traverserapport";
import { RemoveStatus } from "./enums/removestatus";
import { IDataBlock } from "./idatablock";
import { IKey } from "./ikey";


export class DataNode extends BPlusNode {

    private readonly _numBlocks: number;
    private readonly _afterAtSplit: number;
    private readonly _minBeforeUnderflow: number;

    public get Key() : IKey {
        return this.SmallestKey;
    }

    public get SmallestKey() : IKey {
        return this._children[0].Key;
    }

    constructor(parent: BPlusNode | null, 
        numBlocks: number, afterAtSplit: number, minBeforeUnderflow: number,
        firstBlock: IDataBlock
    ) {
        super(parent, numBlocks);
        this._numBlocks = numBlocks;
        this._afterAtSplit = afterAtSplit;
        this._minBeforeUnderflow = minBeforeUnderflow;
        this._children[this._childrenCount++] = firstBlock;
    }

    public Add(dataBlock: IDataBlock) : BPlusNode | null {
        const index = this.GetChildIndex(dataBlock.Key);
        this.InsertChildAtIndex(index, dataBlock);
        this.UpdateLinkingAfterInsert(index);
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
}