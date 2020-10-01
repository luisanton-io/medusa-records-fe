import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Grid, Typography, TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import { PlayCircleOutlineOutlined as PlayIcon } from '@material-ui/icons';
import uniqid from 'uniqid'
import styles from './index.module.scss'
import Player from '../../../components/Player';
import Controls from '../../../components/Controls';
import { ReleaseStatusString } from '../../../models/ReleaseStatus';

export default class Submissions extends React.Component<RouteComponentProps, {}> {
    render() {
        const status = String(this.props.history.location.pathname).split("/").pop()!

        let list = []
        for (let i = 0; i <= 43; i++) {
            list.push({
                title: i + " Test release",
                mainArtists: ["Lou Wyss"],
                status
            })
        }
        return (
            <Grid container className="flex-column no-scrollbar flex-nowrap" style={{
                maxHeight: "100vh",
                width: "100vw"
            }}>
                <Grid item xs={10} className="d-flex mx-auto">
                    <Typography component="h1" variant="h5" className="my-5" style={{
                        fontWeight: 800,
                        fontFamily: "Circular"
                    }}>
                        {status[0].toUpperCase() + status.slice(1) + " releases"}.
                    </Typography>
                </Grid>

                <TableContainer className="bg-transparent px-md-5 mx-auto" >
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2}>Title</TableCell>
                                <TableCell colSpan={2}>Artists</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                list.map(el => (
                                    <TableRow className={styles["playlist-row"]} key={uniqid()}>
                                        <TableCell style={{ width: "15px" }}>
                                            <PlayIcon className={styles["play-icon"]} onClick={ () => {console.log("playing...")}}/>
                                        </TableCell>
                                        <TableCell>
                                            {el.title}
                                        </TableCell>
                                        <TableCell>
                                            {el.mainArtists[0]}
                                        </TableCell>
                                        <TableCell>
                                            <Controls status={status as ReleaseStatusString} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Player />
            </Grid>)
    }
}