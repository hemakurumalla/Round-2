document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restartButton');
    const startButton = document.getElementById('startButton');
    let currentPlayer = 'X';
    let gameOver = false;
    let winningCombination = null;

    const cells = Array.from({ length: 9 }, (_, index) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = index;
        cell.addEventListener('click', () => makeMove(cell));
        return cell;
    });

    // Function to initialize the game board
    function initBoard() {
        cells.forEach(cell => board.appendChild(cell));
        message.textContent = "Player X's turn";
        startButton.classList.add('hidden');
        board.classList.remove('hidden');
        restartButton.classList.remove('hidden');
        currentPlayer = 'X';
        gameOver = false;
        winningCombination = null;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winner-cell');
        });
    }

    // Function to handle player's move
    function makeMove(cell) {
        if (!gameOver && !cell.textContent) {
            cell.textContent = currentPlayer;
            checkForWin();
            togglePlayer();
        }
    }

    // Function to check for a win
    function checkForWin() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                gameOver = true;
                winningCombination = combo;
                setTimeout(() => {
                    message.textContent = `Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
                    highlightWinner();
                }, 300); // Delay to make the winner message more noticeable
            }
        }

        if (!cells.some(cell => !cell.textContent) && !gameOver) {
            gameOver = true;
            setTimeout(() => {
                message.textContent = "It's a draw!";
            }, 300); // Delay to display the draw message
        }
    }

    // Function to toggle players
    function togglePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }

    // Function to highlight the winning combination
    function highlightWinner() {
        if (winningCombination) {
            for (const index of winningCombination) {
                cells[index].classList.add('winner-cell');
            }
        }
    }

    // Event listener for the Start Game button
    startButton.addEventListener('click', initBoard);

    // Event listener for the Restart Game button
    restartButton.addEventListener('click', initBoard);
});
