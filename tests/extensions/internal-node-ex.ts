import { BPlusNode } from "../../b-plus-src/b-plus-node.ts";
import { InternalNode } from "../../b-plus-src/internal-node";
import { DataNode } from "../../b-plus-src/data-node";
import { TraverseRapport } from "../classes/traverserapport";
import { Key } from "../key";
import { DataNodeEx } from "./data-node-ex.ts";

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

export class InternalNodeEx { //extends InternalNode {
    
    static GetWithRapport(node: BPlusNode, key: Key, rapport: TraverseRapport) : void {
        rapport.StepCount++;
        var path = new Array<string>(); 
        for (var i = 0; i < node.ChildrenCount; i++) {
            path.push((node.Children[i].Key as Key).ToString());
        }
        rapport.path.push(path);
        const index = node.GetChildIndex(key);
        var nextNode = node.Children[index] as DataNode | InternalNode;
        if (nextNode instanceof DataNode) {
            DataNodeEx.GetWithRapport(nextNode, key, rapport);
        }
        else {
            InternalNodeEx.GetWithRapport(nextNode, key, rapport);
        }
        
    }
}
