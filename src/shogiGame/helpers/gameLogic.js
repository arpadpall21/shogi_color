/*
    歩 = pawn
    銀 = silver general
    金 = gold general
    桂 = kinght
    王 = king
    香 = lance
    飛 = rock
    角 = bishop
    
    と = promoted pawn
    全 = promoted silver general
    龍 = promoted rock
    馬 = promoted bishop
    圭 = promoted knight
    杏 = promoted lance
*/


export const defaultBoardState = [
    // [{p:2, piece:'香', state:null}, {p:2, piece:'桂', state:null}, {p:2, piece:'銀', state:null}, {p:2, piece:'金', state:null}, {p:2, piece:'王', state:null}, {p:2, piece:'金', state:null}, {p:2, piece:'銀', state:null}, {p:2, piece:'桂', state:null}, {p:2, piece:'香', state:null}],
    // [null, {p:2, piece:'飛', state:null}, null, null, null, null, null, {p:2, piece:'角', state:null}, null],
    // [{p:2, piece:'歩', state:null}, {p:2, piece:'歩', state:null}, {p:2, piece:'歩', state:null}, {p:2, piece:'歩', state:null}, {p:2, piece:'歩', state:null}, {p:2, piece:'歩', state:null}, {p:2, piece:'歩', state:null}, {p:2, piece:'歩', state:null}, {p:2, piece:'歩', state:null}],
    [null, null, {p:2, piece:'歩', state:null}, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, {p:1, piece:'歩', state:null}, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [{p:1, piece:'歩', state:null}, {p:1, piece:'歩', state:null}, {p:1, piece:'歩', state:null}, {p:1, piece:'歩', state:null}, {p:1, piece:'歩', state:null}, {p:1, piece:'歩', state:null}, {p:1, piece:'歩', state:null}, {p:1, piece:'歩', state:null}, {p:1, piece:'歩', state:null}],
    [null, {p:1, piece:'角', state:null}, null, null, null, null, null, {p:1, piece:'飛', state:null}, null],
    [{p:1, piece:'香', state:null}, {p:1, piece:'桂', state:null}, {p:1, piece:'銀', state:null}, {p:1, piece:'金', state:null}, {p:1, piece:'王', state:null}, {p:1, piece:'金', state:null}, {p:1, piece:'銀', state:null}, {p:1, piece:'桂', state:null}, {p:1, piece:'香', state:null}]
];

export function calcStep(cellKey, currentActivePlayer, boardState){
    const v = Number(cellKey[0])    // coordinate order implementation -> vertical horizontal
    const h = Number(cellKey[2])

    const newBoardState = Object.assign({}, boardState)   // new object required in order to change the component state

    if (boardState.phase === 'active') {   // active phase logic
        if (boardState.board[v][h] === null || boardState.board[v][h].p !== currentActivePlayer) {
            return  { newBoardState:boardState, stepSuccess:false }   // original board retunred -> component won't be rerendered
        }

        const { possibleMoves } =  calcPossibleMoves(v, h, newBoardState.board);

        console.log( possibleMoves )

        for(let i of possibleMoves){
            const cellToStep = newBoardState.board[v+i[0]] && newBoardState.board[v+i[0]][h+i[1]];

            if (cellToStep === undefined) {   // ignoring off table moves
                continue;
            }

            if (cellToStep === null) {
                newBoardState.board[v+i[0]][h+i[1]] = {state:'step'};
                continue;
            }

            if (cellToStep.p !== newBoardState.board[v][h].p) {
                newBoardState.board[v+i[0]][h+i[1]].state = 'kill';
            }
        }
        newBoardState.board[v][h].state = 'selected';
        newBoardState.phase = 'moving';
        newBoardState.msgStatus = { moveOk:true, winner:false };

        return { newBoardState, stepSuccess:false };
    }

    if (boardState.phase === 'moving') {   // moving phase logic
        if (newBoardState.board[v][h] !== null && newBoardState.board[v][h].state === 'selected') {   // clicking on selected piece is an ok move
            return { newBoardState:resetBoardToActive(newBoardState), stepSuccess:false }
        }

        if (newBoardState.board[v][h] === null || !['step', 'kill'].includes(newBoardState.board[v][h].state)) {    // not an ok move
            newBoardState.msgStatus.moveOk = false;
            return { newBoardState:resetBoardToActive(newBoardState), stepSuccess:false }     // reset board to active phase if not stepped on possible move cell
        }

        const { selected } = getSelectedCell(newBoardState);  // making the step
        newBoardState.board[selected.v][selected.h] = null;
        selected.val.state = null;
        newBoardState.board[v][h] = selected.val;

        updateWinner(newBoardState)         // update winner after the step
        return { newBoardState:resetBoardToActive(newBoardState), stepSuccess:true };
    }
}

function calcPossibleMoves(v, h, board){
    const player = board[v][h].p;
    const piece = board[v][h].piece;

    switch (piece) {
        case '歩': case 'と':
            return { possibleMoves:pawnMoves(player, piece) };
        case '銀': case '全':
            return { possibleMoves:silverGeneralMoves(player, piece) };
        case '飛': case '龍':
            return { possibleMoves:rockMoves(player, piece, board, h, v) };
        case '角': case '馬':
            return { possibleMoves:bishopMoves(player, piece, board, h, v) };
        case '桂': case '圭':
            return { possibleMoves:knightMoves(player, piece) };
        case '香': case '杏':
            return { possibleMoves:lanceMoves(player, piece, board, h, v) };
        case '金':
            return { possibleMoves:goldGeneralMoves(player) };
        case '王':
            return { possibleMoves:kingMoves() };
        default:
            return null
    }
}

function pawnMoves(player, piece) {
    const moves = [[-1, 0]];

    if (piece === 'と') {
        moves.push([-1, 1], [0, 1], [1, 0], [0, -1], [-1, -1]);
    }
    if (player === 1) {
        return moves;
    }

    return inverseMoves(moves);
}

function silverGeneralMoves(player, piece) {
    let moves = [[-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 1]];

    if (piece === '全') {
        moves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0]];
    }

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

