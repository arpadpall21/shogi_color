import React from 'react';
import './css/main.css'
import { Board } from './board'
import { Player } from './player'

export function ShogiGame(prop) {
    return (
        <div className="gameContainer">
            <Player playerNr={1} active={true}/>
            <Board />
            <Player playerNr={2} active={false}/>
        </div>
    )
}
