import { Toast } from './interface'
import ToastComponent from './component'

export function useToast(_toast?: Toast) {
    const toast = _toast || ToastComponent.shared.toast.value

    const setToast = (t: Toast) => {
        ToastComponent.shared.toast.value = t
        ToastComponent.dispatchToChildren()
    }

    return { toast, setToast }
}