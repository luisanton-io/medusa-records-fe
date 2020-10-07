import makeComponent from 'react-flux-component'
import { ReleaseData } from './Release'

interface SharedAudio {
    nowPlaying: number | null
    playlist: ReleaseData[]
}

const shared: SharedAudio = {
    nowPlaying: null,
    playlist: []
}

export default makeComponent(shared)