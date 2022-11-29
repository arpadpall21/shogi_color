import React, { useState } from 'react'
import './css/board.css'
import { store, incrementMoves } from '../store'



/*
王 = king
飛 = rock
角 = bishop
桂 = kinght
香 = lance
金 = gold general
銀 = silver general
歩 = pawn
*/

export function Board() {
    const defaultBoardState = [
        [{p:2, piece:'香'}, {p:2, piece:'桂'}, {p:2, piece:'銀'}, {p:2, piece:'金'}, {p:2, piece:'王'}, {p:2, piece:'金'}, {p:2, piece:'銀'}, {p:2, piece:'桂'}, {p:2, piece:'香'}],
        [null, {p:2, piece:'飛'}, null, null, null, null, null, {p:2, piece:'角'}, null],
        [{p:2, piece:'歩'}, {p:2, piece:'歩'}, {p:2, piece:'歩'}, {p:2, piece:'歩'}, {p:2, piece:'歩'}, {p:2, piece:'歩'}, {p:2, piece:'歩'}, {p:2, piece:'歩'}, {p:2, piece:'歩'}],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [{p:1, piece:'歩'}, {p:1, piece:'歩'}, {p:1, piece:'歩'}, {p:1, piece:'歩'}, {p:1, piece:'歩'}, {p:1, piece:'歩'}, {p:1, piece:'歩'}, {p:1, piece:'歩'}, {p:1, piece:'歩'}],
        [null, {p:1, piece:'角'}, null, null, null, null, null, {p:1, piece:'飛'}, null],
        [{p:1, piece:'香'}, {p:1, piece:'桂'}, {p:1, piece:'銀'}, {p:1, piece:'金'}, {p:1, piece:'王'}, {p:1, piece:'金'}, {p:1, piece:'銀'}, {p:1, piece:'桂'}, {p:1, piece:'香'}]
    ]

    const [boardState, updateBoardState] = useState(defaultBoardState)
    const tableSize = Number.parseInt((window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth) / 100 * 75)
    
    
    function move(ev) {
        ev.preventDefault();
        
        store.dispatch(incrementMoves())
        // updateBoardState()
    }
    
    
    let cellId = 0;
    return (
        <div className="boardContainer">
            <table className='shogiBoard' style={{width:tableSize, height:tableSize}} onClick={move}>
                <tbody>
                {boardState.map( r => {
                    cellId += 10
                    return <tr key={cellId}>
                        {r.map( d => {
                            cellId++
                            if (d) {
                                const playerColor = d.p === 1 ? 'green' : 'red'
                                return <td key={cellId} style={{backgroundColor:playerColor}}> {d.piece}  </td>
                            }
                            return <td key={cellId} style={{visibility:'hidden'}}> 歩 </td>
                        })}
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    )
}