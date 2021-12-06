import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact>Burger Builder</NavigationItem>
        {props.onAuthorized?<NavigationItem link='/orders'>Orders</NavigationItem>: null}
        {!props.onAuthorized 
        ?<NavigationItem link='/auth'>Authenticate</NavigationItem>
        :<NavigationItem link='/logout'>Logout</NavigationItem>}
    </ul>
);

export default NavigationItems;