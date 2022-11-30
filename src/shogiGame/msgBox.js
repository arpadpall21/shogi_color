import React from 'react';
import './css/msgBox.css'


export function MessageBox(props) {
    if (!props.msgStatus.moveOk) {
        return <div className='msgBox' style={{backgroundColor:'red', animationName:'hideSlow'}}> Invalid Move </div>
    }
    if (props.msgStatus.winner) {
        return <div className='msgBox' style={{backgroundColor:'green'}}> Player {props.msgStatus.winner} Wins! </div>
    }
}
