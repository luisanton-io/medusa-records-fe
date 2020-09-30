import React, { Component } from 'react'
import { AppBar, Toolbar } from '@material-ui/core'

export default class Player extends Component {
    render() {
        return <AppBar 
            // style={{top: 'auto', bottom: '0'}}
            style={{position: "relative"}}
            >
            <Toolbar>
                I am player
            </Toolbar>
        </AppBar>
    }
}