import { InternalNode } from "../../b-plus-src/internal-node";
import { DataNode } from "../../b-plus-src/data-node";
import { TraverseRapport } from "../classes/traverserapport";
import { Key } from "../key";
import { BPlusNode } from "../../b-plus-src/b-plus-node";

// declare module "../../b-plus-src/internal-node" {
//     interface InternalNode {

//          GetWithRapport(key: Key, rapport: TraverseRapport) : void

//     }
// }
// InternalNode.prototype.GetWithRapport = function(key: Key, rapport: TraverseRapport) : void {
//     rapport.StepCount++;
//     var path = new Array<string>(); 
//     for (var i = 0; i < this._childrenCount; i++) {
//         path.push((this._children[i].Key as Key).ToString());
//     }
//     rapport.path.push(path);
//     const index = this.GetChildFindIndex(key);
//     (this._children[index] as DataNode | InternalNode).GetWithRapport(key, rapport);
// }

export class InternalNodeEx extends InternalNode {
    
    static GetWithRapport(node: BPlusNode, key: Key, rapport: TraverseRapport) : void {
        rapport.StepCount++;
        var path = new Array<string>(); 
        for (var i = 0; i < node.ChildrenCount; i++) {
            path.push((node.Children[i].Key as Key).ToString());
        }
        rapport.path.push(path);
        const index = node.GetChildFindIndex(key);
        var nextNode = node.Children[index] as DataNode | InternalNode;
        this.GetWithRapport(nextNode, key, rapport);
    }
}
