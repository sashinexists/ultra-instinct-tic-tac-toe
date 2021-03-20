import React from 'react'
import square from '../shared/square'

interface Props {
    board: number,
    position: number,
    value: square,
    takeTurn: Function,
}

export default function Square(props:Props) {
    const { board, position, value, takeTurn } = props;
    return (
        <div onClick={()=>takeTurn(board, position)} className={`square square-id__${board}-${position} square-value__${value}`}>
            <span className={`square-symbol square-symbol__${value}`}>{value}</span>
        </div>
    )
}