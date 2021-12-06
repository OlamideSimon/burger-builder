import React from 'react';

import burgerlogo from '../../assets/burger-logo.png.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerlogo} alt=''/>
    </div>
);

export default logo;