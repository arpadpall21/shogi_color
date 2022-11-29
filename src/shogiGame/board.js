import React, { useState } from 'react';
import './css/board.css';
import { store, incrementMoves } from '../store';
import { defaultBoardState, calcStep } from './helpers/gameLogic'


export function Board() {
    console.log( '************************rerendered ')
    const [boardState, updateBoardState] = useState({board:defaultBoardState, phase:'active'});
    const currentActivePlayer = store.getState().currentActivePlayer
    const tableSize = Number.parseInt((window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth) / 100 * 75);
    
    
    
    function pieceMove(ev) {
        ev.preventDefault();
        const cellKey = ev.currentTarget.getAttribute('cellkey')
        
        
        const newTable = calcStep(cellKey, currentActivePlayer, boardState)
        
        
        
        // store.dispatch(incrementMoves());
        updateBoardState(newTable)
    }

    console.log( boardState )

    let rowIdx = -1;
    return (
        <div className="boardContainer">
            <table className='shogiBoard' style={{width:tableSize, height:tableSize}}>
                <tbody>
                {boardState.board.map( r => {
                    rowIdx++;
                    let cellIdx = -1;

                    return <tr key={rowIdx}>
                        {r.map( d => {
                            cellIdx++;
                            const cellId = `${rowIdx}-${cellIdx}`

                            if (d) {
                                let backgroundColor = undefined

                                if (d.state) {
                                    switch (d.state) {
                                        case 'selected':
                                            backgroundColor = 'orange';
                                            break;
                                        case 'step':
                                            backgroundColor = 'yellow';
                                            break;
                                        case 'kill':
                                            backgroundColor = 'red';
                                    }
                                } else {
                                    backgroundColor = d.p === 1 ? 'green' : 'blueViolet';
                                }

                                return <td key={cellId} cellkey={cellId} style={{backgroundColor}} onClick={pieceMove}> {d.piece} </td>
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