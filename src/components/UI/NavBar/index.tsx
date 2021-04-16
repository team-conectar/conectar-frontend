import React, { useContext, useEffect, useState } from 'react'
import { BodyNavBar, LiNotification } from './styles'
import logo from '../../../assets/image/logo_fundoClaro.svg'
import { Link, NavLink, useLocation } from 'react-router-dom'
import explorar from '../../../assets/icon/explorar.svg'
import explorar_secondary from '../../../assets/icon/explorer_secondary.svg'
import userDefault from '../../../assets/icon/user.svg'
import { Context } from '../../../context/AuthContext'
import { IconBell, IconUser } from '../../../assets/icon'
import Dropdown from '../Dropdown'
import SearchInput from '../SearchInput'
import useAuth from '../../../context/hooks/useAuth'
import api from '../../../services/api'
import { AxiosError } from 'axios'
import Button from '../Button'
interface INotification {
  remetente_id: number
  destinatario_id: number
  projeto_id: number
  pessoa_projeto_id: number
  situacao: string
  lido: boolean
  id: number
  data_criacao: string
  data_atualizacao: string
}
const NavBar: React.FC = () => {
  const { loading, isAuthenticated, handleLogout } = useContext(Context)
  const { user } = useContext(Context)
  const location = useLocation()
  const [notifications, setNotifications] = useState<Array<INotification>>([])
  useEffect(() => {
    const res = api
      .get(`api/v1/notificacao/destinatario?destinatario_id=${user.id}`)
      .then(response => {
        setNotifications(response.data)
      })
      .catch((err: AxiosError) => {
        return err?.response?.data.detail
      })

    console.log(res)
  }, [])

  return (
    <BodyNavBar>
      <aside>
        <NavLink to="/">
          <img src={logo} alt="logo conectar" />
        </NavLink>
        <NavLink to="/explorar" className="explorar" activeClassName="selected">
          <img src={explorar} alt="Explore os demais projetos" />
          <img src={explorar_secondary} alt="Explore os demais projetos" />
          Explorar
        </NavLink>
        <NavLink to="/sobre" className="sobre" activeClassName="selected">
          Sobre
        </NavLink>
      </aside>
      {location.pathname.split('/')[1] !== 'pesquisar' && <SearchInput />}
      <aside>
        <NavLink to="/criar-um-projeto" className="create">
          Criar um Projeto
        </NavLink>
        {!loading && isAuthenticated && (
          <>
            <Dropdown IconButton={<IconBell />}>
              <h4>Notificações</h4>
              {notifications?.map(notification => (
                <LiNotification key={notification.id}>
                  <img src={``} alt={``} />
                  <p>{notification.situacao}</p>
                </LiNotification>
              ))}
              <aside>
                <strong>Marcar como lida</strong>
                <Button theme="secondary">Ver todas</Button>
              </aside>
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
                <legend>{user.nome?.split(' ')[0]}</legend>
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
