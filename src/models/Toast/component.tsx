import makeComponent from 'react-flux-component'
import { Toast } from './interface'

const shared: {toast: Toast} = {
    toast: {
        display: false,
        severity: "error",
        message: ""
    }
}

export default makeComponent(shared)