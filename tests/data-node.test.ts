import { BPlusNode } from "../b-plus-src/b-plus-node";
import { DataNode } from "../b-plus-src/data-node";
import { TraverseRapport } from "./classes/traverserapport";
import { DataBlock } from "./datablock";
import { DataNodeEx } from "./extensions/data-node-ex.ts";
import { Key } from "./key";
//jest.disableAutomock();
jest.setMock("../b-plus-src/data-node", import("./extensions/data-node-ex.ts"))

describe("Testing new instance", () => {

    var firstKey = new Key(10);
    var instance: DataNode;
    var dataBlock: DataBlock

    beforeEach(() => {
        dataBlock = new DataBlock(firstKey);
        instance = new DataNode(null, 4, 1, 1, dataBlock);
    });

    test("Can init instance", () => {
        expect(instance).toBeInstanceOf(DataNode);
    });

    test("Can get key", () => {
        expect(instance.Key).toBe(firstKey);
    })

    test("Can get smallest key", () => {
        expect(instance.SmallestKey).toBe(firstKey);
    });

    test("Children count is 1", () => {
        expect(instance.ChildrenCount).toBe(1);
    });

    test("Has no parent node", () => {
        expect(instance.ParentNode).toBeNull();
    });

    test("Get back the data block", () => {
        expect(instance.Get(firstKey)).toBe(dataBlock);
    });

    test("Get back the first data block after key", () => {
        var smallerKey = new Key(5);    
        expect(instance.Get(smallerKey)).toBe(dataBlock);
    });

    test("Get back null using a bigger key", () => {
        var biggerKey = new Key(15);
        expect(instance.Get(biggerKey)).toBeNull();
    });

    test("Has correct traverse path", () => {
        var rapport = new TraverseRapport();
        DataNodeEx.GetWithRapport(instance, firstKey, rapport);
        expect(rapport.path).toStrictEqual([["10"]]);
    });
});

describe("Adding 10 blocks to a order 10 node", () => {
    var instance: DataNode;
    var dataBlocks: DataBlock[] = [];
    var correctTraversePath = [["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]];

    beforeEach(() => {
        for (var i = 0; i < 10; i++) {
            var dataBlock = new DataBlock(new Key(i + 1));
            dataBlocks.push(dataBlock);
        }
        instance = new DataNode(null, 10, 1, 1, dataBlocks[0]);
    });

    test("Has correct children count", () => {
        for (var i = 1; i < 10; i++) {
            instance.Add(dataBlocks[i]);
        }
        expect(instance.ChildrenCount).toBe(10);
    });

    test("Adding nodes sequential gives correct traverse path", () => {
        for (var i = 1; i < 10; i++) {
            instance.Add(dataBlocks[i]);
        }
        CheckTraversePath();
    });

    test("Adding nodes reverse gives correct traverse path", () => {
        for (var i = 9; i > 0; i--) {
            instance.Add(dataBlocks[i]);
        }
        CheckTraversePath();
    });

    test("Adding nodes in 'random' order 1 gives correct traverse path", () => {
        instance.Add(dataBlocks[8]);
        instance.Add(dataBlocks[9]);
        instance.Add(dataBlocks[5]);
        instance.Add(dataBlocks[6]);
        instance.Add(dataBlocks[2]);
        instance.Add(dataBlocks[7]);
        instance.Add(dataBlocks[4]);
        instance.Add(dataBlocks[3]);
        instance.Add(dataBlocks[1]);
        CheckTraversePath();
    });

    test("Adding nodes in 'random' order 2 gives correct traverse path", () => {
        instance.Add(dataBlocks[4]);
        instance.Add(dataBlocks[2]);
        instance.Add(dataBlocks[1]);
        instance.Add(dataBlocks[6]);
        instance.Add(dataBlocks[8]);
        instance.Add(dataBlocks[3]);
        instance.Add(dataBlocks[9]);
        instance.Add(dataBlocks[5]);
        instance.Add(dataBlocks[7]);
        CheckTraversePath();
    });

    function CheckTraversePath() {
        var rapport = new TraverseRapport();
        DataNodeEx.GetWithRapport(instance, new Key(5), rapport);
        expect(rapport.path).toStrictEqual(correctTraversePath);
    }
})

describe("Linking between blocks", () => {

    var firstKey = new Key(10);
    var secondKey = new Key(20);
    var instance: DataNode;
    var dataBlock: DataBlock
    var secondDataBlock: DataBlock

    beforeEach(() => {
        dataBlock = new DataBlock(firstKey);
        secondDataBlock = new DataBlock(secondKey);
        instance = new DataNode(null, 4, 1, 1, dataBlock);
        instance.Add(secondDataBlock);
    });

    test("2 blocks can get each others data block", () => {
        expect(dataBlock.Next).toBe(secondDataBlock);
        expect(secondDataBlock.Previous).toBe(dataBlock);
    })

    test("10 block has correct linking", () => {
        
    })
});

describe("Splitting a data node", () => {
    
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

    test("Correct child count in the original node", () => {
        instance.Add(dataBlock2);
        instance.Add(dataBlock3);
        instance.Add(dataBlock4);

        expect(instance.ChildrenCount).toBe(2);
    });

    test("Has correct traverse paths", () => {
        instance.Add(dataBlock2);
        instance.Add(dataBlock3);
        instance.Add(dataBlock4);

        var rapport = new TraverseRapport();
        DataNodeEx.GetWithRapport(instance, new Key(20), rapport);
        expect(rapport.path).toStrictEqual([["10","20"]]);
    })
});