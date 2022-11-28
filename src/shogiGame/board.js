import React, { useState } from 'react'
import './css/board.css'
import { store, incrementMoves } from '../store'


export function Board() {
    console.log( 'rerendered' )
    const defaultBoardState = [
        [1,2,3,4,5,6,7,8,9],
        [1,2,3,4,5,6,7,8,9],
        [1,2,3,4,5,6,7,8,9],
        [1,2,3,4,5,6,7,8,9],
        [1,2,3,4,5,6,7,8,9],
        [1,2,3,4,5,6,7,8,9],
        [1,2,3,4,5,6,7,8,9],
        [1,2,3,4,5,6,7,8,9],
        [1,2,3,4,5,6,7,8,9]
    ]

    const [boardState, updateBoardState] = useState(defaultBoardState)
    const tableSize = Number.parseInt((window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth) / 100 * 75)
    
    
    function move(ev) {
        ev.preventDefault();
        
        store.dispatch(incrementMoves())
        updateBoardState()
    }
    
    
    
    return (
        <div className="boardContainer">
            <table className='shogiBoard' style={{width:tableSize, height:tableSize}} onClick={move}>
                {boardState.map( r => {
                    return <tr>
                        {r.map( d => {
                            return <td> {d} </td>
                        })}
                    </tr>
                })}
            </table>
        </div>
    )
}