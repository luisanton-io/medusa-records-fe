import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import WarningIcon from '@material-ui/icons/Warning';
import { API } from '../../routes/API';
import { useHistory, withRouter } from 'react-router-dom';
import { Routes } from '../../routes/Routes';

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" className="mb-5">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Medusa Records
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

export default withRouter(function Login() {
  const classes = useStyles();
  const history = useHistory()
  const [credentials, setCredentials] = useState({username: "", password: ""})
  const checkAuth = async () => {
    const response = await API.checkAuth()
    if (response.status === 204) history.push(Routes.private.submissions.selectList)
  }
  useEffect(() => {checkAuth()})

  const didSubmit = async (submitEvent: React.FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault()
    let response = await API.login(credentials)

    if (response.status === 200) history.push(Routes.private.submissions.selectList)
  }

  return (
    <Container component="main" maxWidth="xs" className="my-auto">
      <img 
        className="image-bg" 
        alt="login wallpaper"
        src="/assets/login-bg.jpg" 
        style={{top: "0", left: "0", opacity: "0.5" }} />
      <CssBaseline />
      <div className={classes.paper}>
        <img className="img-fluid" alt="..." src="/assets/medusa-original.png" style={{width: "50%", overflow: "hidden"}} />
        <Typography component="h1" variant="h5">
          <WarningIcon /> Staff only <WarningIcon />
        </Typography>
        <span>Keep out.</span>
        <form className={classes.form} noValidate onSubmit={ (submitEvent) => credentials.username.length > 0 && credentials.password.length > 0 && didSubmit(submitEvent) }>
          <TextField
            InputLabelProps={{ required: false }} 
            variant="outlined"
            className={classes.textField}
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            onChange={ (e) => setCredentials({
              username: e.currentTarget.value!,
              password: credentials.password
            })}
            value={credentials.username}
            autoFocus
            />
          <TextField
            InputLabelProps={{ required: false }} 
            variant="outlined"
            className={classes.textField}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={ (e) => setCredentials({
              username: credentials.username,
              password: e.currentTarget.value!
            })}
            value={credentials.password}
            />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
})