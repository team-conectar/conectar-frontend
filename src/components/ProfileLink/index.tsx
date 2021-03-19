import React, { useContext } from 'react'
import { BodyCard } from './styles'
import { Link } from 'react-router-dom'
import id from '../../assets/icon/id.svg'
import al from '../../assets/icon/al.svg'
import co from '../../assets/icon/co.svg'
import Skeleton from 'react-loading-skeleton'
import { Context } from '../../context/AuthContext'

const ProfileLink: React.FC = () => {
  const { user } = useContext(Context)

  return (
    <BodyCard>
      {/* <img
        src="https://upload.wikimedia.org/wikipedia/pt/thumb/4/4d/Clube_do_Remo.png/120px-Clube_do_Remo.png"
        alt=""
      /> */}
      <Skeleton circle height="100px" width="100px" />
      <p>
        <h2>{user.nome || <Skeleton width="150px" />}</h2>
        {(user.usuario && '@' + user.usuario) || <Skeleton width="100px" />}
      </p>

      <aside>
        {user.idealizador && <img src={id} alt="" />}
        {user.aliado && <img src={al} alt="" />}
        {user.colaborador && <img src={co} alt="" />}
      </aside>
      <Link to={`perfil/${user.id}`}>Ver Perfil</Link>
    </BodyCard>
  )
}
export default ProfileLink
