import React, { useState } from 'react';
import './css/player.css';
import { store } from '../store';


export function Player(props) {
    const [activePlayer, updateActivePlayer] = useState(store.getState().currentActivePlayer);
    const playerNr = props.playerNr;
    const playerColor = playerNr === 1 ? 'green' : 'blueViolet';
    let backgroundColor = 'white';
    
    if (activePlayer === playerNr) {
        backgroundColor = playerColor;
    }
    
    store.subscribe( () => {
        updateActivePlayer(store.getState().currentActivePlayer);
    })
    
    return (
        <div className="player"> <span style={{backgroundColor, borderColor:playerColor}}>Player {playerNr}</span> </div>
    )
}
