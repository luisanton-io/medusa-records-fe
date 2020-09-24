import { Box, Button, Container, CssBaseline, makeStyles, TextField, Typography, Grid, FormControl } from '@material-ui/core'
import React, { useState } from 'react'
import { emptyRelease } from '../../models/Release'
import { Copyright } from './Login'
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker } from '@material-ui/pickers/DatePicker/DatePicker';
import MuiPickersUtilsProvider from '@material-ui/pickers/MuiPickersUtilsProvider';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { Genre } from '../../models/Genre';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import uniqid from 'uniqid'

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

export default function Submit() {
  const classes = useStyles()
  const [release, setRelease] = useState(emptyRelease)
  const [imageB64, setImageB64]
  : [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>] 
  = useState()

  const didSubmit = (submitEvent: React.FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault()
    console.log("submitting...")
    console.log(release)
  }

  const didSelectGenre = (selectEvent: React.ChangeEvent<{ value: unknown }>) => {
    console.log(selectEvent.target.value)
    setRelease({ ...release, genre: selectEvent.target.value as Genre })
  }


  const didSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const name = event.currentTarget.name
    const file = event.currentTarget.files![0]

    

    const reader = new FileReader();
        reader.onload = (event) => {
            const fileExt = file.name.split('.').pop()?.toLowerCase()
            if (fileExt && ['jpg', 'png'].includes(fileExt)) {
                const base64 = event.target!.result as string
                setImageB64( base64 )
            } else alert("Unsupported file type!")    
        };
        reader.onerror = (event) => {
            console.error("File could not be read! Code " + event.target!.error!.code);
        };
        reader.readAsDataURL(file);

  }

  return (<Container component="main" maxWidth="sm" className="my-auto">
    <CssBaseline />
    <img alt="..." className="image-bg submit-bg" style={{opacity: "0.1"}} src="/assets/submit-bg.jpg" />
    <div className={classes.paper}>
      <Typography component="h1" variant="h2" className="mt-5" style={
        {
          fontWeight: 800,
          fontFamily: "Circular"
          // fontWeight: 800,
          // fontFamily: "Circular"
      
        }}>
        Submit your track.
        </Typography>
      <span className="ml-auto mb-5">...if it doesn't suck.</span>
      <form className={classes.form} noValidate onSubmit={didSubmit}>
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
                ...release,
                email: e.currentTarget.value!
              })}
              value={release.email}
            />
          </Grid>
          <Grid item xs={12} className="py-0">
            <TextField
              variant="outlined"
              className={classes.textField}
              margin="normal"
              required
              fullWidth
              name="mainArtists"
              label="Main Artists (separated by comma)"
              id="mainArtists"
              autoComplete="main-artist"
              onChange={(e) => setRelease({
                ...release,
                mainArtists: e.currentTarget.value!
              })}
              value={release.mainArtists}
            />
          </Grid>
          <Grid item xs={12} className="py-0">
            <TextField
              variant="outlined"
              className={classes.textField}
              margin="normal"
              fullWidth
              name="featurings"
              label="Featurings"
              id="featurings"
              autoComplete="featurings"
              onChange={(e) => setRelease({
                ...release,
                featurings: e.currentTarget.value!
              })}
              value={release.featurings}
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
                ...release,
                title: e.currentTarget.value!
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
                onChange={(date: MaterialUiPickersDate) => setRelease({ ...release, date: date! as Date })}
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
                value={release.genre}
                onChange={didSelectGenre}
              >
                {
                  Object.entries(Genre).map(([key, value]) => {
                    return <MenuItem value={key} key={uniqid()}>{value}</MenuItem>
                  }
                  )
                }
              </Select>
            </FormControl>

          </Grid>
          <Grid item xs={12}>
          <InputLabel id="select-genre-label" >Link to the track [Google Drive or Dropbox only, WAV 16 bit]:</InputLabel>
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
            {/* <TextField
                variant="outlined"
                className={classes.textField}
                margin="normal"
                required  
                fullWidth
                type="file"
                name="cover"
                label="Choose cover image"
                id="coverImage"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={ (e) => setRelease({
                    ...release,
                    coverURL: e.currentTarget.value!
                    })}
                    value={release.coverURL}
                    /> */}

              <InputLabel id="select-file-label">Upload cover image:</InputLabel>
              <input
                accept="jpg, png"
                id="outlined-button-file"
                type="file"
                style={{ display: "none" }}
                onChange={ didSelectFile }
              />
              <label
                className={classes.textField + " w-100 h-100 d-flex cursor-pointer file-picker"}
                style={{ border: "1px solid grey" }}
                htmlFor="outlined-button-file"
              >
                <span className="m-auto" style={{ opacity: "0.7", fontSize: "1rem" }}>Choose file</span>
              </label>


          </Grid>
          <Grid item xs={12} className="d-flex">
            {
              imageB64 && 
              <img alt="..." src={imageB64} className="w-75 mx-auto" onLoad={({target:img}) => console.log((img as HTMLElement).offsetWidth + " " + (img as HTMLElement).offsetHeight)}/>
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
          {/* <Grid item xs={12} sm={6}>
            </Grid> */}

        </Grid>

      </form>
    </div>
    <Box mt={8}>
      <Copyright />
    </Box>
  </Container>)
}