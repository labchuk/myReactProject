import React from 'react'
import classes from './LogoText.module.css'
import {NavLink} from "react-router-dom";

const LogoText = (props) => {
    return (
        <div className={classes.logo_container}>
            <NavLink to="/">
                <span style={props}>My Easy Quiz</span>
            </NavLink>
        </div>
    )
}

export default LogoText