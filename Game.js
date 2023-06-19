const gameContainer = document.getElementById("game-container");
const startGameBtn = document.getElementById("start-game-btn");

let score = 0;
let timer = 60;
let intervalId;

function startGame() {
  // Reset score and timer
  score = 0;
  timer = 60;

  // Update score and timer display
  updateScoreDisplay();
  updateTimerDisplay();

  // Remove start game button
  startGameBtn.remove();

  // Create crops and add them to the game container
  for (let i = 0; i < 10; i++) {
    createCrop();
  }

  // Start game loop
  intervalId = setInterval(gameLoop, 1000);
}

function gameLoop() {
  // Decrement timer
  timer--;

  // Update timer display
  updateTimerDisplay();

  // Check if time is up
  if (timer === 0) {
    endGame();
    return;
  }

  // Move crops
  moveCrops();

  // Check for collisions
  checkCollisions();
}

function createCrop() {
  // Create crop element
  const crop = document.createElement("div");
  crop.classList.add("crop");

  // Position crop randomly
  const x = Math.floor(Math.random() * (gameContainer.offsetWidth - crop.offsetWidth));
  const y = Math.floor(Math.random() * (gameContainer.offsetHeight - crop.offsetHeight));
  crop.style.left = x + "px";
  crop.style.top = y + "px";

  // Add crop to game container
  gameContainer.appendChild(crop);
}

function moveCrops() {
  // Get all crops
  const crops = document.querySelectorAll(".crop");

  // Move each crop randomly
  crops.forEach(crop => {
    const x = Math.floor(Math.random() * (gameContainer.offsetWidth - crop.offsetWidth));
    const y = Math.floor(Math.random() * (gameContainer.offsetHeight - crop.offsetHeight));
    crop.style.left = x + "px";
    crop.style.top = y + "px";
  });
}

function checkCollisions() {
  // Get all crops
  const crops = document.querySelectorAll(".crop");

  // Check for collision with farmer
  crops.forEach(crop => {
    if (isColliding(crop, gameContainer.querySelector("img"))) {
      // Remove crop and increment score
      crop.remove();
      score++;
      updateScoreDisplay();
    }
  });
}

function isColliding(element1, element2) {
  // Get element1's position and dimensions
  const rect1 = element1.getBoundingClientRect();

  // Get element2's position and dimensions
  const rect2 = element2.getBoundingClientRect();

  // Check for collision
  return !(rect1.right < rect2.left ||
           rect1.left > rect2.right ||
           rect1.bottom < rect2.top ||
           rect1.top > rect2.bottom);
}

function updateScoreDisplay() {
  const scoreDisplay = document.createElement("p");
  scoreDisplay.classList.add("score");
  scoreDisplay.innerText = "Score: " + score;
  gameContainer.insertBefore(scoreDisplay, gameContainer.firstChild);
}

function updateTimerDisplay() {
  const timerDisplay = document.createElement("p");
  timerDisplay.classList.add("timer");
  timerDisplay.innerText = "Time: " + timer + "s";
  gameContainer.insertBefore(timerDisplay, gameContainer.firstChild);
}

function endGame() {
  // Stop game loop
  clearInterval(intervalId);

  // Show game over message
  const gameOverMessage = document.createElement("h2");
  gameOverMessage.innerText = "Game Over! Your score is " + score;
  gameContainer.appendChild(gameOverMessage);

  // Show restart button
  const restartBtn = document.createElement("button");
  restartBtn.innerText = "Restart";
  restartBtn.addEventListener("click", startGame);
  gameContainer.appendChild(restartBtn);
}

startGameBtn.addEventListener("click", startGame);