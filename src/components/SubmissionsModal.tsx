import React, { useEffect, useState } from 'react'
import { Modal, Button, Badge, Table } from 'react-bootstrap'
import { ReleaseData } from '../models/Release'
import uniqid from 'uniqid'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { API } from '../routes/API'
import { useToast } from '../models/Toast/hook'
import { genericError } from '../models/Toast/genericError'
import { parseISO } from 'date-fns/esm';
import { GetApp } from '@material-ui/icons';
import { ReleaseStatus } from '../models/ReleaseStatus';
import { TextField } from '@material-ui/core';
 

interface SubmissionsModalProps {
    display: boolean,
    close: () => void,
    release?: ReleaseData
}

export default function SubmissionsModal({ release, display, close }: SubmissionsModalProps) {


    const [date, setDate] = useState(new Date())
    const [fanLink, setFanLink] = useState('')
    const { setToast } = useToast()

    useEffect( () => {
        if (release) {
            setDate(parseISO(String(release.date)))
            setFanLink(release.fanLink || '')
        }
    }, [release])

    if (!release) {return <></>}

    const save = async () => {
        if (date !== release.date || fanLink !== release.fanLink) {
            const response = await API.releases.put(release._id!, {date, fanLink})
            
            response.status !== 204
                ? setToast(genericError)
                : close()
        }
    }

    return <Modal show={display} onHide={close}>
        <Modal.Header closeButton>
            <Modal.Title>{release.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Table variant="dark" size="sm" className="bg-transparent">
                <tbody>
                    <tr>
                        <td colSpan={2} style={{borderTop: '0px'}}>
                            <div className="h-100 w-100 text-center">
                                <a href={release.coverURL} target="_blank" rel="noopener noreferrer" download>
                                    <img className="img-fluid w-50" src={release.coverURL} alt={release.title} />
                                </a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>First Name:</td>
                        <td>{release.firstName}</td>
                    </tr>
                    <tr>
                        <td>Last Name:</td>
                        <td>{release.lastName}</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>{release.email}</td>
                    </tr>
                    <tr>
                        <td>Artists:</td>
                        <td>{
                            release.mainArtists.map(artist => <Badge variant="secondary" className="ml-1" key={uniqid()}>{artist}</Badge>)
                        }{
                            release.featurings.length > 0 &&
                            <> feat. {
                                release.featurings.map(feat => <Badge variant="secondary" className="ml-1" key={uniqid()}>{feat}</Badge>)
                            }
                            </>
                        }</td>
                    </tr>
                    <tr>
                        <td>Date:</td>
                        <td>
                            {
                                release.status === ReleaseStatus.accepted 
                                ? 
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                    disableToolbar
                                    // className={classes.textField}
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    fullWidth
                                    inputVariant="outlined"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Release Date"
                                    value={date}
                                    onChange={(date) => setDate(date as Date)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    />
                                </MuiPickersUtilsProvider>
                                :
                                <span>{('0' + date.getDate()).slice(-2)}/{('0' + date.getMonth()).slice(-2)}/{date.getFullYear()}</span>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Genre:</td>
                        <td>{release.genre}</td>
                    </tr>
                    {
                        release.status === ReleaseStatus.accepted &&
                        <tr>
                            <td colSpan={2}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    name="fanlink"
                                    label="Fanlink"
                                    id="fanlink"
                                    autoComplete="fanlink"
                                    onChange={({currentTarget: textField}) => setFanLink(textField.value!)}
                                    value={fanLink}
                                    />
                            </td>
                        </tr>
                    }
                </tbody>
            </Table>
        </Modal.Body>
        <Modal.Footer>
            <a className="mr-auto" href={release.audioURL} download target="_blank" rel="noopener noreferrer">
                <Button variant="outline-light">
                    <GetApp /> Download
                </Button>
            </a>
            <Button variant="secondary" onClick={close}>
                Close
            </Button>
            <Button variant="primary" onClick={save}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
}