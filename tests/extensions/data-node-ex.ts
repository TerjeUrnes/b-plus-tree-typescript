import { BPlusNode } from "../../b-plus-src/b-plus-node";
import { DataNode } from "../../b-plus-src/data-node";
import { TraverseRapport } from "../classes/traverserapport";
import { Key } from "../key";

DataNode;

// declare module "../../b-plus-src/data-node" {
//     interface DataNode {
  
//         GetWithRapport(key: Key, rapport: TraverseRapport) : void
//     }
// }

// DataNode.prototype.GetWithRapport = function(key: Key, rapport: TraverseRapport) : void {
//     rapport.StepCount++;
//     var path = new Array<string>(); 
//     for (var i = 0; i < this._childrenCount; i++) {
//         path.push((this._children[i].Key as Key).ToString());
//     }
//     rapport.path.push(path);
// }

export class DataNodeEx extends DataNode {

    static GetWithRapport(node: BPlusNode, key: Key, rapport: TraverseRapport) : void {
        rapport.StepCount++;
        var path = new Array<string>(); 
        for (var i = 0; i < node.ChildrenCount; i++) {
            path.push((node.Children[i].Key as Key).ToString());
        }
        rapport.path.push(path);
    }
}