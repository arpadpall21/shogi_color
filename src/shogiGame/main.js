import React from 'react';
import './css/main.css'
import { Board } from './board'
import { Player } from './player'
import { MoveCounter } from './moveCounter'

export function ShogiGame(prop) {
    return (
        <div className="gameContainer">
            <MoveCounter />
            <Player playerNr={2}/>
            <Board />
            <Player playerNr={1}/>
        </div>
    )
}
