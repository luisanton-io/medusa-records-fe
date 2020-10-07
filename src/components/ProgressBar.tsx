import React from 'react'


export default function ProgressBar({player}: ProgressBarProps) {
    return <progress 
        id="progress-bar" 
        className="d-none d-md-inline-block" 
        value={ () => player ? player.currentTime / player.duration : 0 }
        max="1"></progress>
}