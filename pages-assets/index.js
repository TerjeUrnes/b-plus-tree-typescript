import { BPlus } from "../js-build/b-plus.js";
import { Key } from "./key.js";
import { DataBlock } from "./datablock.js";
import { DataNode } from "../js-build/data-node.js";

document.addEventListener("readystatechange", (e) => {
    if (document.readyState === "complete") {
        new BPlusDemo();
    }
});

function initDemo() {
    //var tree = new BPlus(3, 1, 1);

    var canvas = document.getElementById("tree-canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#ffffff";
    ctx.font = "14px Arial";
    var textWidth = ctx.measureText("210").width;

    var x = Math.floor((canvas.width - textWidth - (4 * 20)) / 2);
    ctx.fillText("210", x, 50);

    ctx.fillRect(x + textWidth + 10, 40, 10, 10);
    ctx.fillRect(x + textWidth + 30, 40, 10, 10);
    ctx.fillRect(x + textWidth + 50, 40, 10, 10);
    ctx.fillRect(x + textWidth + 70, 40, 10, 10);
    ctx.strokeRect(x - 20, 30, textWidth + (4 * 20) + 40, 30);

    var textWidth2 = ctx.measureText("100").width;
    var textWidth3 = ctx.measureText("188").width;
    var textWidth4 = ctx.measureText("311").width;

    var x2 = Math.floor((canvas.width - textWidth2 - textWidth3 - textWidth4 - (7 * 20) - 40 - 40) / 2);
    ctx.strokeRect(x2, 90, textWidth2 + 10 + textWidth3 + (3 * 20) + 20, 30);
    ctx.strokeRect(x2 + textWidth2 + 10 + textWidth3 + (3 * 20) + 20 + 20, 90, textWidth4 + (4 * 20) + 20, 30);

    ctx.moveTo(x + (textWidth + 100)/2, 60);
    ctx.lineTo(x + (textWidth + 100)/2, 75);
    ctx.stroke();

}

class BPlusDemo {

    _instance;

    static get Instance() {
        return this._instance;
    }

    _tree;
    _treeOrderInput;
    _afterSplitInput;
    _beforeMergeInput;
    _createButton;
    _manipulateTreeControl;
    _addInput;
    _addButton;
    _canvas;
    _drawContext;

    constructor() {
        BPlusDemo._instance = this;
        this.GetElements();
        this.InitCanvas();
        this.InitControls();
        this.DrawTree();
    }

    InitCanvas() {
        this._drawContext = this._canvas.getContext("2d");
        this.SetCanvasSize();

        window.addEventListener("resize", () => {
            this.SetCanvasSize();
            console.log("resize");
        });
    }

    InitControls() {
        this._createButton.addEventListener("click", (e) => {
            BPlusDemo.Instance.CreateTree();
        });

        this._addButton.addEventListener("click", (e) => {
            BPlusDemo.Instance.AddValue();
        })
    }

    CreateTree() {
        this._tree = new BPlus(parseInt(this._treeOrderInput.value), parseInt(this._afterSplitInput.value), parseInt(this._beforeMergeInput.value));
        this.DrawTree();
        this.UnlockManipulateControl();
    }

    UnlockManipulateControl() {
        this._manipulateTreeControl.style.opacity = 1;
    }

    AddValue() {
        this._tree.Add(new DataBlock(new Key(this._addInput.value)));
        this.DrawTree();
    }

    SetCanvasSize() {
        if (this._canvas.width != this._canvas.clientWidth) {
            this._canvas.width = this._canvas.clientWidth;
            this.DrawTree();
        }
        if (this._canvas.height != this._canvas.clientHeight) {
            this._canvas.height = this._canvas.clientHeight;
        }
    }

    DrawTree() {

        this._drawContext.clearRect(0, 0, this._canvas.width, this._canvas.height);

        if(this._tree == undefined || 
            this._tree.RootNode == null ||
            this._tree.RootNode.ChildrenCount == 0) {
                this.DrawEmpty();
                return;
        }
        else {
            this.DrawLevel([[this._tree.RootNode.Children,this._tree.RootNode.ChildrenCount]], 1);
            if (this._tree.RootNode.Children[0] instanceof DataNode) {
                let nodes = [];
                for (let i = 0; i < this._tree.RootNode.ChildrenCount; i++) {
                    nodes.push([this._tree.RootNode.Children[i].Children, this._tree.RootNode.Children[i].ChildrenCount]);
                }
                this.DrawLevel(nodes, 2);
            }
        }
        
    }

    DrawEmpty() {
        let x = Math.floor((this._canvas.width - 30) / 2);

        this._drawContext.strokeStyle = "white";
        this._drawContext.strokeRect(x, 40, 30, 30);
    }

    DrawLevel(nodes, level) {

        this._drawContext.font = "16px Arial";
        this._drawContext.fillStyle = "white";

        let totalWidth = 0;
        let allResults = [];

        for (let i = 0; i < nodes.length; i++) {
            let count = nodes[i][1];
            let result = [];
            for (let j = 0; j < count; j++) {
                let string = "" + nodes[i][0][j].Key.ToString();
                let width = Math.ceil(this._drawContext.measureText(string).width);
                result.push([string, width]);
            }

            allResults.push(result);

            let textWidth = result[0][1];
            for (let j = 1; j < result.length; j++) {
                textWidth += result[j][1] + 20;
            }

            if (i == 0) {
                totalWidth += textWidth;
            }
            else {
                totalWidth += textWidth + 40;
            }
        }
        
        let x = Math.floor((this._canvas.width - totalWidth) / 2);
        let y = 40 * level;
        
        for (let i = 0; i < allResults.length; i++) {
            for (let j = 0; j < allResults[i].length; j++) {
                this._drawContext.fillText(allResults[i][j][0], x, 20 + y);
                x += allResults[i][j][1] + 20;
            }
            x += 40;
        }

        
        

        
        

        // textWidth += 40;
        // x = Math.floor((this._canvas.width - textWidth) / 2);

        // this._drawContext.strokeStyle = "white";
        // this._drawContext.strokeRect(x, y, textWidth, 30);
    }

    GetElements() {
        this._canvas = document.getElementById("tree-canvas");
        this._treeOrderInput = document.getElementById("tree-order-input");
        this._afterSplitInput = document.getElementById("after-split-input");
        this._beforeMergeInput = document.getElementById("before-merge-input");
        this._createButton = document.getElementById("tree-create-button");
        this._manipulateTreeControl = document.getElementById("manipulate-tree");
        this._addInput = document.getElementById("add-input");
        this._addButton = document.getElementById("add-button");
    }
}

