import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AddToQueue from './AddToQueue';
import Menu from './Menu';
import Queue from './Queue';
import Search from './Search';

function App() {
    return (
        <div>
            <Router>
                <Menu />
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/search" />
                    </Route>
                    <Route path="/search">
                        <Search />
                    </Route>
                    <Route path="/downloads">
                        <AddToQueue />
                        <Queue />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
