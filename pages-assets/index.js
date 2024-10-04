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
    ctx.font = "14px Arial";
    var textWidth = ctx.measureText("210").width;

    var x = Math.floor((canvas.width - textWidth - (4 * 20)) / 2);
    ctx.fillText("210", x, 50);

    ctx.fillRect(x + textWidth + 10, 36, 12, 12);

}

