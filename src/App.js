import React, { Component } from 'react';
import './App.css'
import { ShogiGame } from './shogiGame/main'


class App extends Component {
    render() {
        return (
        <div className='App'>
            <h2 className='title'> Shogi </h2>
            <ShogiGame />
        </div>
        );
    }
}

export default App;
