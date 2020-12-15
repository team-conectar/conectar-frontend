import React from 'react'
import { BodyModal } from './styles'
import { TiBackspace } from 'react-icons/ti'
interface modalProps {
  open: boolean
  setOpen(open: boolean): void
  onAfterClose?(): void
}
const Modal: React.FC<modalProps> = ({
  open,
  setOpen,
  onAfterClose,
  children,
}) => {
  function close() {
    setOpen(false)
    onAfterClose && onAfterClose()
  }
  const handleOutsideClick = (e: any) => {
    if (e.target.id === 'modal') {
      close()
    }
  }
  return (
    <BodyModal open={open} id="modal" onClick={handleOutsideClick}>
      <div className="janela">
        <span className="fechar" onClick={close}>
          <TiBackspace />
          Voltar
        </span>
        {children}
      </div>
    </BodyModal>
  )
}

export default Modal
