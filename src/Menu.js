import React from 'react';
import { Link } from 'react-router-dom';

function Queue() {
    return (
        <nav>
            <ul>
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/downloads">Downloads</Link></li>
            </ul>
        </nav>
        )
}

export default Queue;
