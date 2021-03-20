import React from 'react'
import square from '../shared/square'
import Square from './Square'

interface Props {
    position:number
    board: Array<square>
    takeTurn: Function
}

export default function Board(props:Props) {
    const {board, position, takeTurn} = props;
    return (
        <div className={`board board-${position} board-victory__`}>
            {board.map((sq,i) => {
                return <Square board={position} position={i} value={sq} takeTurn={takeTurn} />//value will be changed to sq
            })}
        </div>
    )
}
