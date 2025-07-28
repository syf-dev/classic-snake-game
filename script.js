const playButtonArea = document.getElementById('play-button-area');
const restartButtonArea = document.getElementById('restart-button-area');
const gameCanvas = document.getElementById('game-canvas');
const gameBox = document.querySelector('.game-box');

let snakeDirection = 0;
let snakeBody = [
    {x: 25, y: 25}
];

const ctx = gameCanvas.getContext('2d');
const segmentSize = 20;

function getSnake() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    
    snakeBody.forEach(segment => {
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgb(102, 77, 32)';
        ctx.fillStyle = 'rgb(160, 116, 5)';
        ctx.beginPath();
        ctx.roundRect(segment.x, segment.y, segmentSize, segmentSize, 3);
        ctx.fill();
        ctx.stroke();
    });
}

function togglePlayButton(pause, hide) {
    if (pause) {
        playButtonArea.innerHTML = '<button id="play-button" onclick="togglePlayButton(pause=false)">▶ RESUME</button>';
    } else {
        moveSnake();
        playButtonArea.innerHTML = '<button id="play-button" onclick="togglePlayButton(pause=true)">● PAUSE</button>';
        gameBox.querySelector('.game-message').textContent = '';
    }

    if (hide) {
        playButtonArea.innerHTML = '';
    }
}

function setCanvasStyle(out) {
    if (out) {
        gameCanvas.style.backgroundColor = 'rgba(24, 9, 9, 1)';
        gameBox.style.border = 'dashed 1px rgb(196, 97, 97)';
        gameBox.querySelector('.score-container').style.backgroundColor = 'rgba(143, 55, 55, 1)';
        gameBox.querySelector('.score-container').style.borderBottom = 'solid 1px rgb(196, 97, 97)';
        gameBox.querySelector('.game-message').style.margin = '180px 0px 0px 68px';
        gameBox.querySelector('.game-message').style.color = 'rgb(77, 27, 18)';
        gameBox.querySelector('.game-message').textContent = 'GAME OVER!';
        restartButtonArea.innerHTML = '<button id="restart-button" onclick="restartGame()">⟳ RESTART</button>';
    } else {
        gameCanvas.style = '';
        gameBox.style = '';
        gameBox.querySelector('.score-container').style = '';
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

    setCanvasStyle(out=false);
    togglePlayButton(pause=false, hide=false);
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

            snakeBody.unshift(head);
            snakeBody.pop();

            getSnake();
        } else {
            clearInterval(movementInterval);
        }
    }, 100);
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