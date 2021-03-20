export interface Move {
    board:number
    position: number
    isXTurn: boolean 
}

export function makeMove(board:number, position: number, isXTurn:boolean):Move {
    return {
        board,
        position,
        isXTurn
    }
}

