import { Box, Button, Container, CssBaseline, makeStyles, TextField, Typography, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import { emptyRelease } from '../../models/Release'
import { Copyright } from './Login'

const useStyles = makeStyles((theme) => ({
    paper: {
      // marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      borderRadius: 0,
    },
    textField: {
      [`& fieldset`]: {
        borderRadius: 0,
      },
    }
  }))

function didSubmit (submitEvent: React.FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault()
    console.log("submitting...")
}

export default function Submit() {
    const classes = useStyles()
    const [release, setRelease] = useState(emptyRelease)
    return (<Container component="main" maxWidth="md" className="my-auto">
    {/* <img 
        className="login-bg" 
        alt="login wallpaper"
        src="/assets/login-bg.jpg" 
        style={{top: "0", left: "0", opacity: "0.5" }} /> */}
    <CssBaseline />
    <div className={classes.paper}>
        {/* <img className="img-fluid" alt="..." src="/assets/medusa-original.png" style={{width: "50%", overflow: "hidden"}} /> */}
        <Typography component="h1" variant="h2" >
        Submit your track 
        </Typography>
        <span className="ml-auto">...if it doesn't suck.</span>
        <form className={classes.form} noValidate onSubmit={ didSubmit }>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} className="py-0">
                <TextField
                    variant="outlined"
                    className={classes.textField}
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="first-name"
                    onChange={ (e) => setRelease({
                        ...release,
                        firstName: e.currentTarget.value
                    })}
                    value={release.firstName}
                    autoFocus
                    />
            </Grid>
            <Grid item xs={12} sm={6} className="py-0">
                <TextField
                    InputLabelProps={{ required: false }} 
                    variant="outlined"
                    className={classes.textField}
                    margin="normal"
                    required
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    id="lastName"
                    autoComplete="last-name"
                    onChange={ (e) => setRelease({
                        ...release,
                        lastName: e.currentTarget.value!
                        })}
                        value={release.lastName}
                        />
            </Grid>
            <Grid item xs={12} sm={6} className="py-0">
                <TextField
                    variant="outlined"
                    className={classes.textField}
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="E-mail"
                    id="email"
                    autoComplete="email"
                    onChange={ (e) => setRelease({
                        ...release,
                        email: e.currentTarget.value!
                        })}
                        value={release.email}
                        />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
            </Grid> */}
            
        </Grid>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
        >
            Submit
        </Button>
        </form>
    </div>
    <Box mt={8}>
        <Copyright />
    </Box>
    </Container>)
}