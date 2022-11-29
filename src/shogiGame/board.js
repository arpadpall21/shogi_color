import React, { useState } from 'react';
import './css/board.css';
import { InvalidMoveMessage } from './invalidMove';
import { store, incrementMoves } from '../store';
import { defaultBoardState, calcStep } from './helpers/gameLogic'

let invalidMessage = undefined


export function Board() {
    console.log( '************************rerendered ')
    const [boardState, updateBoardState] = useState({board:defaultBoardState, phase:'active'});
    const currentActivePlayer = store.getState().currentActivePlayer
    const tableSize = Number.parseInt((window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth) / 100 * 75);

    function pieceMoveHandler(ev) {
        ev.preventDefault();
        
        const cellKey = ev.currentTarget.getAttribute('cellkey');
        const { newBoard, stepSuccess, moveOk } = calcStep(cellKey, currentActivePlayer, boardState);

        if (!moveOk) {
            invalidMessage = <InvalidMoveMessage />;
        } else {
            invalidMessage = undefined;
        }

        if (stepSuccess) {
            store.dispatch(incrementMoves());
        }

        updateBoardState(newBoard)
    }

    let rowIdx = -1;
    return (
        <div className="boardContainer" style={{position:'relative'}}>
            {invalidMessage}
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

                                return <td key={cellId} cellkey={cellId} style={{backgroundColor}} onClick={pieceMoveHandler}> {d.piece} </td>
                            }

                            return <td key={cellId} cellkey={cellId} onClick={pieceMoveHandler}> <span style={{visibility:'hidden'}}>歩</span> </td>
                        })}
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    )
}