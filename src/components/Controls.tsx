import React, { useState } from 'react'
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
import { genericError } from '../models/Toast/genericError';
import { ReleaseStatus, ReleaseStatusString } from '../models/ReleaseStatus';

interface ControlsProps {
    release: ReleaseData,
    refresh: () => void
}

const className = styles['release-row-controls']

export function Controls({status, controlsProps}: {status: ReleaseStatusString, controlsProps: ControlsProps}) {
    switch (status) {
        case 'rejected': return <RejectCtrls   {...controlsProps} />
        case 'pending':  return <PendingCtrls  {...controlsProps} />
        case 'accepted': return <AcceptedCtrls {...controlsProps} />
    }
}

function RejectCtrls ({release, refresh}: ControlsProps) {
    const { setToast } = useToast()
    const deleteRelease = async (id: string) => {
        const response = await API.releases.delete(id)
    
        if (response.status === 202) {
            alert("Release removed.")
            refresh()
        } else setToast(genericError)
    }

    const restoreAsPending = async (id: string) => {
        const response = await API.releases.put(id, { status: ReleaseStatus.pending })

        if (response.status === 204) {
            alert("Release back to pending.")
            refresh()
        }
    }

    return <div className={ className }>
        <Button variant="outline-warning" className="mr-2 rounded-pill px-2" onClick={() => restoreAsPending(release._id!)}>
            <RestoreIcon className="mr-md-2" /><span className="d-none d-md-inline">Restore as pending</span>
        </Button>
        <Button variant="outline-danger" className="rounded-pill px-2" onClick={() => deleteRelease(release._id!)}>
            <RejectIcon className="mr-md-2" /><span className="d-none d-md-inline">Reject now</span>
        </Button>
    </div> 
}


function PendingCtrls ({release, refresh}: ControlsProps) {
    const { setToast } = useToast()

    const acceptRelease = async (id: string) => {
        // const response = await API.releases.put(id, { status: ReleaseStatus.accepted })
        const response = await API.releases.accept(id)

        if (response.status === 204) {
            alert("Release accepted")
            refresh()
        } else setToast(genericError)
    }
    
    const rejectRelease = async (id: string) => {
        const response = await API.releases.put(id, { status: ReleaseStatus.rejected })
        
        if (response.status === 204) {
            alert("Release rejected.")
            refresh()
        } else setToast(genericError)
    }

    return <div className={ className }>
        <Button variant="outline-success" className="mr-2 rounded-pill" onClick={() => acceptRelease(release._id!)}>
            <AcceptIcon />
        </Button>
        <Button variant="outline-danger" className="rounded-pill" onClick={() => rejectRelease(release._id!)}>
            <RejectIcon />
        </Button>
    </div> 
}


function AcceptedCtrls ({release}: ControlsProps) {
    
    const [checked, setChecked] = useState(release.displayOnHome!)
    const { setToast } = useToast()

    const displaySwitch = async () => {
        const response = await API.releases.put(
            release._id!, 
            {displayOnHome: !checked}
        )

        response.status === 204
            ? setChecked(!checked)
            : setToast(genericError)
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