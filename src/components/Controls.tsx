import React, { Component, useState } from 'react'
import { Button, FormCheck } from 'react-bootstrap'
import { 
    Done as AcceptIcon, 
    Clear as RejectIcon, 
    SettingsBackupRestore as RestoreIcon
} from '@material-ui/icons'
import uniqid from 'uniqid'

import styles from '../pages/private/submissions/index.module.scss';
import { API } from '../routes/API';
import { useToast } from '../models/Toast/hook';
import { ReleaseData } from '../models/Release';

// import { ReleaseStatus, ReleaseStatusString } from '../models/ReleaseStatus';
// import { ReleaseData } from '../models/Release';

interface ControlProps {
    release: ReleaseData
}

const className = styles['release-row-controls']

interface RejectCtrlsProps extends ControlProps {
    restore: (releaseId: string) => void
    rejectNow: (releaseId: string) => void
}

export class RejectCtrls extends Component<RejectCtrlsProps, {}> {
    render() { 
        const { restore, rejectNow, release } = this.props
        return <div className={ className }>
            <Button variant="outline-warning" className="mr-2 rounded-pill" onClick={() => restore(release._id!)}>
                <RestoreIcon className="mr-2" />Restore as pending
            </Button>
            <Button variant="outline-danger" className="rounded-pill" onClick={() => rejectNow(release._id!)}>
                <RejectIcon className="mr-2" />Reject now
            </Button>
        </div> 
    }
}

interface PendingCtrlsProps extends ControlProps {
    accept: (releaseId: string) => void
    reject: (releaseId: string) => void
}

export class PendingCtrls extends Component<PendingCtrlsProps, {}> {
    render () {
        const { accept, reject, release } = this.props
        return <div className={ className }>
            <Button variant="outline-success" className="mr-2 rounded-pill" onClick={() => accept(release._id!)}>
                <AcceptIcon />
            </Button>
            <Button variant="outline-danger" className="rounded-pill" onClick={() => reject(release._id!)}>
                <RejectIcon />
            </Button>
        </div> 
    }
}

export function AcceptedCtrls ({release}: {release: ReleaseData}) {
    
    const [checked, setChecked] = useState(release.displayOnHome!)
    const { setToast } = useToast()

    const displaySwitch = async () => {
        const response = await API.releases.put(
            release._id!, 
            {displayOnHome: !checked}
        )

        if (response.status !== 204) {
            setToast({
                display: true, severity: "error",
                message: "Something went wrong. Try again later."
            })
        } else setChecked(!checked)
    }

    return <div className="d-flex w-100 h-100">
        <FormCheck 
            type="switch"
            id={uniqid()}
            label=""
            className="m-auto"
            onChange={displaySwitch}
            checked={checked}
            />
    </div>
}