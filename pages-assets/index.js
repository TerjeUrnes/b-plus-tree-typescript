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

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    ctx.fillStyle = "#ffffff";
    ctx.font = "10px Arial";
    var textWidth = ctx.measureText("Bare en test").width;

    var x = Math.floor((canvas.width - textWidth) / 2);
    ctx.fillText("Bare en test", x, 50);

}

