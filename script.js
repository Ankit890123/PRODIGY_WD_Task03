document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const message = document.getElementById('message');
  const restartBtn = document.getElementById('restartBtn');
  let currentPlayer = 'X';
  let gameActive = true;
  let cells = [];

  // Initialize game board
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', () => handleCellClick(cell));
    board.appendChild(cell);
    cells.push(cell);
  }

  // Handle cell click
  function handleCellClick(cell) {
    const index = cell.dataset.index;
    if (!gameActive || cells[index].textContent !== '') return;
    
    cells[index].textContent = currentPlayer;
    
    if (checkWin() || checkDraw()) {
      gameActive = false;
      message.textContent = checkWin() ? `${currentPlayer} wins!` : 'It\'s a draw!';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `${currentPlayer}'s turn`;
    }
  }

  // Check for a win
  function checkWin() {
    const winCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winCombos.some(combo => {
      return combo.every(index => cells[index].textContent === currentPlayer);
    });
  }

  // Check for a draw
  function checkDraw() {
    return cells.every(cell => cell.textContent !== '');
  }

  // Restart game
  restartBtn.addEventListener('click', () => {
    cells.forEach(cell => {
      cell.textContent = '';
    });
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = `${currentPlayer}'s turn`;
  });
});
