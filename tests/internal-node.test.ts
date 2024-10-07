import { BPlusNode } from "../b-plus-src/b-plus-node";
import { DataNode } from "../b-plus-src/data-node";
import { TraverseRapport } from "./classes/traverserapport";
import { InternalNode } from "../b-plus-src/internal-node";
import { DataBlock } from "./datablock";
import { Key } from "./key";
import { InternalNodeEx } from "./extensions/internal-node-ex.ts";


describe("Splitting one data node", () => {
    
    let instance: DataNode; 
    let dataBlock1: DataBlock;
    let dataBlock2: DataBlock;
    let dataBlock3: DataBlock;
    let dataBlock4: DataBlock;

    beforeEach(() => {
        dataBlock1 = new DataBlock(new Key(10));
        dataBlock2 = new DataBlock(new Key(20));
        dataBlock3 = new DataBlock(new Key(30));
        dataBlock4 = new DataBlock(new Key(40));
        instance = new DataNode(null, 3, 2, 1, dataBlock1);
    });

    test("Single split returns a internal node", () => {
        instance.Add(dataBlock2);
        instance.Add(dataBlock3);
        var newRoot = instance.Add(dataBlock4);

        expect(newRoot).toBeInstanceOf(InternalNode);
    });

    test("Correct child count after split", () => {
        instance.Add(dataBlock2);
        instance.Add(dataBlock3);
        var newRoot = instance.Add(dataBlock4) as BPlusNode;

        expect(newRoot.ChildrenCount).toBe(2);
    });

    test("Correct data block count after split", () => {
        instance.Add(dataBlock2);
        instance.Add(dataBlock3);
        var newRoot = instance.Add(dataBlock4) as BPlusNode;

        expect(newRoot.DataBlockCount).toBe(4);
    });

    test("Has correct traverse paths", () => {
        instance.Add(dataBlock2);
        instance.Add(dataBlock3);
        var newRoot = instance.Add(dataBlock4) as InternalNode;

        var rapport = new TraverseRapport();
        InternalNodeEx.GetWithRapport(newRoot, new Key(30), rapport);
        expect(rapport.path).toStrictEqual([["10","30"],["30","40"]]);

        rapport = new TraverseRapport();
        InternalNodeEx.GetWithRapport(newRoot, new Key(20), rapport);
        expect(rapport.path).toStrictEqual([["10","30"],["10","20"]]);
    });
});

describe("Filling up a order 10 internal node", () => {
    let leftDataInstance: DataNode;
    let dataBlocks: DataBlock[] = [];

    beforeEach(() => {
        dataBlocks = [];
        for (let i = 0; i < 18; i++) {
            dataBlocks.push(new DataBlock(new Key(i + 1)));
        }
        leftDataInstance = new DataNode(null, 10, 8, 1, dataBlocks[0]);
    });

    test("Adding blocks sequential give correct traverse path", () => {
        for (let i = 1; i < 10; i++) {
            leftDataInstance.Add(dataBlocks[i]);
        }
        let internalNode = leftDataInstance.Add(dataBlocks[10]) as InternalNode;
        for (let i = 11; i < 18; i++) {
            internalNode.Add(dataBlocks[i]);
        } 

        var rapport = new TraverseRapport();
        InternalNodeEx.GetWithRapport(internalNode, new Key(5), rapport);
        expect(rapport.path).toStrictEqual([["1","9"],["1","2","3","4","5","6","7","8"]]);

        rapport = new TraverseRapport();
        InternalNodeEx.GetWithRapport(internalNode, new Key(14), rapport);
        expect(rapport.path).toStrictEqual([["1","9"], ["9","10","11","12","13","14","15","16","17","18"]]);

    })
})