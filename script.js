const playButtonArea = document.getElementById('play-button-area');
const restartButtonArea = document.getElementById('restart-button-area');
const GameCanvas = document.querySelector('.game-canvas');
const snake = document.getElementById('snake');
const canvasBoundary = {top: 15, right: 495, bottom: 465, left: 0}

let snakePosition = {x: 225, y:200};
let snakeAngle = 0;
let snakeLength = 40;
let moveRate = 0.5;

function togglePlayButton(pause, hide) {
    if (pause) {
        playButtonArea.innerHTML = '<button id="play-button" onclick="togglePlayButton(pause=false)">▶ RESUME</button>';
    } else {
        moveSnake();
        playButtonArea.innerHTML = '<button id="play-button" onclick="togglePlayButton(pause=true)">● PAUSE</button>';
    };

    if (hide) {
        playButtonArea.innerHTML = '';
    };
}

function restartGame() {
    snakePosition = {x: 225, y:200};
    snakeAngle = 0;
    snakeLength = 40;
    moveRate = 0.5;

    GameCanvas.style.backgroundColor = 'rgb(21, 16, 26)'
    GameCanvas.style.border = 'dashed 1px rgb(128, 128, 128)';
    GameCanvas.querySelector('.score-container').style.backgroundColor = 'rgb(44, 36, 51)';
    GameCanvas.querySelector('.score-container').style.borderBottom = 'solid 1px rgb(128, 128, 128)';
    GameCanvas.querySelector('.out-message').textContent = '';
    restartButtonArea.innerHTML = '';

    togglePlayButton(pause=false, hide=false);
} 

function moveSnake() {
    const movementInterval = setInterval(() => {
    const playButton = document.getElementById('play-button');
    if (playButton.textContent=="● PAUSE") {        
        if ((snakePosition.x > canvasBoundary.left && snakePosition.x < canvasBoundary.right-snakeLength) 
            && (snakePosition.y > canvasBoundary.top && snakePosition.y < canvasBoundary.bottom-snakeLength) 
            ) {
            if (snakeAngle==0) {
                snakePosition.x += moveRate;
            } else if (snakeAngle==90) {
                snakePosition.y += moveRate;
            } else if (snakeAngle==180) {
                snakePosition.x -= moveRate;
            } else if (snakeAngle==270) {
                snakePosition.y -= moveRate;
            }
            snake.style.transform = `translate(${snakePosition.x}px, ${snakePosition.y}px) rotate(${snakeAngle}deg)`;

            window.addEventListener('keyup', (e) => {
                switch (e.code) {
                    case 'ArrowUp':
                        snakeAngle = 270;
                        break;
                    case 'ArrowDown':
                        snakeAngle = 90;
                        break;
                    case 'ArrowRight':
                        snakeAngle = 0;
                        break;
                    case 'ArrowLeft':
                        snakeAngle = 180;
                        break;
                }
            })

        } else {
            clearInterval(movementInterval);
            togglePlayButton(pause=true, hide=true);
            
            GameCanvas.style.backgroundColor = 'rgba(24, 9, 9, 1)'
            GameCanvas.style.border = 'dashed 1px rgb(196, 97, 97)';
            GameCanvas.querySelector('.score-container').style.backgroundColor = 'rgba(143, 55, 55, 1)';
            GameCanvas.querySelector('.score-container').style.borderBottom = 'solid 1px rgb(196, 97, 97)';
            GameCanvas.querySelector('.out-message').textContent = 'OUT!';
            restartButtonArea.innerHTML = '<button id="restart-button" onclick="restartGame()">⟳ RESTART</button>';
        }
    } else {
        clearInterval(movementInterval);
    }
    }, 5);
};
    
