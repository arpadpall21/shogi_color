/*
    歩 = pawn
    
    
    香 = lance
    王 = king
    飛 = rock
    角 = bishop
    桂 = kinght
    金 = gold general
    銀 = silver general
*/


export const defaultBoardState = [
    [{p:2, piece:'香', state:null}, {p:2, piece:'桂', state:null}, {p:2, piece:'銀', state:null}, {p:2, piece:'金', state:null}, {p:2, piece:'王', state:null}, {p:2, piece:'金', state:null}, {p:2, piece:'銀', state:null}, {p:2, piece:'桂', state:null}, {p:2, piece:'香', state:null}],
    [null, {p:2, piece:'飛', state:null}, null, null, null, null, null, {p:2, piece:'角', state:null}, null],
    [{p:2, piece:'歩', state:null}, {p:2, piece:'歩', state:null}, {p:2, piece:'歩', state:null}, {p:2, piece:'歩', state:null}, {p:2, piece:'歩', state:null}, {p:2, piece:'歩', state:null}, {p:2, piece:'歩', state:null}, {p:2, piece:'歩', state:null}, {p:2, piece:'歩', state:null}],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [{p:1, piece:'歩', state:null}, {p:1, piece:'歩', state:null}, {p:1, piece:'歩', state:null}, {p:1, piece:'歩', state:null}, {p:1, piece:'歩', state:null}, {p:1, piece:'歩', state:null}, {p:1, piece:'歩', state:null}, {p:1, piece:'歩', state:null}, {p:1, piece:'歩', state:null}],
    [null, {p:1, piece:'角', state:null}, null, null, null, null, null, {p:1, piece:'飛', state:null}, null],
    [{p:1, piece:'香', state:null}, {p:1, piece:'桂', state:null}, {p:1, piece:'銀', state:null}, {p:1, piece:'金', state:null}, {p:1, piece:'王', state:null}, {p:1, piece:'金', state:null}, {p:1, piece:'銀', state:null}, {p:1, piece:'桂', state:null}, {p:1, piece:'香', state:null}]
];

export function calcStep(cellkey, board){
    const v = Number(cellkey[0])    // coordinate order implementation -> vertical horizontal
    const h = Number(cellkey[2])
    const newBoard = Object.assign({}, board)   // new object required in order to change the component state

    const possibleMoves =  calcPossibleMoves(newBoard.board[v][h]);
    for(let i of possibleMoves){
        const cellToStep = newBoard.board[v+i[0]] && newBoard.board[v+i[0]][h+i[1]]
        
        console.log( cellToStep )
        
        if (cellToStep === undefined) {   // ignoring off table moves
            continue
        }
        
        if (cellToStep === null) {
            newBoard.board[v+i[0]][h+i[1]] = {state:'possibleMove'}
            
            continue
        }
    }
    newBoard.board[v][h].state = 'selected'
    newBoard.phase = 'move'
    
    
    
    // newBoard.board[h][v].state = 'selected'
    
    // if (!newBoard.board[h-1][v]) {
    //     newBoard.board[h-1][v] = {}
    // }
    // newBoard.board[h-1][v].state = 'possibleMove'
    // newBoard.phase = 'move'

    
    // console.log( board )

    return newBoard

    // pawn =   player 1   =   h-1 v0

}

function calcPossibleMoves(cell){
    switch (cell.piece) {
        case '歩':
            return pawnMoves(cell.p)
        case '銀':
            return silverGeneralMoves(cell.p)
        default:
            return null
    }

}

function pawnMoves(player) {
    if (player === 1) {
        return [[-1, 0]]
    }
    return [[1, 0]]
}

function silverGeneralMoves(player){
    if (player === 1) {
        return [[-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 1]]
    }
    return [[1, 1], [1, 0], [1, -1], [-1, 1], [-1, -1]]
}


// function bishopMoves(){
//     return [
//         [-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7], [-8, -8],
//         [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8],
    
    
//     ]
// }