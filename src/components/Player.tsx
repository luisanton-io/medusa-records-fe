import React from 'react'
import '../styles/Player.scss'
import { AppBar, Toolbar } from '@material-ui/core'
import {
    PlayArrowSharp as PlayArrow,
    RepeatSharp as Repeat,
    SkipNextSharp as SkipNext,
    SkipPreviousSharp as SkipPrevious,
    ShuffleSharp as Shuffle, 
    VolumeOffSharp as VolumeOff,
    VolumeMuteSharp as VolumeMute,
    VolumeDownSharp as VolumeDown,
    VolumeUpSharp as VolumeUp,
    PauseSharp as Pause
} from '@material-ui/icons'



import AudioComponent from '../models/AudioComponent'
import { State } from 'react-flux-component'
import ProgressBar from './ProgressBar'
import { ReleaseStatusString } from '../models/ReleaseStatus'

interface PlayerState extends State {
    shuffling: boolean,
    cycling: boolean,
    muted: boolean,
    volume: number
}

interface PlayerProps {status: ReleaseStatusString}

export default class Player extends AudioComponent<PlayerProps, PlayerState> {

    constructor(props: PlayerProps) {
        super(props)
        this.audioPlayer = React.createRef()
    }

    private audioPlayer: React.RefObject<HTMLAudioElement>;

    state: PlayerState ={
        ...this.state,
        shuffling: false,
        cycling: false,
        muted: false,
        volume: 100
    }

    nowPlaying = this.hardBind(AudioComponent.shared.nowPlaying)
    playlist = this.hardBind(AudioComponent.shared.playlist)
    paused = this.hardBind(AudioComponent.shared.paused)

    currentTime = this.softBind(AudioComponent.shared.currentTime)
    duration = this.softBind(AudioComponent.shared.duration)

    componentDidUpdate = () => {
        const player = this.audioPlayer.current!
        this.paused.value 
            ? player.pause() 
            : player.play()
    } 
    
    didToggleShuffle = () => this.setState({shuffling: !this.state.shuffling})
    didToggleCycle = () => this.setState({cycling: !this.state.cycling})
    didToggleMute = () => {
        this.setState({
            muted: !this.state.muted
        }, () => {
            this.audioPlayer.current!.volume = this.state.muted ? 0 : this.state.volume/100
        })
    } 
    
    didSeek = (offsetX: number, width: number) => {
        if (this.nowPlaying.value === null) return

        const player = this.audioPlayer.current
        if (player) {
            console.table({offsetX, width})
            player.currentTime = offsetX / width * player.duration
            this.currentTime.value = player.currentTime
        } 
    }

    tweakVolume = ({currentTarget}: React.FormEvent<HTMLInputElement>) => {
        this.setState({muted: false, volume: parseInt(currentTarget.value)}, () => 
            this.audioPlayer.current!.volume = this.state.volume / 100
        )
        console.log("Volume is: " + currentTarget.value)
    }
    
    reward = () => {
        if (this.nowPlaying.value !== null) {
            if (this.currentTime.value > 2) {
                this.audioPlayer.current!.currentTime = 0
            } else if (this.state.shuffling) {
                this.nowPlaying.value = this.getRandomIx()
            } else if (this.nowPlaying.value === 0) {
                this.nowPlaying.value = this.state.cycling ? this.playlist.value.length - 1 : null
            }
        }
    }

    
    forward = () => {
        if (this.nowPlaying.value !== null) {
            if (this.state.shuffling) {
                this.nowPlaying.value = this.getRandomIx()
            } else if (this.nowPlaying.value === this.playlist.value.length - 1) {
                this.nowPlaying.value = this.state.cycling ? 0 : null
            } else this.nowPlaying.value++
        }
    }
    
    getRandomIx = () => {
        return Math.floor(Math.random() * Math.floor(this.playlist.value.length))
    }

    render() {
        const { cycling, muted, shuffling } = this.state
        const volume = muted ? 0 : this.state.volume
        const paused = this.paused.value
        const onAir = this.nowPlaying.value !== null ? this.playlist.value[this.nowPlaying.value] : null

        const tint = this.props.status === 'accepted' 
                        ? 'var(--success)'
                        : this.props.status === 'rejected'
                            ? 'var(--danger)'
                            : 'var(--theme-tint)'

                            return <AppBar 
            style={{position: "relative"}}
            className="bg-transparent"
            >
            <Toolbar className="bg-transparent text-white px-0 neon-glow" id={`player-footer-${this.props.status}`}>
                <audio src={onAir?.audioURL} ref={this.audioPlayer} 
                    onTimeUpdate={({currentTarget: player}) => this.currentTime.value = player.currentTime} 
                    onLoadedData={({currentTarget: player}) => this.duration.value = player.duration} 
                    onEnded={this.forward}
                />  
                {
                    onAir ?
                    <div id="title-display" className="ml-3 my-1 text-white" style={{width: "auto"}}>
                        <h5 id="track-title">{onAir.title}</h5>
                        <span id="track-artist"> 
                            {
                                `${onAir.mainArtists.join(', ')}${
                                    onAir.featurings.length > 0 
                                        ? ` feat. ${onAir.featurings.join(', ')}` 
                                        : '' 
                                }` 
                            }
                        </span>
                    </div>
                    : <div id="m-title-space"></div>
                }
                <div id="player-controls-wrapper" className="d-flex flex-column mx-auto pt-1">
                    <div id="player-controls" className="d-flex justify-content-around align-items-center mx-auto">
                        <label className={`form-check-label d-flex align-items-center ${shuffling ? "control-toggled" : ""}`}>
                            <input onChange={this.didToggleShuffle} type="checkbox" className="form-check-input d-none"
                                name="" id="shuffle-toggle" checked={shuffling} />
                            <Shuffle />
                        </label>
                        <SkipPrevious onClick={this.reward} />
                        {
                            paused  ? <PlayArrow onClick={ () => this.paused.value = false } />
                                    : <Pause     onClick={ () => this.paused.value = true  } />
                        }
                        <SkipNext onClick={this.forward} />
                        <label className={`form-check-label d-flex align-items-center ${cycling ? "control-toggled" : ""}`}>
                            <input onChange={this.didToggleCycle} type="checkbox" className="form-check-input d-none"
                                name="" id="cycle-toggle" checked={cycling} />
                            <Repeat />
                        </label>
                    </div>
                    <div className="d-flex justify-content-center align-items-center text-center">
                        <ProgressBar didSeek={this.didSeek} active={this.nowPlaying.value !== null}/>
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
                            background: `linear-gradient(to right, ${tint} 0%, ${tint} ${volume}%, #fff ${volume}%, #fff 100%)`
                        }} />
                </div>
            </Toolbar>
        </AppBar>
    }
}