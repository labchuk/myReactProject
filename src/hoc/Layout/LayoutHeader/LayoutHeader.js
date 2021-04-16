import React from 'react'
import classes from './LayoutHeader.module.css'

const LayoutHeader = props => {
    return (
        <div className={classes.layout_header}>
            <h1> {props.title}</h1>
        </div>
    )
}

export default LayoutHeader