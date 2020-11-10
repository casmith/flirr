import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AddToQueue from './AddToQueue';
import Menu from './Menu';
import Queue from './Queue';
import Search from './Search';


function App() {

    const [queue, setQueue] = useState([])

    const handleEnqueue = (item) => queue.includes(item) || setQueue([].concat(queue, item));

    return (
        <div>
            <Router>
                <Menu downloads={queue.length} />
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
