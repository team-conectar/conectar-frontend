import React from 'react'
import styled from 'styled-components'
import { toast, ToastContainer, Slide, ToastProps } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type option = 'success' | 'warn' | 'error' | 'info'

const Toast = styled(ToastContainer)`
  .Toastify__toast--info {
    background: var(--gray);
  }
  .Toastify__toast--success {
    background: var(--green);
  }
  .Toastify__toast--warning {
    background: var(--yellow);
  }
  .Toastify__toast--error {
    background: var(--red);
  }
`

export const showToast = (type: option, message: string): void => {
  switch (type) {
    case 'success':
      toast.success(message)
      break
    case 'warn':
      toast.warn(message)
      break
    case 'error':
      toast.error(message)
      break
    default:
      toast.info(message)
  }
}
export default function ToastAnimated() {
  return (
    <Toast
      position="bottom-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      limit={2}
      transition={Slide}
    />
  )
}
