import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Downloads from './Downloads';
import Menu from './Menu';
import Search from './Search';

function App() {

    const [status, setStatus] = useState({})
    const [queue, setQueue] = useState([]);
    
    const loadQueue = () => {
        return axios.get('/api/queue')
            .then((response) => response.data)
            .catch((error) => console.error(error))
    }
    
    const reloadQueue = () => {
        return loadQueue()
            .then(q => {
                setQueue(q.servers
                    .flat()
                    .reduce((acc, item) => {
                        item.requests.forEach(r => acc.push({nick: item.nick, filename: r.request, status: r.status}))
                        return acc;
                    }, []));
            })
            .catch(e => console.error(e));
    }

    useEffect(() => {
        reloadQueue();
        const interval = setInterval(() => {
            reloadQueue();
        }, 5000);
        return () => {clearInterval(interval);};
    }, []);

    const handleEnqueue = (item) => {
        const request = {servers: [{nick: item.tracks[0].nick, requests: item.tracks.map(track => ({request: track.requestString}))}]};
        axios.post('/api/queue', request)
            .then(response => response.data)
            .then(console.log("Submitted request to queue"));
    };

    useEffect(() => {
        axios.get('/api/status').then(response => response.data)
            .then(status => setStatus(status))
        
    }, [true])

    const statusElement = status.connected ? 
        <div class="status">{status.nick} connected to {status.serverName} in channel {status.channel}</div> : 
        <div class="status">Not connected</div>

    return (
        <div className="container">
            <div className="content">
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
                        <Downloads queue={queue} />
                    </Route>
                </Switch>
            </Router>
            </div>
        </div>
    );
}

export default App;
