import { BPlus } from "../b-plus-src/b-plus";
import { Key } from "./key";

describe('Testing empty instance', () => {

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