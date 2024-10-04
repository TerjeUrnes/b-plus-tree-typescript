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

    ctx.font = "10px Arial";
    var textWidth = ctx.measureText("Bare en test").width;

    console.log(canvas.width + " " + width + " " + textWidth);

    var x = Math.floor((canvas.width - textWidth) / 2);
    ctx.fillText("Bare en test", x, 50);

}

