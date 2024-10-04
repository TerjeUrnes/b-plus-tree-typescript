import { BPlus } from "../js-build/b-plus.js";

document.addEventListener("readystatechange", (e) => {
    if (document.readyState === "complete") {
        initDemo();
    }
});

function initDemo() {
    var tree = new BPlus(3, 1, 1);

    var canvas = document.getElementById("tree-canvas");
    var ctx = canvas.getContext("2d");

    var width = canvas.clientWidth;
    var x = (width - textWidth) / 2;

    ctx.font = "30px Arial";
    var textWidth = ctx.measureText("Bare en test").width;
    ctx.fillText("Bare en test", x, 50);

}

