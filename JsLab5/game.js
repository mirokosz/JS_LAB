const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let ball = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 10,
    color: 'blue'
};

let hole = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 20,
    color: 'black'
};

let startTime;
let recordTimes = [];

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function drawHole() {
    ctx.beginPath();
    ctx.arc(hole.x, hole.y, hole.radius, 0, Math.PI * 2);
    ctx.fillStyle = hole.color;
    ctx.fill();
    ctx.closePath();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkCollision() {
    const dx = ball.x - hole.x;
    const dy = ball.y - hole.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < ball.radius + hole.radius) {
        return true;
    }
    return false;
}

function updateBallPosition(event) {
    const accX = event.accelerationIncludingGravity.x;
    const accY = event.accelerationIncludingGravity.y;

    ball.x += accX;
    ball.y += accY;

    if (ball.x < ball.radius) ball.x = ball.radius;
    if (ball.x > canvas.width - ball.radius) ball.x = canvas.width - ball.radius;
    if (ball.y < ball.radius) ball.y = ball.radius;
    if (ball.y > canvas.height - ball.radius) ball.y = canvas.height - ball.radius;
}

function gameLoop() {
    clearCanvas();
    drawHole();
    drawBall();

    if (checkCollision()) {
        const endTime = new Date().getTime();
        const timeTaken = (endTime - startTime) / 1000;
        recordTimes.push(timeTaken);
        alert(`Gratulacje! Czas: ${timeTaken} sekund`);

        ball.x = Math.random() * canvas.width;
        ball.y = Math.random() * canvas.height;
        hole.x = Math.random() * canvas.width;
        hole.y = Math.random() * canvas.height;

        startTime = new Date().getTime();
    }

    requestAnimationFrame(gameLoop);
}

window.addEventListener('devicemotion', updateBallPosition);

window.onload = () => {
    startTime = new Date().getTime();
    gameLoop();
};