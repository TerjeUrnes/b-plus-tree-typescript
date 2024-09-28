import {IDataBlock} from "../b-plus-src/idatablock"
import { IKey } from "../b-plus-src/ikey";

export class DataBlock implements IDataBlock {

    

    get Key(): IKey {
        throw new Error("Method not implemented.");
    }

}