function knightMoves(player, piece) {
    let moves = [[-2, -1], [-2, 1]];

    if (piece === '圭') {
        moves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0]];
    }

    if (player === 1) {
        return moves;
    }

    return inverseMoves(moves);
}

function lanceMoves(player, piece, board, h, v) {
    let moves = [
        [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0], [-8, -8]]
    ];

    if (piece === '杏') {
        moves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0]];

        if (player === 1) {
            return moves;
        }
        return inverseMoves(moves);
    }

    if (player === 1) {
        return calcPossibleContinousMoves(v, h, moves, board);
    }

    return calcPossibleContinousMoves(v, h, [inverseMoves(moves[0])], board);
}

function rockMoves(player, piece, board, h, v) {
    const moves = [
        [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0], [-8, 0]],
        [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0]],
        [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7], [0, -8]],
        [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8]]
        
    ];

    if (piece === '龍') {
        moves.push([[-1, -1], [-1, 1], [1, 1], [1, -1]])
    }

    return calcPossibleContinousMoves(v, h, moves, board);
}

function bishopMoves(player, piece, board, h, v) {
    const moves = [
        [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7], [-8, -8]],
        [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8]],
        [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7], [-8, 8]],
        [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7], [8, -8]]
    ];

    if (piece === '馬') {
        moves.push([[-1, 0], [0, 1], [1, 0], [0, -1]])
    }

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
            if (board[v+k[0]] === undefined || board[v+k[0]][h+k[1]] === undefined ||
                (board[v+k[0]][h+k[1]] !== null && board[v+k[0]][h+k[1]] !== undefined && 
                board[v+k[0]][h+k[1]].state === null)) {
                break;
            }
        }
    }

    return  possibleContinousMoves;
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

    return board;
}

function getSelectedCell(board) {

    for (let i = 0; i < board.board.length; i++) {
        for (let k = 0; k < board.board[i].length; k++) {
            if (board.board[i][k] === null) {
                continue;
            }

            if (board.board[i][k].state === 'selected') {
                return { selected:{v:i, h:k, val:board.board[i][k]} };
            }
        }
    }
}

function updateWinner(boardStatus) {
    let p1Pieces = 0;
    let p2Pieces = 0;

    for(const i of boardStatus.board) {
        for(const cell of i) {
            if (cell === null) {
                continue;
            }

            if (cell.p === 1) {
                p1Pieces++;
            } else if (cell.p === 2) {
                p2Pieces++;
            }
        }
    }

    if (p1Pieces <= 0) {
        boardStatus.msgStatus.winner = 2;
    } else if (p2Pieces <= 0) {
        boardStatus.msgStatus.winner = 1;
    } else {
        boardStatus.msgStatus.winner = false;
    }
}
