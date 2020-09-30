import React from 'react'
import { Button } from 'react-bootstrap'
import { Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import styles from './Selection.module.css'
import { Warning, CheckCircle, Cancel } from '@material-ui/icons';

export default function SelectSubsList() {
    const currentPath = window.location.pathname
    const selectionButton = styles["selection-button"] + " "

    // console.log(styles)
    return <Grid container>
        <img
            alt="..."
            className="image-bg submit-bg"
            style={{ opacity: "0.1" }}
            src="/assets/submit-bg.jpg" 
            />

        <Grid item xs={12} className="d-flex">
        <Typography component="h1" variant="h2" className="m-auto" style={{
            fontWeight: 800,
            fontFamily: "Circular"
        }}>
            Submissions.
        </Typography>
        </Grid>
        <Grid item xs={12} md={4} className="d-flex">
            <Link to={"/submissions/pending"} className="mx-auto mb-auto">
                <Button variant="outline-warning" className={ selectionButton + styles.pending } style={{color: "yellow"}}>
                    <Warning /><br />Pending
                </Button>
            </Link>
        </Grid>
        <Grid item xs={12} md={4} className="d-flex">
            <Link to={"/submissions/accepted"} className="mx-auto mb-auto">
                <Button variant="outline-success" className={ selectionButton + styles.accepted } style={{color: "lightgreen"}}>
                    <CheckCircle /><br />Accepted
                </Button>
            </Link>
        </Grid>
        <Grid item xs={12} md={4} className="d-flex">
            <Link to={"/submissions/rejected"} className="mx-auto mb-auto">
                <Button variant="outline-danger" className={ selectionButton + styles.rejected } style={{color: "rgb(255, 162, 162)"}}>
                    <Cancel /><br />Rejected
                </Button>
            </Link>
        </Grid>
    </Grid>
}
