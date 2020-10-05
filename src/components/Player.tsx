import React, { Component } from 'react'
import '../styles/Player.scss'
import { AppBar, Toolbar } from '@material-ui/core'
import {
    PlayArrowRounded as PlayArrow,
    RepeatRounded as Repeat,
    SkipNextRounded as SkipNext,
    SkipPreviousRounded as SkipPrevious,
    ShuffleRounded as Shuffle, 
    VolumeOffRounded as VolumeOff,
    VolumeMuteRounded as VolumeMute,
    VolumeDownRounded as VolumeDown,
    VolumeUpRounded as VolumeUp
} from '@material-ui/icons'

interface PlayerState {
    shuffling: boolean,
    cycling: boolean,
    muted: boolean,
    paused: boolean,
    volume: number
}

export default class Player extends Component<{}, PlayerState> {

    state: PlayerState ={
        ...this.state,
        shuffling: false,
        cycling: false,
        muted: false,
        paused: true,
        volume: 100
    }

    didToggleShuffle = () => {
        this.setState({shuffling: !this.state.shuffling}, () =>
            console.log(`Now ${this.state.shuffling ? "" : "not"} shuffling.`)
        )
    }

    didToggleCycle = () => {
        this.setState({cycling: !this.state.cycling}, () =>
            console.log(`Now ${this.state.cycling ? "" : "not"} cycling.`)
        )
    }
    
    didToggleMute = () => {
        this.setState({muted: !this.state.muted}, () =>
            console.log(`Now ${this.state.muted ? "" : "un"}muted`)
        )
    }

    tweakVolume = ({currentTarget}: React.FormEvent<HTMLInputElement>) => {
        this.setState({muted: false, volume: parseInt(currentTarget.value)})
        console.log("Volume is: " + currentTarget.value)
    }

    reward = () => {
        console.log("Did press REWARD button.")
    }

    forward = () => {
        console.log("Did press FORWARD button.")
    }

    play = () => {
        console.log("Now playing...")
    }

    pause = () => {
        console.log("Paused.")
    }

    render() {
        const {cycling, muted, paused, shuffling } = this.state
        const volume = muted ? 0 : this.state.volume
        return <AppBar 
            style={{position: "relative"}}
            >
            <Toolbar className="bg-dark text-white px-0" id="player-footer">
                <div id="title-display" className="ml-3 my-1 text-white" style={{width: "auto"}}>
                    <h5 id="track-title">-</h5>
                    <span id="track-artist">-</span>
                </div>
                <div id="player-controls-wrapper" className="d-flex flex-column mx-auto">
                    <div id="player-controls" className="d-flex justify-content-around align-items-center mx-auto">
                        <label className={`form-check-label d-flex align-items-center ${shuffling ? "control-toggled" : ""}`}>
                            <input onChange={this.didToggleShuffle} type="checkbox" className="form-check-input d-none"
                                name="" id="shuffle-toggle" checked={shuffling} />
                            <Shuffle />
                        </label>
                        <SkipPrevious onClick={this.reward} />
                        <PlayArrow onClick={() => paused ? this.play() : this.pause()} />
                        <SkipNext onClick={this.forward} />
                        <label className={`form-check-label d-flex align-items-center ${cycling ? "control-toggled" : ""}`}>
                            <input onChange={this.didToggleCycle} type="checkbox" className="form-check-input d-none"
                                name="" id="cycle-toggle" checked={cycling} />
                            <Repeat />
                        </label>
                    </div>
                    <div className="d-flex justify-content-center align-items-center text-center">
                        <span id="track-current-time"></span>
                        <span id="seek-obj-container">
                            <progress id="progress-bar" className="d-none d-md-inline-block" value="0"
                                max="1"></progress>
                        </span>
                        <small style={{float: "left", position: "relative", left: "15px"}} id="start-time"></small>
                        <small style={{float: "right", position: "relative", right: "20px"}} id="end-time"></small>
                        <span id="track-duration"></span>
                    </div>

                </div>

                <div className="mr-3 position-absolute d-none d-md-flex text-white align-items-center"
                    style={{right: "15px"}}>
                    {
                        muted
                            ? <VolumeOff onClick={this.didToggleMute} />
                            : volume > 50 
                                ? <VolumeUp onClick={this.didToggleMute} />
                                : volume > 10
                                    ? <VolumeDown onClick={this.didToggleMute} />
                                    : <VolumeMute onClick={this.didToggleMute} />
                    }
                    <input 
                        type="range" 
                        id="volume-bar"
                        name="volume" 
                        className="ml-3" 
                        min="0" max="100" 
                        value={volume} 
                        onChange={this.tweakVolume}
                        style={{
                            maxWidth: "90px",
                            background: `linear-gradient(to right, var(--theme-tint) 0%, var(--theme-tint) ${volume}%, #fff ${volume}%, #fff 100%)`
                        }} />
                </div>
            </Toolbar>
        </AppBar>
    }
}