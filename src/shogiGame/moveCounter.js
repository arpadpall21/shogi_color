import React, { useState } from 'react';
import { store } from '../store'


export function MoveCounter() {
    const [moves, updateMoves] = useState(store.getState().moves-1)
    
    store.subscribe( () => {
        updateMoves(store.getState().moves-1)
    })
    
    return (
        <span style={{position:'absolute', left:20}}>Moves:{moves}</span>
    )
}