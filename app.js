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

let velocityX = -2;
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

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

    topBuildingImg = new Image();
    topBuildingImg.src = "assets/gedungA.png";

    bottomBuildingImg = new Image();
    bottomBuildingImg.src = "assets/gedungB.png";

    requestAnimationFrame(update);
    setInterval(placeBuilding, 1500);
    document.addEventListener("keydown", movePlane);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    velocityY += gravity;
    //plane.y += velocityY;
    plane.y = Math.max(plane.y + velocityY, 0);
    context.drawImage(planeImg, plane.x, plane.y, plane.width, plane.height);

    if (plane.y > board.height) {
        gameOver = true;
    }

    for (let i = 0; i < buildingArray.length; i++) {
        let building = buildingArray[i];
        building.x = velocityX;
        context.drawImage(building.img, building.x, building.y, building.width, building.height);

        if (!building.passed && plane.x > building.x + building.width) {
            score += 0.5;
            building.passed = true;
        }
        if (detectCollision(plane, building)) {
            gameOver = true;
        }
    }

    while (buildingArray.length > 0 && buildingArray[0].x < -buildingWidth) {
        buildingArray.shift();
    }

    context.fillStyle = "white";
    context.font = "45px sans serif";
    context.fillText(score, 5, 45);

    if (gameOver) {
        context.fillText("GAME OVER", 5, 90);
    }
}

function placeBuilding() {
    if (gameOver) {
        return;
    }

    let randomBuildingY = buildingY - buildingHeight / 4 - Math.random() * (buildingHeight / 2);
    let openingSpace = board.height / 4;

    let topBuilding = {
        img: topBuildingImg,
        x: buildingX,
        y: randomBuildingY,
        width: buildingWidth,
        height: buildingHeight,
        passed: false
    }

    buildingArray.push(topBuilding);

    let bottomBuilding = {
        img: bottomBuildingImg,
        x: buildingX,
        y: randomBuildingY + buildingHeight + openingSpace,
        width: buildingWidth,
        height: buildingHeight,
        passed: false
    }

    buildingArray.push(bottomBuilding);
}

function movePlane(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
        velocityY = -6;

        if (gameOver) {
            plane.y = planeY;
            buildingArray = [];
            score = 0;
            gameOver = false;
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}