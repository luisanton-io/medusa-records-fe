import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Grid, Typography, TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import { PlayCircleOutlineOutlined as PlayIcon } from '@material-ui/icons';
import uniqid from 'uniqid'
import styles from './index.module.scss'
import Player from '../../../components/Player';

export default class Submissions extends React.Component<RouteComponentProps, {}> {
    render() {
        const listName = String(this.props.history.location.pathname).split("/").pop()!

        let list = []
        for (let i=0; i<=43; i++) {
            list.push({
                title: i +" Test release",
                mainArtists: ["Lou Wyss"],
                status: "pending"
            })
        }
        // return <div>I am Submissions: { listName }</div>
        return <>
            {/* <div className="d-flex flex-column no-scrollbar" style={{maxHeight: "100vh", width: "100vw"}}>  */}

            <Grid container className="flex-column no-scrollbar flex-nowrap" style={{
                // overflowY: "scroll",
                maxHeight: "100vh", width: "100vw"
                }}>
                <Grid item xs={10} className="d-flex mx-auto">
                    <Typography component="h1" variant="h5" className="my-5" style={{
                        fontWeight: 800,
                        fontFamily: "Circular"
                    }}>
                        { listName[0].toUpperCase() + listName.slice(1) + " releases" }.
                    </Typography>
                </Grid>
                
                <Grid item xs={12} className="w-100" style={{
                    overflowY: "scroll"
                    }}>
                    <Grid item xs={10} className="mx-auto">
                    
                    <TableContainer className="bg-transparent" >
                        <Table stickyHeader>
                        <TableHead 
                            // className="position-absolute w-100"
                            >
                            <TableRow>
                                <TableCell colSpan={2}>Title</TableCell>
                                <TableCell>Artists</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                list.map( (el) => <TableRow className={styles["playlist-row"]} key={uniqid()}>
                                        <TableCell style={{width: "15px"}}>
                                            <PlayIcon className={styles["play-icon"]} />
                                        </TableCell>
                                        <TableCell>
                                            { el.title }
                                        </TableCell>
                                        <TableCell>
                                            { el.mainArtists[0] }
                                        </TableCell>
                                        <TableCell>
                                            { el.status }
                                        </TableCell>
                                    </TableRow>
                                )  
                            }
                        </TableBody>
                        </Table>
                    </TableContainer>
                    </Grid>
                </Grid>
                <Player />
            </Grid>
        {/* </div> */}
        </>
    }
}