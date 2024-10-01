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

    test("Has empty traverse path", () => {
        var rapport = instance.GetWithRapport(new Key(0));
        expect(rapport.path).toStrictEqual([]);
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

    test("Has step through 1 node", () => {
        instance.Add(dataBlock);
        var rapport = instance.GetWithRapport(key);
        expect(rapport.StepCount).toBe(1);
    })

    test("Has correct traverse path", () => {
        instance.Add(dataBlock);
        var rapport = instance.GetWithRapport(key);
        expect(rapport.path).toStrictEqual([["10"]]);
    });
}) 

describe("Instance with 2 data block", () => {

    var instance: BPlus
    var key1: Key = new Key(10);
    var key2: Key = new Key(20);
    var dataBlock1: DataBlock;
    var dataBlock2: DataBlock;

    beforeEach( () => {
        instance = new BPlus();
        dataBlock1 = new DataBlock(key1);
        dataBlock2 = new DataBlock(key2);
    });

    test("Count has increased. Added sequential", () => {
        expect(instance.Count).toBe(0);
        instance.Add(dataBlock1);
        instance.Add(dataBlock2);
        expect(instance.Count).toBe(2);
    });

    test("Count has increased. Added non-sequential", () => {
        expect(instance.Count).toBe(0);
        instance.Add(dataBlock2);
        instance.Add(dataBlock1);
        expect(instance.Count).toBe(2);
    });

    test("Get the block back with same key", () => {
        instance.Add(dataBlock1);
        instance.Add(dataBlock2);
        expect(instance.Get(key1)).toBe(dataBlock1);
        expect(instance.Get(key2)).toBe(dataBlock2);
    });

    test("Get back null when using a key in between", () => {
        instance.Add(dataBlock1);
        instance.Add(dataBlock2);
        expect(instance.Get(new Key(15))).toBeNull;
    }); 

    test("Get first gives back second block when using a bigger key", () => {
        instance.Add(dataBlock1);
        instance.Add(dataBlock2);
        expect(instance.GetFirstOnOrAfter(new Key(25))).toBeNull();
    });

    test("Get first gives back second block when using a key in between", () => {
        instance.Add(dataBlock1);
        instance.Add(dataBlock2);
        expect(instance.GetFirstOnOrAfter(new Key(15))).toBe(dataBlock2);
    }); 

    test("Get first gives back first block when using a smaller key", () => {
        instance.Add(dataBlock1);
        instance.Add(dataBlock2);
        expect(instance.GetFirstOnOrAfter(new Key(5))).toBe(dataBlock1);
    }); 

    test("Removing the block gives correct count. Removed sequential", () => {
        instance.Add(dataBlock1);
        instance.Add(dataBlock2);
        expect(instance.Count).toBe(2);
        instance.Remove(key1);
        expect(instance.Count).toBe(1);
        instance.Remove(key2);
        expect(instance.Count).toBe(0);
    });

    test("Has correct traverse path. Added sequential", () => {
        instance.Add(dataBlock1);
        instance.Add(dataBlock2);
        var rapport = instance.GetWithRapport(key1);
        expect(rapport.path).toStrictEqual([["10","20"]]);
    });

    test("Has correct traverse path. Added non-sequential", () => {
        instance.Add(dataBlock2);
        instance.Add(dataBlock1);
        var rapport = instance.GetWithRapport(key1);
        expect(rapport.path).toStrictEqual([["10","20"]]);
    });

    test("Has correct traverse path. Removed sequential", () => {
        instance.Add(dataBlock1);
        instance.Add(dataBlock2);
        instance.Remove(key1);
        var rapport = instance.GetWithRapport(key2);
        expect(rapport.path).toStrictEqual([["20"]]);
        instance.Remove(key2);
        var rapport = instance.GetWithRapport(key1);
        expect(rapport.path).toStrictEqual([]);
    });

    test("Has correct traverse path. Removed non-sequential", () => {
        instance.Add(dataBlock1);
        instance.Add(dataBlock2);
        instance.Remove(key2);
        var rapport = instance.GetWithRapport(key1);
        expect(rapport.path).toStrictEqual([["10"]]);
        instance.Remove(key1);
        var rapport = instance.GetWithRapport(key2);
        expect(rapport.path).toStrictEqual([]);
    });
});

describe("Instance with 10 data blocks in order 10 tree", () => {
    var instance: BPlus
    var dataBlocks: DataBlock[] = [];

    beforeEach( () => {
        instance = new BPlus(10, 5, 5);
        for (let i = 0; i < 10; i++) {
            dataBlocks.push(new DataBlock(new Key(i)));
        }
    });

    test("Count has increased", () => {
        expect(instance.Count).toBe(0);
        for (let i = 0; i < 10; i++) {
            instance.Add(dataBlocks[i]);
        }
        expect(instance.Count).toBe(10);
    });

    test("Has correct traverse path. Added sequential", () => {
        for (let i = 0; i < 10; i++) {
            instance.Add(dataBlocks[i]);
        }
        var rapport = instance.GetWithRapport(new Key(5));
        expect(rapport.path).toStrictEqual([["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]]);
    })

    test("Has correct traverse path. Added non-sequential", () => {
        for (let i = 9; i >= 0; i--) {
            instance.Add(dataBlocks[i]);
        }
        var rapport = instance.GetWithRapport(new Key(5));
        expect(rapport.path).toStrictEqual([["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]]);
    })
})

// describe("Testing whit 1000000 in 1000000 order tree", () => {

//     var instance: BPlus
//     var dataBlocks: DataBlock[] = new Array(20000000);

//     beforeEach( () => {
//         instance = new BPlus(10000000, 5000000, 5000000);
//         for (let i = 0; i < 10000000; i++) {
//             dataBlocks[i] = (new DataBlock(new Key(i)));
//         }
//     });

//     test("Count has increased, Added sequential", () => {
//         var startTime = performance.now()
//         expect(instance.Count).toBe(0);
//         for (let i = 0; i < 10000000; i++) {
//             instance.Add(dataBlocks[i]);
//         }
//         expect(instance.Count).toBe(10000000);
//         var endTime = performance.now()

//         console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
//     }, 100000);

//     test("Count has increased. Added non-sequential", () => {
//         expect(instance.Count).toBe(0);
//         for (let i = 0; i < 100000; i++) {
//             instance.Add(dataBlocks[i]);
//         }
//         expect(instance.Count).toBe(100000);
//         var startTime = performance.now()
//         for (let i = 0; i < 100000; i++) {
//             instance.Remove(dataBlocks[i].Key);
//         }
//         var endTime = performance.now()
//         expect(instance.Count).toBe(0);

//         console.log(`Call to remove took ${endTime - startTime} milliseconds`)
//     }, 10000);
// })