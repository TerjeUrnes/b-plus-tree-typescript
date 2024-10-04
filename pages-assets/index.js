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
}

