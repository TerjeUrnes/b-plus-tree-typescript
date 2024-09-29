import { BPlus } from "../b-plus-src/b-plus";
import { DataBlock } from "./datablock";
import { Key } from "./key";

describe('Empty instance', () => {

    var instance: BPlus

    beforeEach( () => {
        instance = new BPlus();
    });

    test("Can init instance", () => {
        expect(instance).toBeInstanceOf(BPlus);
    });

    test("Finds no block, and get null", () => {
        expect(instance.GetFirstOnOrAfter(new Key(0))).toBeNull();
    })

    test("Has no nodes to step through", () => {
        var rapport = instance.GetWithRapport(new Key(0));
        expect(rapport.StepCount).toBe(0);
    });
});

describe("Instance with 1 data block", () => {

    var instance: BPlus
    var key: Key = new Key(0);
    var dataBlock: DataBlock;

    beforeEach( () => {
        instance = new BPlus();
        dataBlock = new DataBlock(key);
    });

    test("Adding block increases count", () => {
        instance.Add(dataBlock);
        expect(instance.Count).toBe(1);
    })

    
}) 