import React, { useContext, useState, useRef } from 'react'
import { BodyNavBar } from './styles'
import logo from '../../assets/image/logo_fundoClaro.svg'
import { Link } from 'react-router-dom'
import lupa from '../../assets/icon/lupa.svg'
import notification from '../../assets/icon/notification.svg'
import explorar from '../../assets/icon/explorar.svg'
import userDefault from '../../assets/icon/user.svg'
import { Context } from '../../context/AuthContext'
import { useLoggedUser } from '../../context/LoggedUserContext'
interface UserTypes {
  email: string
  nome: string
  foto_perfil: string
  usuario: string
}
interface NavBarProps {
  pageIsSobre?: boolean
  pageIsExplorar?: boolean
}

const NavBar: React.FC<NavBarProps> = ({ pageIsSobre, pageIsExplorar }) => {
  const { loading, isAuthenticated, handleLogout } = useContext(Context)
  const [userButton, setUserButton] = useState(false)
  const [notificationButton, setNotificationButton] = useState(false)
  const divRef = useRef(null)
  const user = useLoggedUser()
  document.addEventListener('mousedown', (event: any) => {
    if (
      event.target.id !== 'dropdown' &&
      event.target.id !== 'user' &&
      event.target.id !== 'notification' &&
      event.target.id !== 'itens'
    ) {
      setUserButton(false)
      setNotificationButton(false)
    } else if (event.target.id === 'user' && notificationButton) {
      setNotificationButton(false)
    } else if (event.target.id === 'notification' && userButton) {
      setUserButton(false)
    }
  })

  return (
    <BodyNavBar explorar={!!pageIsExplorar} sobre={!!pageIsSobre}>
      <aside>
        <Link to="/">
          <img src={logo} alt="logo conectar" />
        </Link>
        <Link to="/explorar" className="explorar">
          <img src={explorar} alt="Explore os demais projetos" />
          Explorar
        </Link>
        <Link to="/sobre" className="sobre">
          Sobre
        </Link>
      </aside>

      <div className="searchBlock">
        <button type="submit">
          <img src={lupa} alt="botao de pesquisa" />
        </button>

        <input placeholder="Buscar"></input>
      </div>
      <aside>
        <Link to="/criar-um-projeto" className="create">
          Criar um Projeto
        </Link>
        {!loading && isAuthenticated && (
          <>
            <div id="dropdown">
              <img
                src={notification}
                alt="sua conta"
                id="notification"
                onClick={() => setNotificationButton(!notificationButton)}
              />
              {console.log(divRef)}
              {notificationButton && <div className="dropdown-content"></div>}
            </div>
            <div id="dropdown">
              <img
                id="user"
                src={userDefault}
                alt="sua conta"
                onClick={() => setUserButton(!userButton)}
              />

              {console.log(divRef)}
              {userButton && (
                <div className="dropdown-content">
                  <section>
                    <img
                      src={user.foto_perfil ? user.foto_perfil : userDefault}
                      alt="sua conta"
                    />
                    <legend>{user.nome}</legend>
                    <p>{user.usuario}</p>
                    <p>{user.email}</p>
                  </section>
                  <Link id="itens" to={`/perfil/${user.id}`}>
                    Perfil no Conectar
                  </Link>
                  <Link id="itens" to="/explore">
                    Configurações
                  </Link>
                  <Link id="itens" to="/explore">
                    Ajuda
                  </Link>
                  <button id="itens" onClick={handleLogout}>
                    Sair
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </aside>
    </BodyNavBar>
  )
}

export default NavBar
