import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Grid, Typography, TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import { Button } from 'react-bootstrap'
import { PlayCircleOutlineOutlined as PlayIcon } from '@material-ui/icons';
import { Modal } from 'react-bootstrap'

import uniqid from 'uniqid'

import Player from '../../../components/Player';
import { AcceptedCtrls, PendingCtrls, RejectCtrls } from '../../../components/Controls';
import { ReleaseStatus, ReleaseStatusString } from '../../../models/ReleaseStatus';
import { ReleaseData } from '../../../models/Release';
import { API } from '../../../routes/API';

import styles from './index.module.scss'

import AudioComponent from '../../../models/AudioComponent';
import { State } from 'react-flux-component';
// import styles from '../styles/Submissions.module.scss'

interface SubmissionsState extends State {
    status: ReleaseStatusString
    displayModal: boolean
}

export default class Submissions extends AudioComponent<RouteComponentProps, SubmissionsState> {

    state: SubmissionsState = {
        ...this.state,
        status: String(this.props.history.location.pathname).split("/").pop()! as ReleaseStatusString,
        displayModal: false
    }

    releases = this.hardBind(AudioComponent.shared.playlist)    
    nowPlaying = this.softBind(AudioComponent.shared.nowPlaying)

    play = (index: number) => {
        this.nowPlaying.value = index
        const track = this.releases.value[index]
        console.log("playing " + index + track.title + " at " + track.audioURL)
    }

    componentDidMount = () => {
        this.getReleases()
    }

    getReleases = async () => {
        const response = await API.releases.get(this.state.status)
        const releases = await response.json() as ReleaseData[]

        this.releases.value = [...releases, ...releases, ...releases, ...releases]
        console.log(this.releases.value)
        // this.setState({releases})

    }

    showModal = () => {
        this.setState({displayModal: true})
    }

    closeModal = () => {
        this.setState({displayModal: false})
    }

    //
    acceptRelease = async (id: string) => {
        const response = await API.releases.put(id, { status: ReleaseStatus.accepted })

        if (response.status === 204) {
            alert("Release accepted")
            this.getReleases()
        }
    }
    
    rejectRelease = async (id: string) => {
        const response = await API.releases.put(id, { status: ReleaseStatus.rejected })
        
        if (response.status === 204) {
            alert("Release rejected.")
            this.getReleases()
        }
    }

    deleteRelease = async (id: string) => {
        const response = await API.releases.delete(id)
    
        if (response.status === 202) {
            alert("Release removed.")
            this.getReleases()
        }
    }

    restoreAsPending = async (id: string) => {
        const response = await API.releases.put(id, { status: ReleaseStatus.pending })

        if (response.status === 204) {
            alert("Release back to pending.")
            this.getReleases()
        }
    }
    //

    render() {
        const { status } = this.state
        console.log(status)
        const releases = this.releases.value

        const self = this
        
        return (<>
            <Modal show={this.state.displayModal} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.closeModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Grid container className="flex-column no-scrollbar flex-nowrap" style={{
                maxHeight: "100vh",
                width: "100vw"
                }}>
                <Grid item xs={10} className="d-flex mx-auto" style={{
                    flexBasis: "unset"
                    }}>
                    <Typography component="h1" variant="h5" className="my-5" style={{
                        fontWeight: 800,
                        fontFamily: "Circular"
                        }}>
                        {
                            status[0].toUpperCase() + status.slice(1) + " releases."
                        }
                    </Typography>
                </Grid>

                <TableContainer className="bg-transparent px-md-5 mx-auto" style={{flexGrow: 1}} >
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{opacity: '0.9'}} colSpan={2}>Title</TableCell>
                                <TableCell style={{opacity: '0.9'}} colSpan={2}>Artists</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                releases.length > 0 &&
                                releases.map((release, index) => {
                                    const controls = (function () {
                                        switch (ReleaseStatus[status]) {
                                            case ReleaseStatus.rejected: 
                                                return <RejectCtrls
                                                    releaseId={release._id!} 
                                                    openModal={self.showModal}
                                                    rejectNow={self.deleteRelease}
                                                    restore={self.restoreAsPending}
                                                    />
                                            case ReleaseStatus.pending:  
                                                return <PendingCtrls
                                                    releaseId={release._id!}
                                                    accept={self.acceptRelease}
                                                    reject={self.rejectRelease}
                                                    openModal={self.showModal}
                                                    />
                                            case ReleaseStatus.accepted: 
                                                return <AcceptedCtrls 
                                                    releaseId={release._id!} 
                                                    />
                                        }
                                    })()

                                    return (
                                    <TableRow className={styles["playlist-row"]} key={uniqid()}>
                                        <TableCell style={{ width: "15px" }}>
                                            <PlayIcon 
                                                className={styles["play-icon"]} 
                                                onClick={() => this.play(index)} 
                                                />
                                        </TableCell>
                                        <TableCell>
                                            { release.title }
                                        </TableCell>
                                        <TableCell>
                                            { release.mainArtists.join(', ') }
                                        </TableCell>
                                        <TableCell>
                                            { controls }
                                        </TableCell>
                                    </TableRow>)
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Player status={status}/>
            </Grid>
        </>)
    }
}