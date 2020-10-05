import { Color } from "@material-ui/lab/Alert";

export interface Toast {
    display: boolean,
    severity: Color,
    message: string
}