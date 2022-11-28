import React, { Component } from 'react';
import './App.css'
import { ShogiBoard } from './shogiBoard/board'
import { Player } from './shogiBoard/board'

class App extends Component {
    render() {
        return (
        <div className='App'>
            <h2 className='title'> Shogi </h2>
            <ShogiBoard />
        </div>
        );
    }
}

export default App;
