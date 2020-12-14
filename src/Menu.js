import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import './Menu.css';

function Menu({downloads}) {
    const location = useLocation();
    return (
        <AppBar position="static">
            <Tabs value={location.pathname}>
                <Tab value="/search" label="Search" component={Link} to="/search" />
                <Tab value="/downloads" label={<Badge badgeContent={downloads} color="secondary">Downloads</Badge>} component={Link} to="/downloads"> ()</Tab>
            </Tabs>
        </AppBar>
    )
}

export default Menu;
