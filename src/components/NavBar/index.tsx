import React, { useContext, useState, useRef } from 'react'
import { BodyNavBar } from './styles'
import logo from '../../assets/image/logo_fundoClaro.svg'
import { Link, useLocation } from 'react-router-dom'
import lupa from '../../assets/icon/lupa.svg'
import explorar from '../../assets/icon/explorar.svg'
import explorar_secondary from '../../assets/icon/explorer_secondary.svg'
import userDefault from '../../assets/icon/user.svg'
import { Context } from '../../context/AuthContext'
import { useLoggedUser } from '../../context/LoggedUserContext'
import { IconBell, IconUser } from '../../assets/icon'
import Dropdown from '../Dropdown'

const NavBar: React.FC = () => {
  const { loading, isAuthenticated, handleLogout } = useContext(Context)
  const user = useLoggedUser()
  const location = useLocation()
  console.log(location)

  return (
    <BodyNavBar
      explorar={!!(location.pathname === '/explorar')}
      sobre={!!(location.pathname === '/sobre')}
    >
      <aside>
        <Link to="/">
          <img src={logo} alt="logo conectar" />
        </Link>
        <Link to="/explorar" className="explorar">
          <img src={explorar} alt="Explore os demais projetos" />
          <img src={explorar_secondary} alt="Explore os demais projetos" />
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
            <Dropdown IconButton={<IconBell />}>
              <li>Voce tem novo convite</li>
              <li>Que tal aproveitar</li>
            </Dropdown>
            <Dropdown
              IconButton={
                <figure>
                  {user.foto_perfil ? (
                    <img src={user.foto_perfil} alt="sua conta" />
                  ) : (
                    <IconUser id="user" />
                  )}
                </figure>
              }
            >
              <section>
                <img
                  src={user.foto_perfil ? user.foto_perfil : userDefault}
                  alt={user.nome}
                />
                <legend>{user.nome}</legend>
                <p>{user.usuario}</p>
                <p>{user.email}</p>
              </section>
              <Link to={`/perfil/${user.id}`}>Perfil no Conectar</Link>
              <Link to="/explore">Configurações</Link>
              <Link to="/explore">Ajuda</Link>
              <button onClick={handleLogout}>Sair</button>
            </Dropdown>
          </>
        )}
      </aside>
    </BodyNavBar>
  )
}

export default NavBar
