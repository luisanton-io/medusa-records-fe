import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom';
import { Grid, Typography, TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import { ArrowBack, InfoOutlined, PlayCircleOutlineOutlined as PlayIcon } from '@material-ui/icons';

import uniqid from 'uniqid'

import Player from '../../../components/Player';
import { Controls } from '../../../components/Controls';
import { ReleaseStatusString } from '../../../models/ReleaseStatus';
import { ReleaseData } from '../../../models/Release';
import { API } from '../../../routes/API';

import styles from './index.module.scss'

import AudioComponent from '../../../models/AudioComponent';
import { State } from 'react-flux-component';
import SubmissionsModal from '../../../components/SubmissionsModal';
import { Routes } from '../../../routes/Routes';

interface SubmissionsState extends State {
    status: ReleaseStatusString
    displayModal: boolean,
    selectedRelease?: ReleaseData
}

export default class Submissions extends AudioComponent<RouteComponentProps, SubmissionsState> {

    state: SubmissionsState = {
        ...this.state,
        status: String(this.props.history.location.pathname).split("/").pop()! as ReleaseStatusString,
        displayModal: false
    }

    releases = this.hardBind(AudioComponent.shared.playlist)    
    nowPlaying = this.softBind(AudioComponent.shared.nowPlaying)
    paused = this.softBind(AudioComponent.shared.paused)

    componentDidMount  = () => this.getReleases()
    componentDidUpdate = () => this.getReleases()
    
    getReleases = async () => {
        const response = await API.releases.get(this.state.status)
        const releases = await response.json() as ReleaseData[]

        this.releases.value = releases
        console.log(this.releases.value)
    }

    play = (index: number) => {
        this.nowPlaying.value = index
        this.paused.value = false
    }

    showModal = (release: ReleaseData) => {
        document.querySelector('#root')?.classList.add('blurred')
        this.setState({displayModal: true, selectedRelease: release})
    }
    
    closeModal = () => {
        document.querySelector('#root')?.classList.remove('blurred')
        this.setState({displayModal: false})
    }

    render() {
        const { status } = this.state
        const releases = this.releases.value
        
        return (<>
            <SubmissionsModal release={this.state.selectedRelease} close={this.closeModal} display={this.state.displayModal}/>
            <Grid container className="flex-column no-scrollbar flex-nowrap" style={{
                maxHeight: "100vh",
                width: "100vw"
                }}>
                <Grid item xs={12} className="d-flex position-relative" style={{
                    flexBasis: "unset"
                    }}>
                    <div className="ml-md-5 d-flex w-100 h-100 position-absolute">
                        <div className="mr-auto my-auto ml-3 ml-md-0">
                            <Link to={Routes.private.submissions.selectList}>
                                <ArrowBack className="mr-1" />
                                <span className="d-none d-md-inline">Back</span>
                            </Link>
                        </div>
                    </div>
                    
                    <Typography component="h1" variant="h5" className="my-5 mx-auto" style={{
                        fontWeight: 800,
                        fontFamily: "Circular"
                    }}>
                        {
                            status[0].toUpperCase() + status.slice(1) + " releases."
                        }
                    </Typography>
                </Grid>

                <TableContainer className="bg-transparent px-md-5 mx-auto" style={{flexGrow: 1, overflowX: "hidden"}} >
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{opacity: '0.9'}}></TableCell>
                                <TableCell className="pl-0" style={{opacity: '0.9'}}>Title</TableCell>
                                <TableCell style={{opacity: '0.9'}}>Artists</TableCell>
                                <TableCell>Info</TableCell>
                                <TableCell style={{opacity: '0.9', textAlign: 'center'}}>
                                    {
                                        status === 'accepted' && 'Display on Home'
                                    }
                                </TableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                releases.length > 0 &&
                                releases.map((release, index) => {

                                    const controlProps = {
                                        status,
                                        controlsProps: {
                                            release, 
                                            refresh: this.getReleases
                                        }
                                    }
                                    
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
                                            <InfoOutlined onClick={() => this.showModal(release)}/>
                                        </TableCell>
                                        <TableCell>
                                            <Controls {...controlProps} />
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