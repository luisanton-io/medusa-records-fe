import React, { Component } from 'react'
import { Button, FormCheck } from 'react-bootstrap'
import { Done as AcceptIcon, Clear as RejectIcon, SettingsBackupRestore as RestoreIcon } from '@material-ui/icons';
import uniqid from 'uniqid'

import styles from '../pages/private/submissions/index.module.scss';

import { ReleaseStatus, ReleaseStatusString } from '../models/ReleaseStatus';

interface ControlProps {
    status: ReleaseStatusString
}

const className = styles['release-row-controls']

export default function Controls (props: {status: ReleaseStatusString}) {

    switch (ReleaseStatus[props.status]) {
        case ReleaseStatus.rejected: return <RejectCtrls />
        case ReleaseStatus.pending:  return <PendingCtrls />
        case ReleaseStatus.accepted: return <AcceptedCtrls />
    }

}

export class RejectCtrls extends Component {

    restore = () => {
        console.log("Restoring release")
    }
    
    rejectNow = () => {
        console.log("Reject now!")
    }
    
    render() {        
        return <div className={ className }>
            <Button variant="outline-warning" className="mr-2 rounded-pill" onClick={this.restore}>
                <RestoreIcon className="mr-2" />Restore as pending
            </Button>
            <Button variant="outline-danger" className="rounded-pill" onClick={this.rejectNow}>
                <RejectIcon className="mr-2" />Reject now
            </Button>
        </div> 
    }
}

export class PendingCtrls extends Component {
    
    accept = () => {
        console.log("accepting release")
    }
    
    reject = () => {
        console.log("rejecting release")
    }

    render () {
        return <div className={ className }>
            <Button variant="outline-success" className="mr-2 rounded-pill" onClick={this.accept}>
                <AcceptIcon />
                {/* <span className={styles["control-name"]}>Accept release</span> */}
            </Button>
            <Button variant="outline-danger" className="rounded-pill" onClick={this.reject}>
                <RejectIcon />
            </Button>
        </div> 
    }
}

export class AcceptedCtrls extends Component {

    displaySwitch = () => {
        console.log("Showing/hiding on home")
    }

    render () {
        return <div className={ className }>
            <FormCheck 
                type="switch"
                id={uniqid()}
                label="Show on Homepage"
                onChange={this.displaySwitch}
                />
        </div> 
    }
}