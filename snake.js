const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const Score = document.getElementById("score");
const doge = document.getElementById("doge");

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 8;

let tileCount = 30;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
let snakePart = [];
let tailLen = 0;

let appleX = 5;
let appleY = 5;

let xV = 0;
let yV = 0;

let score = 0;
let highest_score = 0;

function startGame() {
  snakePosition();
  let lose = isOver();
  if (lose) {
    document.body.addEventListener("keydown", playAgain);
    return;
  }
  clearScreen();

  checkColli();

  drawApple();
  drawSnake();
  drawScore();

  setSpeed();

  setTimeout(startGame, 1000 / speed);
}

function setSpeed() {
  if (score == 5) {
    speed = 10;
  }
}

function isOver() {
  let Over = false;
  if (headX < 0 || headX == 30 || headY < 0 || headY == 30) {
    Over = true;
  }
  for (let i = 0; i < snakePart.length; i++) {
    if (headX == snakePart[i].x && headY == snakePart[i].y) {
      Over = true;
    }
  }
  if (Over) {
    if(highest_score < score) highest_score = score;
    ctx.fillStyle = "white";
    ctx.font = "50px Poppins";
    ctx.fillText("Game Over!", canvas.width / 3.25, canvas.height / 2 + 150);
    ctx.font = "40px Poppins";
    ctx.fillText("再玩一次?", canvas.width / 2.75, canvas.height / 2 + 200);
    ctx.font = "25px Poppins";
    ctx.fillText("按空白鍵", canvas.width / 2.4, canvas.height / 2 + 250);
  }
  return Over;
}

function clearScreen() {
  ctx.drawImage(doge, 0, 0);
}

function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snakePart.length; i++) {
    let part = snakePart[i];
    ctx.fillRect(
      (part.x * tileCount) / 1.5,
      (part.y * tileCount) / 1.5,
      tileSize,
      tileSize
    );
  }

  snakePart.push(new SnakePart(headX, headY));
  if (snakePart.length > tailLen) {
    snakePart.shift();
  }

  ctx.fillStyle = "orange";
  ctx.fillRect(
    (headX * tileCount) / 1.5,
    (headY * tileCount) / 1.5,
    tileSize,
    tileSize
  );
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(
    (appleX * tileCount) / 1.5,
    (appleY * tileCount) / 1.5,
    tileSize,
    tileSize
  );
}

function drawScore() {
  ctx.fillStyle = "white";
  Score.innerText = "現在分數 : " + score.toString() + "          最高分數 : " + highest_score.toString();
}

function checkColli() {
  if (appleX === headX && appleY === headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLen++;
    score++;
    if (score > 5 && score % 2 == 0) {
      speed++;
    }
  }
}

function snakePosition() {
  headX = headX + xV;  headY = headY + yV;
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  //go up
  if (event.keyCode == 38) {
    if (yV == 1) return;
    yV = -1;
    xV = 0;
  }

  //go down
  if (event.keyCode == 40) {
    if (yV == -1) return;
    yV = 1;
    xV = 0;
  }

  //go left
  if (event.keyCode == 37) {
    if (xV == 1) return;
    yV = 0;
    xV = -1;
  }

  //go right
  if (event.keyCode == 39) {
    if (xV == -1) return;
    yV = 0;
    xV = 1;
  }
}
function playAgain(event) {
  if (event.keyCode == 32) {
    speed = 8;
    headX = 10;
    headY = 10;
    snakePart = [];
    tailLen = 0;
    appleX = 5;
    appleY = 5;
    xV = 0;
    yV = 0;

    score = 0;
    startGame();
  }
}

startGame();
