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
    var key: Key = new Key(10);
    var dataBlock: DataBlock;

    beforeEach( () => {
        instance = new BPlus();
        dataBlock = new DataBlock(key);
    });

    test("Count has increased", () => {
        expect(instance.Count).toBe(0);
        instance.Add(dataBlock);
        expect(instance.Count).toBe(1);
    });

    test("Get the block back with same key", () => {
        instance.Add(dataBlock);
        expect(instance.Get(key)).toBe(dataBlock);
        expect(instance.GetFirstOnOrAfter(key)).toBe(dataBlock);
    });

    test("Get null for other keys", () => {
        instance.Add(dataBlock);
        expect(instance.Get(new Key(1))).toBeNull();
        expect(instance.Get(new Key(5))).toBeNull();
        expect(instance.Get(new Key(11))).toBeNull();
    });

    test("Get the first block with a smaller keys", () => {
        instance.Add(dataBlock);
        expect(instance.GetFirstOnOrAfter(new Key(3))).toBe(dataBlock);
        expect(instance.GetFirstOnOrAfter(new Key(9))).toBe(dataBlock);
    });

    test("Get null for a larger key", () => {
        instance.Add(dataBlock);
        expect(instance.GetFirstOnOrAfter(new Key(11))).toBeNull();
    }); 

    test("Removing the block decrease count", () => {
        instance.Add(dataBlock);
        expect(instance.Count).toBe(1);
        instance.Remove(key);
        expect(instance.Count).toBe(0);
    });

    test("Try to remove with wrong keys do not change count", () => {
        instance.Add(dataBlock);
        expect(instance.Count).toBe(1);
        instance.Remove(new Key(1));
        expect(instance.Count).toBe(1);
        instance.Remove(new Key(5));
        expect(instance.Count).toBe(1);
        instance.Remove(new Key(12));
        expect(instance.Count).toBe(1);
    });

    test("Get null after removing the block", () => {
        instance.Add(dataBlock);
        instance.Remove(key);
        expect(instance.Get(key)).toBeNull();
    });

    test("Get block after removing with smaller key", () => {
        instance.Add(dataBlock);
        instance.Remove(new Key(3));
        expect(instance.GetFirstOnOrAfter(new Key(3))).toBe(dataBlock);
        expect(instance.Get(key)).toBe(dataBlock);
    });

    test("Get block after removing with bigger key", () => {
        instance.Add(dataBlock);
        instance.Remove(new Key(11));
        expect(instance.Get(key)).toBe(dataBlock);
    });

    test("Get null after removing with same key", () => {
        instance.Add(dataBlock);
        instance.Remove(key);
        expect(instance.Get(key)).toBeNull();
    });
}) 