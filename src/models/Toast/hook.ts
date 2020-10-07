import { useState } from 'react'
import { Toast } from './interface'
import ToastComponent from './component'

export function useToast() {   
    const [_toast, _setToast] = useState(ToastComponent.shared.toast.value) 
    return { 
        getToast: () => _toast, 
        setToast: (newToast: Toast) => {
            ToastComponent.shared.toast.value = newToast
            ToastComponent.dispatchToChildren()
            _setToast(newToast)
        }
    }
}