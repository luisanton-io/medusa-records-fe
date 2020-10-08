import React, { Component } from 'react'
import { Button, FormCheck } from 'react-bootstrap'
import { 
    Done as AcceptIcon, 
    Clear as RejectIcon, 
    SettingsBackupRestore as RestoreIcon, 
    InfoOutlined
} from '@material-ui/icons'
import uniqid from 'uniqid'

import styles from '../pages/private/submissions/index.module.scss';

// import { ReleaseStatus, ReleaseStatusString } from '../models/ReleaseStatus';
// import { ReleaseData } from '../models/Release';

interface ControlProps {
    releaseId: string
}

const className = styles['release-row-controls']

interface RejectCtrlsProps extends ControlProps {
    openModal: () => void
    restore: (releaseId: string) => void
    rejectNow: (releaseId: string) => void
}

export class RejectCtrls extends Component<RejectCtrlsProps, {}> {
    render() { 
        const { restore, rejectNow, releaseId } = this.props
        return <div className={ className }>
            <Button variant="outline-warning" className="mr-2 rounded-pill" onClick={() => restore(releaseId)}>
                <RestoreIcon className="mr-2" />Restore as pending
            </Button>
            <Button variant="outline-danger" className="rounded-pill" onClick={() => rejectNow(releaseId)}>
                <RejectIcon className="mr-2" />Reject now
            </Button>
        </div> 
    }
}

interface PendingCtrlsProps extends ControlProps {
    openModal: () => void
    accept: (releaseId: string) => void
    reject: (releaseId: string) => void
}

export class PendingCtrls extends Component<PendingCtrlsProps, {}> {

    render () {
        let { accept, reject, releaseId } = this.props
        return <div className={ className }>
            <Button variant="outline-success" className="mr-2 rounded-pill" onClick={() => accept(releaseId)}>
                <AcceptIcon />
            </Button>
            <Button variant="outline-danger" className="rounded-pill" onClick={() => reject(releaseId)}>
                <RejectIcon />
            </Button>
        </div> 
    }
}
interface AcceptedCtrlsProps extends ControlProps {
    openModal: () => void
}

export class AcceptedCtrls extends Component<AcceptedCtrlsProps, {}> {

    displaySwitch = () => {
        console.log("Showing/hiding on home")
    }

    render () {
        return <div className={ className }>
            <Button variant="outline-dark" className="bg-transparent text-white border-0 rounded-0" onClick={this.props.openModal}><InfoOutlined /></Button>
            <FormCheck 
                type="switch"
                id={uniqid()}
                label="Show on Homepage"
                onChange={this.displaySwitch}
                />
        </div> 
    }
}