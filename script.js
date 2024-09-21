const cells = document.querySelectorAll('[data-cell]');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
let circleTurn;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const X_CLASS = 'x';
const O_CLASS = 'o';

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS, O_CLASS, 'winning-cell');
        cell.textContent = ''; // Limpa o conteúdo visual da célula
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setMessage('');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
        highlightWinningCells(currentClass);
        setMessage(`Jogador ${currentClass.toUpperCase()} venceu!`);
    } else if (isDraw()) {
        endGame(true);
        setMessage('Empate!');
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = circleTurn ? 'O' : 'X'; // Adiciona o X ou O visualmente na célula
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function highlightWinningCells(currentClass) {
    winningCombinations.forEach(combination => {
        if (combination.every(index => cells[index].classList.contains(currentClass))) {
            combination.forEach(index => {
                cells[index].classList.add('winning-cell');
            });
        }
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function endGame(draw) {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

function setMessage(message) {
    messageElement.textContent = message;
}
