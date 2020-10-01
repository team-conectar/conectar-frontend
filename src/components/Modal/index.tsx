import React, { Children, InputHTMLAttributes, useState } from 'react';
import { BodyModal } from './styles';
import logo from '../../assets/image/logo.svg';
import { Link } from 'react-router-dom';
import lupa from '../../assets/icon/lupa.svg';
import { AiOutlineClose } from "react-icons/ai";
interface modalProps {
  open: boolean;
  setOpen(open: boolean): void;
}
const Modal: React.FC<modalProps> = ({ open, setOpen, children }) => {

  
  return (
    <BodyModal
      open={open}
      id="modal"
    >


      <div className="janela">
        <AiOutlineClose
          onClick={() => setOpen(false)}
        />
        {children}
      </div>



    </BodyModal>
  )

}

export default Modal;