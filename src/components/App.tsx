import { useState } from "react";
import square from "../shared/square";
import activeState from "../shared/activeState";
import Board from "./Board";
import { Move, makeMove } from "../shared/Move";
import "../styles/built/app.css";
import MainTitle from "./MainTitle";
import Turn from "./Turn";

const initialState = (): Array<Array<square>> =>
  new Array(9).fill([]).map((board) => {
    return new Array(9).fill(square["blank"]);
  });
const model: Array<Move> = [];

function App() {
  const [game, setGame] = useState(model);
  const gameWinner: square = checkGameWin();

  function takeTurn(board: number, position: number) {
    if (isValidMove(board, position)) {
      const isXTurn = game.length > 0 && game[game.length - 1].isXTurn;
      const move = makeMove(board, position, !isXTurn);
      setGame((prevState) => [...prevState, move]);
    }
  }

  function isValidMove(board: number, position: number) {
    return (
      checkBoardWin(board) === square["blank"] &&
      (getActiveBoard() === board || getActiveBoard() === activeState["all"]) &&
      calculateCurrentState()[board][position] === square["blank"]
    );
  }

  function checkBoardWin(board: number): square {
    const currentBoard = calculateCurrentState()[board];
    return calculateWin(currentBoard);
  }

  function getActiveBoard(): activeState {
    if (
      game.length > 0 &&
      checkBoardWin(game[game.length - 1].position) === square["blank"]
    ) {
      return game[game.length - 1].position;
    } else {
      return activeState["all"];
    }
  }

  function checkGameWin(): square {
    const currentGame = calculateCurrentState();
    const superBoard: Array<square> = currentGame.reduce(
      (board, currentBoard) => {
        return [...board, calculateWin(currentBoard)];
      },
      []
    );
    return calculateWin(superBoard);
  }

  function calculateWin(board: Array<square>): square {
    const winStates = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return winStates.reduce((winner: square, winState: Array<number>) => {
      if (
        winner === square["blank"] &&
        board[winState[0]] === board[winState[1]] &&
        board[winState[1]] === board[winState[2]] &&
        board[winState[2]] !== square["blank"]
      ) {
        return board[winState[2]];
      } else {
        return winner;
      }
    }, square["blank"]);
  }

  function calculateCurrentState(): Array<Array<square>> {
    let startingGame: Array<Array<square>> = initialState();
    return game.reduce((gameState, move) => {
      gameState[move.board][move.position] = move.isXTurn
        ? square["x"]
        : square["o"];
      return gameState;
    }, startingGame);
  }

  return (
    <>
      <MainTitle/>
      <div className="game">
        {calculateCurrentState().map((board, i) => {
          const winner: square = checkBoardWin(i);
          const activeBoard: activeState = getActiveBoard();
          return (
            <Board
              key={i}
              position={i}
              board={board}
              winner={winner}
              isActive={
                (i === activeBoard || activeState["all"] === activeBoard) &&
                winner === square["blank"]
              }
              takeTurn={takeTurn}
            />
          );
        })}
      </div>
      <Turn winner={gameWinner} isXTurn={!(game.length>0&&game[game.length-1].isXTurn)}/>
    </>
  );
}

export default App;
