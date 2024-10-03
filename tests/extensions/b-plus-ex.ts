import { BPlus } from "../../b-plus-src/b-plus";
import { InternalNode } from "../../b-plus-src/internal-node";
import { TraverseRapport } from "../classes/traverserapport";
import { Key } from "../key";
import { InternalNodeEx } from "./internal-node-ex";

// BPlus;

// declare module "../../b-plus-src/b-plus" {
//     interface BPlus {
   
//         GetWithRapport(key: Key) : TraverseRapport
//     }
// }
    
// BPlus.prototype.GetWithRapport = function(key: Key) : TraverseRapport {
//     var rapport = new TraverseRapport();
//     if (this._root != null) {
//         this._root.GetWithRapport(key, rapport);
//     }
//     return rapport;
// }

export class BPlusEx extends BPlus {

    static GetWithRapport(instance: BPlus, key: Key) : TraverseRapport {
        var rapport = new TraverseRapport();
        if (instance.RootNode != null) {
            if (instance.RootNode instanceof InternalNode) {
                InternalNodeEx.GetWithRapport(instance.RootNode, key, rapport);
            }
        }
        return rapport;
    }
}