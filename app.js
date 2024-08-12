let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

let planeWidth = 34;
let planeHeight = 24;
let planeX = boardWidth / 8;
let planeY = boardHeight / 2;
let planeImg;

let plane = {
    x: planeX,
    y: planeY,
    width: planeWidth,
    height: planeHeight
}

let buildingArray = [];
let buildingWidth = 64;
let buildingHeight = 512;
let buildingX = boardWidth;
let buildingY = 0;

let topBuildingImg;
let bottomBuildingImg;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    //context.fillStyle = "green";
    //context.fillRect(plane.x, plane.y, plane.width, plane.height);

    planeImg = new Image();
    planeImg.src = "assets/AN-225.png";
    planeImg.onload = function() {
        context.drawImage(planeImg, plane.x, plane.y, plane.width, plane.height);
    }
    requestAnimationFrame(update);
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height)

    context.drawImage(planeImg, plane.x, plane.y, plane.width, plane.height);
}