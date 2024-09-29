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

    test("Can get smallest key", () => {
        expect(instance.SmallestKey).toBe(firstKey);
    });
});