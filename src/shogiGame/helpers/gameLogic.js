/*
    歩 = pawn
    銀 = silver general
    金 = gold general
    桂 = kinght
    王 = king
    香 = lance
    飛 = rock
    角 = bishop
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

export function calcStep(cellkey, currentActivePlayer, board){
    const v = Number(cellkey[0])    // coordinate order implementation -> vertical horizontal
    const h = Number(cellkey[2])

    const newBoard = Object.assign({}, board)   // new object required in order to change the component state

    if (board.phase === 'active') {   // active phase logic
        if (board.board[v][h].p !== currentActivePlayer) {
            return  { newBoard:board, stepSuccess:false }   // original board retunred -> component won't be rerendered
        }

        const possibleMoves =  calcPossibleMoves(v, h, newBoard.board);

        for(let i of possibleMoves){
            const cellToStep = newBoard.board[v+i[0]] && newBoard.board[v+i[0]][h+i[1]]

            if (cellToStep === undefined) {   // ignoring off table moves
                continue;
            }

            if (cellToStep === null) {
                newBoard.board[v+i[0]][h+i[1]] = {state:'step'};
                continue;
            }

            if (cellToStep.p !== newBoard.board[v][h].p) {
                newBoard.board[v+i[0]][h+i[1]].state = 'kill';
            }
        }
        newBoard.board[v][h].state = 'selected';
        newBoard.phase = 'moving';

        return { newBoard, stepSuccess:false }
    }

    if (board.phase === 'moving') {   // moving phase logic
        if (!['step', 'kill'].includes(newBoard.board[v][h].state)) {
            return { newBoard:resetBoardToActive(newBoard), stepSuccess:false }     // reset board to active phase if not stepped on possible move cell
        }

        const { _v, _h, val } = getSelectedCell(newBoard);  // taking step
        newBoard.board[_v][_h] = null;
        val.state = null;
        newBoard.board[v][h] = val;
        return{ newBoard:resetBoardToActive(newBoard), stepSuccess:true }
    }
}

function calcPossibleMoves(v, h, board){
    const player = board[v][h].p

    switch (board[v][h].piece) {
        case '歩':
            return pawnMoves(player);
        case '銀':
            return silverGeneralMoves(player);
        case '金':
            return goldGeneralMoves(player);
        case '桂':
            return knightMoves(player);
        case '香':
            return lanceMoves(player, board, h, v);
        case '飛':
            return rockMoves(player, board, h, v);
        case '角':
            return bishopMoves(player, board, h, v);
        case '王':
            return kingMoves();
    }
}

function pawnMoves(player) {
    const moves = [[-1, 0]];
    if (player === 1) {
        return moves;
    }

    return inverseMoves(moves);
}

function silverGeneralMoves(player) {
    const moves = [[-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 1]];
    if (player === 1) {
        return moves;
    }

    return inverseMoves(moves);
}

function goldGeneralMoves(player) {
    const moves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0]];
    if (player === 1) {
        return moves;
    }

    return inverseMoves(moves);
}

function knightMoves(player) {
    const moves = [[-2, -1], [-2, 1]];
    if (player === 1) {
        return moves;
    }

    return inverseMoves(moves);
}

function lanceMoves(player, board, h, v) {
    const moves = [
        [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0], [-8, -8]]
    ];

    if (player === 1) {
        return calcPossibleContinousMoves(v, h, moves, board);
    }

    return calcPossibleContinousMoves(v, h, [inverseMoves(moves[0])], board);
}

function rockMoves(player, board, h, v) {
    const moves = [
        [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0], [-8, 0]],
        [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0]],
        [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7], [0, -8]],
        [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8]]
        
    ];

    return calcPossibleContinousMoves(v, h, moves, board);
}

function bishopMoves(player, board, h, v) {
    const moves = [
        [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7], [-8, -8]],
        [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8]],
        [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7], [-8, 8]],
        [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7], [8, -8]]
    ];

    return calcPossibleContinousMoves(v, h, moves, board);
}

function kingMoves(){
    return [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
}


function inverseMoves(moves) {   // inverses possible moves for player 2
    for (const element of moves) {
        for (let i = 0; i < 2; i++) {
            if (element[i] === 0) {
                continue;
            }
            element[i] = -element[i];
        }
    }

    return moves
}

function calcPossibleContinousMoves(v, h, moves, board) {
    const possibleContinousMoves = []
    for (let i of moves) {
        for(let k of i) {
            possibleContinousMoves.push([k[0], k[1]])
            if (board[v+k[0]][h+k[1]] !== null && board[v+k[0]][h+k[1]] !== undefined && board[v+k[0]][h+k[1]].state === null) {
                break;
            }
        }
    }

    return  possibleContinousMoves
}

function resetBoardToActive(board) {
    board.phase = 'active';

    for (const element of board.board) {
        for (let i = 0; i < element.length; i++) {
            if (element[i] === null ) {
                continue;
            }
            if (element[i].p === undefined) {
                element[i] = null;
                continue;
            }
            element[i].state = null;
        }
    }

    return board
}

function getSelectedCell(board) {
    for (let i = 0; i < board.board.length; i++) {
        for (let k = 0; k < board.board[i].length; k++) {
            if (board.board[i][k] === null) {
                continue;
            }
            if (board.board[i][k].state === 'selected') {
                return { _v:i, _h:k, val:board.board[i][k]}
            }
        }
    }
}
