const tiles = document.querySelectorAll(".tile");
const restartBtn = document.querySelector(".restart-btn");
const winner = document.querySelector(".winner");
let disablePlayer = false;
const gameBoard = (() => {
  const board = ["1", "", "", "", "", "", "", "", "", ""];

  const setBoard = (index, marker) => {
    board[index] = marker;
  };

  const getBoard = (index) => {
    return board[index];
  };

  const reset = () => {
    for (let i = 1; i < board.length; i++) {
      board[i] = "";
      tiles.forEach((tile) => {
        tile.textContent = "";
        tile.classList.remove("o","x")
      });
      winner.textContent = "";
    }
  };

  const checkWinner = (player) => {
    return (
      (board[1] == player && board[2] == player && board[3] == player) ||
      (board[4] == player && board[5] == player && board[6] == player) ||
      (board[7] == player && board[8] == player && board[9] == player) ||
      (board[1] == player && board[4] == player && board[7] == player) ||
      (board[2] == player && board[5] == player && board[8] == player) ||
      (board[3] == player && board[6] == player && board[9] == player) ||
      (board[1] == player && board[5] == player && board[9] == player) ||
      (board[3] == player && board[5] == player && board[7] == player)
    );
  };

  const fullBoard = () => {
    return board.every((tile) => tile != "");
  };

  return { setBoard, getBoard, reset, checkWinner, fullBoard };
})();

const displayController = (() => {
  tiles.forEach((tile) => {
    tile.addEventListener("click", (e) => {
      if (disablePlayer) return;
      const data = e.target.dataset.tile;
      if (gameBoard.getBoard(data) != "") return;
      if (gameBoard.checkWinner("X") || gameBoard.checkWinner("O")) {
        return;
      }
      gameBoard.setBoard(data, "X");
      tile.textContent = "X";
      tile.classList.add("x");
      if (gameBoard.checkWinner("X") == true) {
        winner.textContent = `X Won!`;
        return;
      }
      if (gameBoard.fullBoard()) {
        winner.textContent = "DRAW!";
        return;
      }
      disablePlayer = true;
      setTimeout(() => {
        computerController.computerSetBoard();
        disablePlayer = false;
      }, 1000);
    });
  });

  restartBtn.addEventListener("click", gameBoard.reset);
})();

const computerController = (() => {
  const computerSetBoard = () => {
    while (true) {
      const computerInput = Math.floor(Math.random() * 9) + 1;
      if (gameBoard.getBoard(computerInput) == "") {
        gameBoard.setBoard(computerInput, "O");
        computerController.computerDisplaySet(computerInput);
        if (gameBoard.checkWinner("O") == true) {
          winner.textContent = `O Won!`;
          return;
        }
        if (gameBoard.fullBoard()) {
          winner.textContent = "DRAW!";
          return;
        }
        return;
      }
    }
  };

  const computerDisplaySet = (data) => {
    tiles.forEach((tile) => {
      const index = tile.dataset.tile;
      if (index == data) {
        tile.textContent = "O";
        tile.classList.add("o");
      }
    });
  };

  return { computerSetBoard, computerDisplaySet };
})();
