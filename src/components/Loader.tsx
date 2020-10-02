import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { theme } from '../App'
export default function Loader() {
    return <div className="position-absolute bg-dark d-flex" style={{top: "0", left: "0", height: "100vh", width: "100vw"}}>
        <div className="m-auto d-flex flex-column align-items-center" >
            <img className="img-fluid w-50 mb-5" src="/assets/medusa-original.png" />
            <CircularProgress style={{ color: theme.palette.primary.dark }} />
        </div>
    </div>
}