import makeComponent from 'react-flux-component'
import { ReleaseData } from './Release'

interface SharedAudio {
    nowPlaying: number | null
    playlist: ReleaseData[],
    paused: boolean,
    currentTime: number,
    duration: number
}

const shared: SharedAudio = {
    nowPlaying: null,
    playlist: [],
    paused: true,
    currentTime: 0,
    duration: 0
}

export default makeComponent(shared)