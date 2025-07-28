const playButtonArea = document.getElementById('play-button-area');
const restartButtonArea = document.getElementById('restart-button-area');
const gameCanvas = document.getElementById('game-canvas');
const gameScore = document.getElementById('game-score');
const gameBox = document.querySelector('.game-box');

let snakeDirection = 0;
let snakeBody = [
    {x: 25, y: 25}
];
let speedInterval = 100;
let foodPosition = {x: 0, y: 0}
let score = 0;

const ctx = gameCanvas.getContext('2d');
const segmentSize = 20;

function drawGame() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    snakeBody.forEach(segment => {
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(83, 102, 32, 1)';
        ctx.fillStyle = 'rgba(131, 160, 5, 1)';
        ctx.beginPath();
        ctx.roundRect(segment.x, segment.y, segmentSize, segmentSize, 3);
        ctx.fill();
        ctx.stroke();
    });

    ctx.fillStyle = 'rgba(156, 51, 25, 1)';
    ctx.beginPath();
    ctx.roundRect(foodPosition.x, foodPosition.y, 15, 15, 10);
    ctx.fill();
}

function placeFood() {
    do {
        foodPosition.x = Math.floor((Math.random() * (gameCanvas.width - segmentSize)) / segmentSize) * segmentSize + 5;
        foodPosition.y = Math.floor((Math.random() * (gameCanvas.height - segmentSize)) / segmentSize) * segmentSize + 5;
    } while (snakeBody.some(segment => segment.x === foodPosition.x - 5 && segment.y === foodPosition.y - 5));
    drawGame();
}

function togglePlayButton(pause, hide) {
    if (pause) {
        playButtonArea.innerHTML = '<button id="play-button" onclick="togglePlayButton(pause=false)">▶ RESUME</button>';
    } else {
        moveSnake();
        playButtonArea.innerHTML = '<button id="play-button" onclick="togglePlayButton(pause=true)">● PAUSE</button>';
        gameBox.querySelector('.game-message').style.border = 'none'
        gameBox.querySelector('.game-message').textContent = '';
    }

    if (hide) {
        playButtonArea.innerHTML = '';
    }
}

function setCanvasStyle(out) {
    if (out) {
        gameCanvas.style.backgroundColor = 'rgba(24, 9, 9, 1)';
        gameBox.querySelector('.game-message').style.border = '';
        gameBox.querySelector('.game-message').style.margin = '180px 0px 0px 80px';
        gameBox.querySelector('.game-message').style.color = 'rgb(77, 27, 18)';
        gameBox.querySelector('.game-message').textContent = 'GAME OVER';
        restartButtonArea.innerHTML = '<button id="restart-button" onclick="restartGame()">⟳ RESTART</button>';
    } else {
        gameScore.innerText = score;
        gameCanvas.style = '';
        gameBox.querySelector('.game-message').style = '';
        gameBox.querySelector('.game-message').textContent = '';
        restartButtonArea.innerHTML = '';
    }
}

function restartGame() {
    snakeDirection = 0;
    snakeBody = [
        {x: 25, y: 25}
    ];
    speedInterval = 100;
    foodPosition = {x: 0, y: 0}
    score = 0;

    setCanvasStyle(out=false);
    togglePlayButton(pause=false, hide=false);
    placeFood();
}

function gameOver() {
    setCanvasStyle(out=true);
    togglePlayButton(pause=true, hide=true);
}

function moveSnake() {
    const movementInterval = setInterval(() => {
        const playButton = document.getElementById('play-button');
        if (playButton.textContent === "● PAUSE") {
            const head = { ...snakeBody[0] };

            switch (snakeDirection) {
                case 0: head.x += segmentSize; break;
                case 90: head.y += segmentSize; break;
                case 180: head.x -= segmentSize; break;
                case 270: head.y -= segmentSize; break;
            }

            if (head.x < 5 || head.x > gameCanvas.width - 10 ||
                head.y < 5 || head.y > gameCanvas.height - 10) {
                gameOver();
                clearInterval(movementInterval);
                return;
            }

            if (snakeBody.some(segment => segment.x === head.x && segment.y === head.y)) { 
                gameOver();
                clearInterval(movementInterval);
                return;
            }

            if (head.x === foodPosition.x && head.y === foodPosition.y) {
                score += 10;
                gameScore.innerText = score;
                snakeBody.push({x: head.x, y: head.y});
                placeFood();
                speedInterval -= 5;
                clearInterval(movementInterval);
                moveSnake();
            }

            snakeBody.unshift(head);
            snakeBody.pop();

            drawGame();
        } else {
            clearInterval(movementInterval);
        }
    }, speedInterval);
}

window.addEventListener('keyup', (e) => {
    if (snakeDirection !== 90 && snakeDirection !== 270) {
        switch (e.code) {
            case 'ArrowUp': snakeDirection = 270; break;
            case 'ArrowDown': snakeDirection = 90; break;
        }
    } else if (snakeDirection !== 0 && snakeDirection !== 180) {
        switch (e.code) {
            case 'ArrowRight': snakeDirection = 0; break;
            case 'ArrowLeft': snakeDirection = 180; break;
        }
    }
});