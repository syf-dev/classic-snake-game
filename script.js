function toggleStartButton() {
    const startButton = document.getElementById('start-button');
    const restartButtonArea = document.getElementById('restart-button-area');

    var toggledButton = startButton.textContent=="▶ START" ? "● STOP"  : "▶ START";
    startButton.textContent = toggledButton;

    restartButtonArea.innerHTML = '<button id="restart-button">⟳ RESTART</button>';
};