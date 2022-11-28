import React, { useState } from 'react';
import { Player } from './player'
import './board.css'

export function ShogiBoard(prop) {
    const boardDefault = [
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
    const [boardState, updateBoardState] = useState(boardDefault)
    
    
    
    
    return (
        <div>
            <Player />
            <table className='shogiBoard'>
                {boardState.map( r => {
                    return <tr>
                        {r.map( d => {
                            return <td> {d} </td>
                        })}
                    </tr>
                })}
            </table>
            <Player />
        </div>
    )
}