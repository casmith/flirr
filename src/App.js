import React from 'react';
import './App.css';
import Queue from './Queue';
import AddToQueue from './AddToQueue';

function App() {
    return (
        <div>
            <AddToQueue />
            <Queue />
        </div>
    );
}

export default App;
