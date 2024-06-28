const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const numBallsInput = document.getElementById('numBalls');
const connectDistanceInput = document.getElementById('connectDistance');
const forceStrengthInput = document.getElementById('forceStrength');

let balls = [];
let animationId;
let mouse = { x: 0, y: 0 };
let attract = true;

class Ball {
    constructor(x, y, vx, vy, radius = 5) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.vx = -this.vx;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.vy = -this.vy;
        }
    }

    applyForce(fx, fy) {
        this.vx += fx;
        this.vy += fy;
    }

    distanceTo(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

function init() {
    balls = [];
    const numBalls = parseInt(numBallsInput.value);
    const connectDistance = parseInt(connectDistanceInput.value);

    for (let i = 0; i < numBalls; i++) {
        const x = Math.random() * (canvas.width - 20) + 10;
        const y = Math.random() * (canvas.height - 20) + 10;
        const vx = (Math.random() - 0.5) * 2;
        const vy = (Math.random() - 0.5) * 2;
        balls.push(new Ball(x, y, vx, vy));
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const connectDistance = parseInt(connectDistanceInput.value);

    balls.forEach(ball => {
        ball.draw();
        ball.update();

        balls.forEach(otherBall => {
            if (ball !== otherBall && ball.distanceTo(otherBall) < connectDistance) {
                ctx.beginPath();
                ctx.moveTo(ball.x, ball.y);
                ctx.lineTo(otherBall.x, otherBall.y);
                ctx.strokeStyle = '#aaa';
                ctx.stroke();
                ctx.closePath();
            }
        });

        const dx = mouse.x - ball.x;
        const dy = mouse.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceStrength = parseFloat(forceStrengthInput.value);
        if (distance < connectDistance) {
            const force = attract ? forceStrength / distance : -forceStrength / distance;
            ball.applyForce(dx * force, dy * force);
        }
    });

    animationId = requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

canvas.addEventListener('click', (event) => {
    balls = balls.flatMap(ball => {
        if (Math.hypot(ball.x - event.clientX, ball.y - event.clientY) < ball.radius) {
            const x1 = Math.random() * (canvas.width - 20) + 10;
            const y1 = Math.random() * (canvas.height - 20) + 10;
            const vx1 = (Math.random() - 0.5) * 2;
            const vy1 = (Math.random() - 0.5) * 2;

            const x2 = Math.random() * (canvas.width - 20) + 10;
            const y2 = Math.random() * (canvas.height - 20) + 10;
            const vx2 = (Math.random() - 0.5) * 2;
            const vy2 = (Math.random() - 0.5) * 2;

            return [new Ball(x1, y1, vx1, vy1), new Ball(x2, y2, vx2, vy2)];
        }
        return ball;
    });
});

startBtn.addEventListener('click', () => {
    cancelAnimationFrame(animationId);
    init();
});

resetBtn.addEventListener('click', () => {
    cancelAnimationFrame(animationId);
    balls = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

init();
