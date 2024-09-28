import { BPlus } from "../b-plus-src/b-plus";

describe('Testing empty instance', () => {

    var instance: BPlus

    beforeEach( () => {
        instance = new BPlus();
    });

    test('Can init instance', () => {
        expect(instance).toBeInstanceOf(BPlus);
    });

    test("Has no data blocks (leafs)", () => {
        expect(instance.DataBlocksCount).toBe(0)
    })
});