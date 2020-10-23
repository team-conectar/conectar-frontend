import React from 'react';
import { BodyModal } from './styles';
import { AiOutlineClose } from "react-icons/ai";
interface modalProps {
  open: boolean;
  setOpen(open: boolean): void;
  onAfterClose?():void;
}
const Modal: React.FC<modalProps> = ({ open, setOpen, onAfterClose, children }) => {
  const handleOutsideClick = (e: any) => {
    if (e.target.id === "modal") close();
  }
  function close(){
    setOpen(false);
    onAfterClose && onAfterClose();
  }
  return (
    <BodyModal
      open={open}
      id="modal"
      onClick={handleOutsideClick}
    >
      <div className="janela">
        <AiOutlineClose
          onClick={close}
        />
        {children}
      </div>
    </BodyModal>
  )

}

export default Modal;