import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

export const showSuccessToast = (message: string) => {
  toast.success(message)
}

const ToastNotifier: React.FC = () => {
  return <Toaster />
}

export default ToastNotifier


// Чтобы его использовать в других местах:

// import { showSuccessToast } from './ToastNotifier'

// // Где-то в другом месте
// showSuccessToast('This is a success toast!')