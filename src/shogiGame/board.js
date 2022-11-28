import React, { useState } from 'react'
import './css/board.css'

export function Board(props) {
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

    const tableSize = Number.parseInt((window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth) / 100 * 75)
    return (
        <div className="boardContainer">
            <table className='shogiBoard' style={{width:tableSize, height:tableSize}}>
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