const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartButton = document.getElementById("restart");

canvas.width = 400;
canvas.height = 400;

// Yılan ve oyun değişkenleri
const box = 20;
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let food = {
    x: Math.floor((Math.random() * canvas.width) / box) * box,
    y: Math.floor((Math.random() * canvas.height) / box) * box,
};
let score = 0;
let gameInterval;

// Klavye kontrolü
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Joystick kontrolü
document.getElementById("up").addEventListener("click", () => {
    if (direction !== "DOWN") direction = "UP";
});
document.getElementById("down").addEventListener("click", () => {
    if (direction !== "UP") direction = "DOWN";
});
document.getElementById("left").addEventListener("click", () => {
    if (direction !== "RIGHT") direction = "LEFT";
});
document.getElementById("right").addEventListener("click", () => {
    if (direction !== "LEFT") direction = "RIGHT";
});

// Tekrar Oyna butonu
restartButton.addEventListener("click", () => {
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    score = 0;
    food = {
        x: Math.floor((Math.random() * canvas.width) / box) * box,
        y: Math.floor((Math.random() * canvas.height) / box) * box,
    };
    restartButton.classList.add("hidden");
    clearInterval(gameInterval);
    startGame();
});

// Yılanı çiz
function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "lime" : "green";
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(segment.x, segment.y, box, box);
    });
}

// Yemeği çiz
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
}

// Oyunu güncelle
function update() {
    // Yılanın başını hareket ettir
    let head = { ...snake[0] };
    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;

    // Duvara çarpma kontrolü
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
        endGame();
    }

    // Kendine çarpma kontrolü
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }

    // Yemeği yeme kontrolü
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * canvas.width) / box) * box,
            y: Math.floor((Math.random() * canvas.height) / box) * box,
        };
    } else {
        snake.pop();
    }

    snake.unshift(head);
}

// Oyunu bitir
function endGame() {
    clearInterval(gameInterval);
    alert("Oyun Bitti! Skor: " + score);
    restartButton.classList.remove("hidden");
}

// Oyunu çiz
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
    update();
}

// Oyunu başlat
function startGame() {
    gameInterval = setInterval(draw, 200); // Hız azaltıldı (200ms)
}

startGame();