import React, { useState } from 'react'
import square from '../shared/square'
import Board from './Board'
import { Move, makeMove } from '../shared/Move'
import '../styles/app.css'

const initialState = ():Array<Array<square>> => new Array(9).fill([]).map(board => {return new Array(9).fill(square["blank"])});
const model: Array<Move> = []

function App() {
  const [game, setGame] = useState(model)

  function takeTurn(board: number, position: number) {
    const isXTurn = game.length > 0 ? game[game.length - 1].isXTurn : false
    const move = makeMove(board, position, !isXTurn)
    setGame((prevState) => [...prevState, move])
  }

  function checkBoardWin(board:number):square {
    const winStates = [[0,1,2],[3,4,5],[6,7,8],[0,3,5],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    const currentBoard =calculateCurrentState()[board];
    winStates.forEach((winState) => {
      if(currentBoard[winState[0]]===currentBoard[winState[1]]
        &&currentBoard[winState[1]]===currentBoard[winState[2]]
        &&currentBoard[winState[1]]!==square['blank']) {
          return currentBoard[winState[0]];
        }
    })
    return square["blank"];
  }

  function getActiveBoard() {
    //I liked that enum from before
  }

  function checkGameWin() {
    const winStates = [[0,1,2],[3,4,5],[6,7,8],[0,3,5],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    //reduce all boards with checkboardwin function to a winning boards then do the same winstates for each on this
  }

  function calculateCurrentState(): Array<Array<square>> {
    let startingGame: Array<Array<square>> = initialState()
    console.log(startingGame)
    return game.reduce((gameState, move) => {
      gameState[move.board][move.position] = move.isXTurn
        ? square['x']
        : square['o']
      return gameState
    }, startingGame)
  }

  return (
    <div className="game">
      {calculateCurrentState().map((board, i) => {
        return <Board position={i} board={board} takeTurn={takeTurn} />
      })}
    </div>
  )
}

export default App
