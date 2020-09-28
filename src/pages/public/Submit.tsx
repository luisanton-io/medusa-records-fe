//#region Imports
import React, { useState } from 'react'

import { emptyRelease } from '../../models/Release'
import { Genre } from '../../models/Genre';
import { Copyright } from './Login'

import DateFnsUtils from '@date-io/date-fns';
import uniqid from 'uniqid'

import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography
} from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import { Autocomplete } from "@material-ui/lab";
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import MuiAlert, { Color } from "@material-ui/lab/Alert";
import { API } from '../../routes/API';
//#endregion

//#region Styles
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
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
//#endregion

export default function Submit() {
  const classes = useStyles()

  const [release, setRelease] = useState(emptyRelease)
  const [typingArtist, setTypingArtist] = useState("")
  const [typingFeats, setTypingFeats] = useState("")

  const [alert, setAlert] = useState({
    display: false,
    message: "",
    severity: "error" as Color
  })

  const alertInvalid = (invalidEvent: React.SyntheticEvent) => {
    // invalidEvent.preventDefault()
    setAlert({
      display: true,
      message: "Fill in all required fields",
      severity: "error"
    })
  }

  const didSubmit = async (submitEvent: React.FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault()
    console.log("submitting...")
    console.log(release)
    const response = await API.releases.post(release)
    const { message } = await response.json()
    
    setAlert({
      display: true,
      message: message,
      severity: response.status === 201 ? "success" : "error"
    })
  }

  const didSelectGenre = ({target}: React.ChangeEvent<{ value: unknown }>) => {
    setRelease({ ...release, genre: target.value as Genre })
  }

  const didSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filePicker = e.currentTarget
    const file = filePicker.files![0]

    if (!file) return 
    else if (file.size > 7340032) {
      setAlert({
        display: true,
        message: "Max size allowed: 7 MB.",
        severity: "error"
      })
      return 
    } 

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileExt = file.name.split('.').pop()?.toLowerCase()

      if (!fileExt || !['jpg', 'png'].includes(fileExt)) {
        setAlert({
          display: true,
          message: "Unsupported file type!",
          severity: "error"
        })
        return
      } 

      const base64 = event.target!.result as string
      const img = new Image()

      img.onload = function () {
        if (img.naturalHeight !== 3000 || img.naturalWidth !== 3000) {
          setAlert({
            display: true,
            message: "Cover image must be exactly 3000x3000.",
            severity: "error"
          })
          filePicker.value = ''
          return
        } 
        
        setRelease({...release, coverBase64: base64})
      }

      img.src = base64
      
    };
    reader.onerror = (event) => {
      console.error("File could not be read! Code " + event.target!.error!.code);
    };

    reader.readAsDataURL(file);
  
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason !== "clickaway") setAlert({ ...alert, display: false });
  };

  return (
    <Container component="main" maxWidth="sm" className="my-auto">
      <Snackbar open={alert.display} 
      autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={alert.severity}
        >
          {alert.message}
        </MuiAlert>
      </Snackbar>
      <CssBaseline />
      <img
        alt="..."
        className="image-bg submit-bg"
        style={{ opacity: "0.1" }}
        src="/assets/submit-bg.jpg" />
      <div className={classes.paper}>
        <Typography component="h1" variant="h2" className="mt-5" style={{
          fontWeight: 800,
          fontFamily: "Circular"
        }}>
          Submit your track.
        </Typography>
        <span className="ml-auto mb-5">...if it doesn't suck.</span>
        <form className={classes.form} 
          onSubmit={didSubmit} onInvalid={alertInvalid}>
          <Grid container spacing={3} >
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
                onChange={(e) => setRelease({
                  ...release,
                  firstName: e.currentTarget.value
                })}
                value={release.firstName}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6} className="py-0">
              <TextField
                // InputLabelProps={{ required: false }} 
                variant="outlined"
                className={classes.textField}
                margin="normal"
                required
                fullWidth
                name="lastName"
                label="Last Name"
                id="lastName"
                autoComplete="last-name"
                onChange={(e) => setRelease({
                  ...release,
                  lastName: e.currentTarget.value!
                })}
                value={release.lastName}
              />
            </Grid>
            <Grid item xs={12} className="py-0">
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
                onChange={(e) => setRelease({
                  ...release, email: e.currentTarget.value!
                })}
                value={release.email}
              />
            </Grid>
            <Grid item xs={12} className="py-0">
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={release.mainArtists}
                inputValue={typingArtist}
                onChange={(event, newValue) => {
                  setRelease({
                    ...release, 
                    mainArtists: newValue as Array<string>
                  });
                }}
                onInputChange={(event, newInputValue) => {
                  const options = newInputValue.split(",");

                  if (options.length > 1) {
                    const mainArtists = release.mainArtists
                                                .concat(options)
                                                .map(x => x.trim())
                                                .filter(Boolean)
                    setRelease({...release, mainArtists});
                  } else {
                    setTypingArtist(newInputValue);
                  }
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    margin="normal"
                    required
                    label="Main Artists"
                    placeholder="(separated by comma: , )"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} className="py-0">
              <Autocomplete
                  multiple
                  freeSolo
                  options={[]}
                  value={release.featurings}
                  inputValue={typingFeats}
                  onChange={(event, newValue) => {
                    setRelease({
                      ...release, 
                      featurings: newValue as Array<string>
                    });
                  }}
                  onInputChange={(event, newInputValue) => {
                    const options = newInputValue.split(",");

                    if (options.length > 1) {
                      const featurings = release.featurings 
                                                  .concat(options)
                                                  .map(x => x.trim())
                                                  .filter(Boolean)
                      setRelease({...release, featurings});
                    } else {
                      setTypingFeats(newInputValue);
                    }
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      fullWidth
                      className={classes.textField}
                      margin="normal"

                      label="Featurings"
                      placeholder="(separated by comma: , )"
                    />
                  )}
                />
            </Grid>
            <Grid item xs={12} className="py-0">
              <TextField
                variant="outlined"
                className={classes.textField}
                margin="normal"
                required
                fullWidth
                name="title"
                label="Track Name"
                id="title"
                autoComplete="release-title"
                onChange={(e) => setRelease({
                  ...release, title: e.currentTarget.value!
                })}
                value={release.title}
              />
            </Grid>
            <Grid item xs={12} className="py-0">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  className={classes.textField}
                  variant="inline"
                  format="dd/MM/yyyy"
                  fullWidth
                  inputVariant="outlined"
                  margin="normal"
                  id="date-picker-inline"
                  label="Release Date"
                  value={release.date}
                  onChange={(date: MaterialUiPickersDate) =>
                    setRelease({ ...release, date: date! as Date })
                  }
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.textField}
                fullWidth>
                <InputLabel id="select-genre-label">Select a genre:</InputLabel>
                <Select
                  labelId="select-genre-label"
                  id="select-genre"
                  defaultValue={''}
                  onChange={didSelectGenre}
                >
                  {
                    Object.entries(Genre).map( ([key, value]) =>
                      <MenuItem value={value} key={key}>{value}</MenuItem>
                    )
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="select-genre-label">
                Link to the track [Google Drive or Dropbox only, WAV 16 bit]:
              </InputLabel>
              <TextField
                variant="outlined"
                className={classes.textField + " mt-0"}
                margin="normal"
                required
                fullWidth
                name="audioURL"
                label="Audio URL"
                id="audioURL"
                autoComplete="audio-url"
                onChange={(e) => setRelease({
                  ...release,
                  audioURL: e.currentTarget.value!
                })}
                value={release.audioURL}
              />
            </Grid>
            <Grid item xs={12} className="pt-0 d-flex flex-column">
              <InputLabel id="select-file-label">Upload cover image:</InputLabel>
              <input
                accept="jpg, png"
                id="outlined-button-file"
                type="file"
                className="no-dimensions"
                onClick={() => { if (alert.display) setAlert({ ...alert, display: false }) }}
                onChange={didSelectFile}
              />
              <label
                className={classes.textField + " w-100 h-100 d-flex cursor-pointer file-picker"}
                style={{ border: "1px solid grey" }}
                htmlFor="outlined-button-file"
              >
                <span className="m-auto" style={{ fontSize: "1rem" }}>Choose file</span>
              </label>
            </Grid>
            <Grid item xs={12} className="d-flex">
              {
                release.coverBase64 &&
                <img
                  alt="..."
                  src={release.coverBase64}
                  className="w-75 mx-auto"
                />
              }
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}