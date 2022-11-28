import React, { useState } from 'react';
import './css/player.css'

export function Player(prop) {
    const [playerActive, updateActiveState] = useState(prop)
    
    return (
        <div className="player"> <span>Player</span> </div>
    )
}