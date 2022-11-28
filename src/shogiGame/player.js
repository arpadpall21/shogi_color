import React, { useState } from 'react';
import './css/player.css'

export function Player(props) {
    const [playerActive, updatePlayerActive] = useState(props.active)
    const playerNr = props.playerNr
    const playerColor = playerNr === 1 ? 'green' : 'red'
    
    let backgroundColor = 'white';
    
    if (playerActive) {
        backgroundColor = playerColor;
    }
    
    return (
        <div className="player"> <span style={{backgroundColor, borderColor:playerColor}}
        >Player {playerNr} </span> </div>
    )
}