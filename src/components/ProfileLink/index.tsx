import React, { useContext } from 'react'
import { BodyCard } from './styles'
import { Link, useHistory } from 'react-router-dom'
import id from '../../assets/icon/id.svg'
import al from '../../assets/icon/al.svg'
import co from '../../assets/icon/co.svg'
import Skeleton from 'react-loading-skeleton'
import { Context } from '../../context/AuthContext'
import Button from '../UI/Button'
import { FaLink } from 'react-icons/fa'

const ProfileLink: React.FC = () => {
  const { user, isAuthenticated } = useContext(Context)
  const history = useHistory()
  return isAuthenticated ? (
    <BodyCard>
      {/* <img
        src="https://upload.wikimedia.org/wikipedia/pt/thumb/4/4d/Clube_do_Remo.png/120px-Clube_do_Remo.png"
        alt=""
      /> */}
      <Skeleton circle height="100px" width="100px" />
      <p>
        <h2>{user.nome?.split(' ')[0] || <Skeleton width="150px" />}</h2>
        {(user.usuario && '@' + user.usuario) || <Skeleton width="100px" />}
      </p>

      <aside>
        {user.idealizador && <img src={id} alt="Ele é um idealizador" />}
        {user.aliado && <img src={al} alt="Ele é um aliado" />}
        {user.colaborador && <img src={co} alt="Ele é um colaborador" />}
      </aside>
      <Link to={`/perfil/${user.id}`}>Ver Perfil</Link>
    </BodyCard>
  ) : (
    <BodyCard>
      <h2>Faça parte de um time perfeito!</h2>
      <Button theme="primary" onClick={() => history.push(`/cadastrar/1`)}>
        Cadastre-se
      </Button>
      <strong>
        Já tem uma conta? <Link to="/">Entrar</Link>
      </strong>
    </BodyCard>
  )
}
export default ProfileLink
