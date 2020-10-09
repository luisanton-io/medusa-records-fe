import React from 'react'
import { Container, Row, Col, Modal, Button, Badge } from 'react-bootstrap'
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
        <Modal.Title>{release.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
                <Row>
                    <Col xs={6}>
                        First Name: {release.firstName}
                    </Col>
                    <Col xs={6}>
                        Last Name: {release.lastName}
                    </Col>
                    <Col xs={6}>
                        Email: {release.email}
                    </Col>
                    <Col xs={6}>
                        Artists: {
                            release.mainArtists.map(artist => <Badge variant="secondary" className="ml-1">{artist}</Badge>)
                        }{
                            release.featurings.length > 0 &&
                            <> feat. {
                                    release.featurings.map(feat => <Badge variant="secondary" className="ml-1">{feat}</Badge>)
                                }
                            </>
                        }
                    </Col>
                </Row>
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <a href={release.audioURL} download>Download</a>
            <Button variant="secondary" onClick={close}>
                Close
            </Button>
            <Button variant="primary" onClick={close}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
}