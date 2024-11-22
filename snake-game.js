const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{ x: 200, y: 200 }];
let food = { x: 100, y: 100 };
let direction = 'RIGHT';
let gameOver = false;

// Vẽ rắn và thức ăn
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 20, 20));
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 20, 20);
}

// Di chuyển rắn
function moveSnake() {
    const head = { ...snake[0] };
    if (direction === 'RIGHT') head.x += 20;
    if (direction === 'LEFT') head.x -= 20;
    if (direction === 'UP') head.y -= 20;
    if (direction === 'DOWN') head.y += 20;

    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * 20) * 20,
            y: Math.floor(Math.random() * 20) * 20,
        };
    } else {
        snake.pop();
    }

    if (
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        gameOver = true;
    }
}

// Bắt phím
window.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

// Game loop
function gameLoop() {
    if (gameOver) {
        alert('Game Over! Hãy thử lại!');
        snake = [{ x: 200, y: 200 }];
        direction = 'RIGHT';
        gameOver = false;
    }
    moveSnake();
    draw();
    setTimeout(gameLoop, 200);
}

gameLoop();
