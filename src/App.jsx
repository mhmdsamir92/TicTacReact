import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import { winningCombinations } from "./winningCombinations.js";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function checkWinner(board) {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        board[a[0]][a[1]] &&
        board[a[0]][a[1]] === board[b[0]][b[1]] &&
        board[a[0]][a[1]] === board[c[0]][c[1]]
      ) {
        return board[a[0]][a[1]]; // Return the winner symbol
      }
    }
    return null; // No winner found
  }

  function checkDraw(board) {
    return board.every((row) => row.every((cell) => cell !== null));
  }

  function resetGame() {
    setGameBoard(initialGameBoard); // Reset the game board
    setActivePlayer("X"); // Reset to Player 1
  }

  const winningPlayer = checkWinner(gameBoard);
  const isDraw = checkDraw(gameBoard);

  function updateGameBoard(rowIndex, cellIndex) {
    if (gameBoard[rowIndex][cellIndex] !== null) {
      return; // Ignore clicks on already occupied cells
    }
    setGameBoard((prevBoard) => {
      const newBoard = [...prevBoard.map((row) => [...row])]; // Create a copy of the board
      if (newBoard[rowIndex][cellIndex] === null) {
        newBoard[rowIndex][cellIndex] = activePlayer;
      }
      return newBoard;
    });
    if (winningPlayer || isDraw) {
      return; // Do not switch players if the game is over
    }
    setActivePlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
  }

  return (
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player
          name="Player 1"
          symbol="X"
          isActivePlayer={activePlayer === "X"}
        />
        <Player
          name="Player 2"
          symbol="O"
          isActivePlayer={activePlayer === "O"}
        />
      </ol>
      {winningPlayer && (
        <GameOver winner={winningPlayer} resetGame={resetGame} />
      )}
      {isDraw && <GameOver winner={null} resetGame={resetGame} />}
      <GameBoard gameBoard={gameBoard} updateGameBoard={updateGameBoard} />
    </div>
  );
}

export default App;
