import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu({downloads}) {
    return (
        <nav>
            <ul>
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/downloads">Downloads{downloads ? ` (${downloads})` : ''}</Link></li>
            </ul>
        </nav>
        )
}

export default Menu;
