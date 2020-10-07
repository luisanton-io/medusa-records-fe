import React from 'react'

import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from '@material-ui/core';

import ToastComponent from '../models/Toast/component';

export default class Toaster extends ToastComponent {
    
    toast = this.hardBind(ToastComponent.shared.toast)
    
    closeToast = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason !== "clickaway") {
            this.toast.value = ({ ...this.toast.value, display: false });
        }
    };
    
    render() {
        const { display, severity, message } = this.toast.value
        return (
            <Snackbar open={display}
            autoHideDuration={6000} onClose={this.closeToast}>
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={this.closeToast}
                    severity={severity}
                    >
                    { message }
                </MuiAlert>
            </Snackbar>
        )
    }
}