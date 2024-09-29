import { DataNode } from "../b-plus-src/data-node";
import { DataBlock } from "./datablock";
import { Key } from "./key";

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
    })

    test("Get back the first data block after key", () => {
        var smallerKey = new Key(5);    
        expect(instance.Get(smallerKey)).toBe(dataBlock);
    })

    test("Get back null using a bigger key", () => {
        var biggerKey = new Key(15);
        expect(instance.Get(biggerKey)).toBeNull();
    })
});