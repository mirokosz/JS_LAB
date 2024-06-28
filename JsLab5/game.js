const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const timerDisplay = document.getElementById('timer');
const scoresList = document.getElementById('scoresList');

let ball = { x: 0, y: 0, radius: 10, speed: 2 };
let hole = { x: 0, y: 0, radius: 20 };
let startTime;
let timerInterval;
let highScores = [];
let animationId;

function initGame() {
    ball.x = Math.random() * (canvas.width - 2 * ball.radius) + ball.radius;
    ball.y = Math.random() * (canvas.height - 2 * ball.radius) + ball.radius;
    hole.x = Math.random() * (canvas.width - 2 * hole.radius) + hole.radius;
    hole.y = Math.random() * (canvas.height - 2 * hole.radius) + hole.radius;
    startTime = Date.now();
    timerDisplay.textContent = `Time: 0s`;
    draw();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawHole() {
    ctx.beginPath();
    ctx.arc(hole.x, hole.y, hole.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHole();
    drawBall();
    checkCollision();
}

function updateBallPosition(tiltX, tiltY) {
    ball.x += tiltX * ball.speed;
    ball.y += tiltY * ball.speed;

    if (ball.x < ball.radius) ball.x = ball.radius;
    if (ball.x > canvas.width - ball.radius) ball.x = canvas.width - ball.radius;
    if (ball.y < ball.radius) ball.y = ball.radius;
    if (ball.y > canvas.height - ball.radius) ball.y = canvas.height - ball.radius;
}

function checkCollision() {
    const dx = ball.x - hole.x;
    const dy = ball.y - hole.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < ball.radius + hole.radius) {
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        highScores.push(elapsedTime);
        highScores.sort((a, b) => a - b);
        displayHighScores();
        alert(`Ball in the hole! Time: ${elapsedTime}s`);
        resetGame();
    }
}

function displayHighScores() {
    scoresList.innerHTML = highScores.map(score => `<li>${score}s</li>`).join('');
}

function resetGame() {
    cancelAnimationFrame(animationId);
    clearInterval(timerInterval);
    initGame();
}

function startGame() {
    initGame();
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        timerDisplay.textContent = `Time: ${elapsedTime}s`;
    }, 100);

    function gameLoop() {
        draw();
        animationId = requestAnimationFrame(gameLoop);
    }

    window.addEventListener('deviceorientation', (event) => {
        const tiltX = event.gamma / 30;
        const tiltY = event.beta / 30;
        updateBallPosition(tiltX, tiltY);
    });

    animationId = requestAnimationFrame(gameLoop);
}

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);

initGame();