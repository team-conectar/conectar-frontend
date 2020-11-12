import React, { useContext, useState, useCallback, useEffect, useRef, RefAttributes, useMemo } from 'react';
import { BodyNavBar } from './styles';
import logo from '../../assets/image/logo.svg';
import { Link } from 'react-router-dom';
import lupa from '../../assets/icon/lupa.svg';
import user from '../../assets/icon/user.svg';
import { Context } from '../../context/AuthContext';
interface navProps {
  logged?: boolean;

}
const NavBar: React.FC<navProps> = ({ logged }) => {
  const { loading, isAuthenticated } = useContext(Context);
  const [userButton, setUserButton] = useState(false);
  const divRef = useRef(null);
  document.addEventListener("mousedown", (event: any) => {
    if (event.target.id !== "dropdown" && userButton && event.target.id !== "user" && event.target.id !== "1") {
      setUserButton(!userButton);
    }
  })

  return (
    <BodyNavBar >

      <img src={logo} alt="logo conectar" />
      <div className="searchBlock">
        <button type="submit">
          <img src={lupa} alt="botao de pesquisa" />
        </button>

        <input placeholder="Buscar"></input>
      </div>
      <aside>
        <Link to="/explore">EXPLORE</Link>
        <Link to="/createproject" className="create">CRIAR PROJETO</Link>
      {//!loading && isAuthenticated && 

        <div id="dropdown" >
          <button
            id="user"
            onClick={() => setUserButton(!userButton)}
          >
            <img src={user} alt="sua conta"/>
          </button>
          {console.log(divRef)}
          {
            userButton &&
            <div className="dropdown-content" >
              <section>
                <img src={user} alt="sua conta"/>
                <legend>May</legend>
                <p>@may</p>
                <p>may@may.may</p>
              </section>
              <Link id="1" to="/explore">Perfil no Conectar</Link>
              <Link id="1" to="/explore">Configurações</Link>
              <Link id="1" to="/explore">Ajuda</Link>
              <button id="1">Sair</button>
              
            </div>
          }
        </div>

      }
      </aside>



    </BodyNavBar >

  )

}

export default NavBar;