import React, { InputHTMLAttributes } from 'react';
import { BodyNavBar } from './styles';
import logo from '../../assets/image/logo.svg';
interface navProps {
  logged?: boolean;

}
const NavBar: React.FC<navProps> = ({ logged }) => {

  return (
    <BodyNavBar>
      <header>
        <img src={logo} alt="logo conectar" />
        <input></input>
        <aside>

          <button>Explore</button>
          <button>Criar Projeto</button>
          {logged && (

            <button>i</button>
          )}
        </aside>


      </header>
    </BodyNavBar>

  )

}

export default NavBar;