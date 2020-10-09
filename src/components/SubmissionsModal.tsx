import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { ReleaseData } from '../models/Release'
import { ReleaseStatusString } from '../models/ReleaseStatus'

interface SubmissionsModalProps {
    display: boolean,
    close: () => void,
    release?: ReleaseData
}

export default function SubmissionsModal({release, display, close}: SubmissionsModalProps) {
    if (!release) return <></>

    const { status } = release
    return <Modal show={display} onHide={close}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>Release Data:
            </div>
            <div>
                {/* {JSON.stringify(release)} */}
            </div>
        </Modal.Body>
        <Modal.Footer>
            <a href={release.audioURL} download>Downlaod</a>
            <Button variant="secondary" onClick={close}>
                Close
            </Button>
            <Button variant="primary" onClick={close}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
}