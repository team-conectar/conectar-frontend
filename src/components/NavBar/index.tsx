import React, { useContext, useState, useCallback, useEffect, useRef, RefAttributes, useMemo } from 'react';
import { BodyNavBar } from './styles';
import logo from '../../assets/image/logo.svg';
import { Link } from 'react-router-dom';
import lupa from '../../assets/icon/lupa.svg';
import userDefault from '../../assets/icon/user.svg';
import { Context } from '../../context/AuthContext';
import api from '../../services/api';
import { AxiosError } from 'axios'
interface UserTypes {
  email: string;
  nome: string;
  foto_perfil: string;
  usuario: string;
}

const NavBar: React.FC = () => {
  const { loading, isAuthenticated } = useContext(Context);
  const [userButton, setUserButton] = useState(false);
  const [user, setUser] = useState<UserTypes>({} as UserTypes);
  const divRef = useRef(null);
  document.addEventListener("mousedown", (event: any) => {
    if (event.target.id !== "dropdown" && userButton && event.target.id !== "user" && event.target.id !== "1") {
      setUserButton(!userButton);
    }
  })
  function handleLogout() {
    const res = api
      .post('/logout')
      .catch((err: AxiosError) => {
        return err?.response?.data.detail;
      });
    console.log(res);
  }
  useEffect(() => {
    if (isAuthenticated) {
      const res = api
        .get('/pessoas/me')
        .then((response) => {
          setUser(response.data);
        })
        .catch((err: AxiosError) => {
          return err?.response?.data.detail;
        });
      console.log(res);
    }
  }, [isAuthenticated]);

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
        {!loading && isAuthenticated &&

          <div id="dropdown" >
            <button
              id="user"
              onClick={() => setUserButton(!userButton)}
            >
              <img src={userDefault} alt="sua conta" />
            </button>
            {console.log(divRef)}
            {
              userButton &&
              <div className="dropdown-content" >
                <section>
                  <img src={user.foto_perfil ? user.foto_perfil : userDefault} alt="sua conta" />
                  <legend>{user.nome}</legend>
                  <p>@may</p>
                  <p>{user.email}</p>
                </section>
                <Link id="1" to="/explore">Perfil no Conectar</Link>
                <Link id="1" to="/explore">Configurações</Link>
                <Link id="1" to="/explore">Ajuda</Link>
                <button id="1" onClick={handleLogout}>Sair</button>

              </div>
            }
          </div>

        }
      </aside>



    </BodyNavBar >

  )

}

export default NavBar;