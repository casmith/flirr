import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AddToQueue from './AddToQueue';
import Menu from './Menu';
import Queue from './Queue';
import Search from './Search';
import axios from 'axios';

function App() {

    const [queue, setQueue] = useState([])
    const [status, setStatus] = useState({})

    const handleEnqueue = (item) => queue.includes(item) || setQueue([].concat(queue, item));
    useEffect(() => {
        axios.get('/api/status').then(response => response.data)
            .then(status => setStatus(status))
    }, [true])
    

    const statusElement = status.connected ? 
        <div class="status">{status.nick} connected to {status.serverName} in channel {status.channel}</div> : 
        <div class="status">Not connected</div>

    return (
        <div>
            
            <Router>
                <Menu downloads={queue.length} />
                {statusElement}
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/search" />
                    </Route>
                    <Route path="/search">
                        <Search handleEnqueue={handleEnqueue}/>
                    </Route>
                    <Route path="/downloads">
                        <AddToQueue />
                        <Queue queue={queue} />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
