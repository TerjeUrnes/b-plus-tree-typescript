import { BPlus } from "../b-plus-src/b-plus";
import { Key } from "./key";

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

    test("Has no nodes to step through", () => {
        var rapport = instance.GetWithRapport(new Key(0));
        expect(rapport.StepCount).toBe(0);
    });
});