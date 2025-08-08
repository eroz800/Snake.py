const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let score = 0;
let highScore = 0;

let snake = [{ x: 10 * box, y: 10 * box }];
let food = {
  x: Math.floor(Math.random() * 29 + 1) * box,
  y: Math.floor(Math.random() * 29 + 1) * box,
};

let direction = null;

document.addEventListener("keydown", directionHandler);

function directionHandler(event) {
  const key = event.key.toLowerCase();
  if (key === "w" && direction !== "DOWN") direction = "UP";
  else if (key === "s" && direction !== "UP") direction = "DOWN";
  else if (key === "a" && direction !== "RIGHT") direction = "LEFT";
  else if (key === "d" && direction !== "LEFT") direction = "RIGHT";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "white" : "gray";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw the food
  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, 2 * Math.PI);
  ctx.fill();

  // Wait until the player chooses a direction
  if (!direction) return;

  let headX = snake[0].x;
  let headY = snake[0].y;

  // Move snake head based on direction
  if (direction === "UP") headY -= box;
  else if (direction === "DOWN") headY += box;
  else if (direction === "LEFT") headX -= box;
  else if (direction === "RIGHT") headX += box;

  // Check collision with wall
  if (
    headX < 0 ||
    headX >= canvas.width ||
    headY < 0 ||
    headY >= canvas.height
  ) return resetGame();

  // Check collision with snake body
  for (let segment of snake) {
    if (segment.x === headX && segment.y === headY) return resetGame();
  }

  let newHead = { x: headX, y: headY };
  snake.unshift(newHead);

  // Check if snake ate the food
  if (headX === food.x && headY === food.y) {
    score += 10;
    if (score > highScore) highScore = score;
    food = {
      x: Math.floor(Math.random() * 29 + 1) * box,
      y: Math.floor(Math.random() * 29 + 1) * box,
    };
  } else {
    // Remove the tail segment
    snake.pop();
  }

  document.getElementById("scoreboard").innerText = `Score: ${score} | High Score: ${highScore}`;
}

function resetGame() {
  alert("Game Over!");
  score = 0;
  direction = null;
  snake = [{ x: 10 * box, y: 10 * box }];
  document.getElementById("scoreboard").innerText = `Score: ${score} | High Score: ${highScore}`;
}

setInterval(draw, 100);
