import React from 'react'
import AudioComponent from '../models/AudioComponent'
import { State } from 'react-flux-component'


interface ProgressBarProps {
    didSeek: (offsetX: number, width: number) => void
    active: boolean
}

export default class ProgressBar extends AudioComponent<ProgressBarProps, State> {

    currentTime = this.hardBind(AudioComponent.shared.currentTime)
    duration = this.hardBind(AudioComponent.shared.duration)

    seek = (event: React.MouseEvent<HTMLProgressElement, MouseEvent>) => {
        this.props.didSeek(event.nativeEvent.offsetX, event.currentTarget.offsetWidth)
    }

    getTimeString = (time: number) => {
        // if (!time) {console.log(time); return}

        let minutes = Math.floor(time / 60)
        let seconds = Math.round(time - minutes * 60)
        
        return `${minutes}:${seconds >= 10 ? seconds : "0" + seconds}`
    }

    render () {

        const [ active, currentTime, duration ] = [this.props.active, this.currentTime.value, this.duration.value]

        return <>
            <span id="track-current-time">
                { active && this.getTimeString(currentTime) }
            </span>
            <span id="seek-obj-container" className="pb-1">
            <progress 
                id="progress-bar" 
                className="d-none d-md-inline-block" 
                value={ ( active && duration > 0 ) ? currentTime / duration : 0 }
                onClick={this.seek}
                max="1"></progress>
            </span>
            <small style={{float: "left", position: "relative", left: "15px"}} id="start-time"></small>
            <small style={{float: "right", position: "relative", right: "20px"}} id="end-time"></small>
            <span id="track-duration">
                { active && this.getTimeString(duration) }
            </span>
        </>
    }
}