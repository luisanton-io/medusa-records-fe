import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { theme } from '../App'
export default function Loader() {
    return <div className="position-absolute d-flex" style={{top: "0", left: "0", height: "100vh", width: "100vw", backgroundColor: `rgba(29,29,29,0.5)`}}>
        <div className="m-auto d-flex flex-column align-items-center" >
            <img className="img-fluid w-50 mb-5" src="/assets/medusa-original.png" alt="..." />
            <CircularProgress style={{ color: theme.palette.primary.dark }} />
        </div>
    </div>
}