//your JS code here. If required.
// Variables to store player names and game state
let player1 = "";
let player2 = "";
let currentPlayer = "";
let boardState = Array(9).fill(null);

// Elements
const playerForm = document.getElementById("player-form");
const gameBoard = document.getElementById("game-board");
const messageDiv = document.getElementById("message");
const boardDiv = document.getElementById("board");

// Initialize the board
function initializeBoard() {
    boardDiv.innerHTML = ""; // Clear the board
    boardState = Array(9).fill(null); // Reset the board state

    // Create cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = i;
        cell.addEventListener("click", handleCellClick);
        boardDiv.appendChild(cell);
    }
}

// Check for a win or draw
function checkGameStatus() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6],            // Diagonals
    ];

    // Check for a winner
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return currentPlayer;
        }
    }

    // Check for a draw
    if (!boardState.includes(null)) {
        return "Draw";
    }

    return null; // Game still ongoing
}

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.id);

    // Mark the cell for the current player
    boardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer === player1 ? "X" : "O";
    cell.classList.add("disabled");

    // Check game status
    const winner = checkGameStatus();
    if (winner) {
        if (winner === "Draw") {
            messageDiv.textContent = "It's a draw!";
        } else {
            messageDiv.textContent = `${winner}, congratulations you won!`;
        }

        // Disable all cells
        document.querySelectorAll(".cell").forEach(cell => cell.classList.add("disabled"));
        return;
    }

    // Switch turns
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    messageDiv.textContent = `${currentPlayer}, you're up!`;
}

// Start the game
document.getElementById("submit").addEventListener("click", () => {
    player1 = document.getElementById("player-1").value;
    player2 = document.getElementById("player-2").value;

    if (!player1 || !player2) {
        alert("Please enter names for both players.");
        return;
    }

    currentPlayer = player1; // Player 1 starts

    // Hide the form and show the game board
    playerForm.style.display = "none";
    gameBoard.style.display = "block";

    // Display the first player's turn
    messageDiv.textContent = `${currentPlayer}, you're up!`;

    // Initialize the board
    initializeBoard();
});
