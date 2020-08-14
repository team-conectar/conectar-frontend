import React, { InputHTMLAttributes } from 'react';
import { BodyNavBar } from './styles';
import logo from '../../assets/image/logo.svg';
import { Link } from 'react-router-dom';
interface navProps {
  logged?: boolean;

}
const NavBar: React.FC<navProps> = ({ logged }) => {

  return (
    <BodyNavBar>
      
        <img src={logo} alt="logo conectar" />
        <input></input>
        <aside>

          <Link to="#" >EXPLORE</Link>
          <Link to="#" className="create">CRIAR PROJETO</Link>
          {logged && (

            <button>i</button>
          )}
        </aside>


      
    </BodyNavBar>

  )

}

export default NavBar;