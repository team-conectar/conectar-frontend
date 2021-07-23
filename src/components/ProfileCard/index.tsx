import React, { useContext, useEffect, useState } from 'react'
import { BodyCard } from './styles'
import { Link } from 'react-router-dom'
import id from '../../assets/icon/id.svg'
import al from '../../assets/icon/al.svg'
import co from '../../assets/icon/co.svg'
import { AreaType } from '../UI/SelectArea'
import { ToolType } from '../UI/SelectTools'
import Skeleton from 'react-loading-skeleton'
import Button from '../UI/Button'
import userDefault from '../../assets/icon/user.svg'
import { Context } from '../../context/AuthContext'
import api from '../../services/api'

export interface IProfile {
  data_nascimento: string
  usuario: string
  email: string
  ativo: boolean
  nome: string
  telefone: string
  colaborador: boolean
  idealizador: boolean
  aliado: boolean
  foto_perfil: string
  habilidades: ToolType[]
  areas: AreaType[]
  id: number
  data_criacao: string
  data_atualizacao: string
}
interface IProfileCardProps {
  profile: IProfile
}
const ProfileCard: React.FC<IProfileCardProps> = ({ profile }) => {
  const loggedUser = useContext(Context).user
  const [followed, setFollowed] = useState(false)
  // useEffect(() => {
  //   if (project.projeto_reacoes && loggedUser.id) {
  //     setFavorited(
  //       !!project.projeto_reacoes.find(reaction => {
  //         return (
  //           reaction.pessoa_id === loggedUser.id &&
  //           reaction.reacao === 'FAVORITO'
  //         )
  //       }),
  //     )
  //     setInteressed(
  //       !!project.projeto_reacoes.find(reaction => {
  //         return (
  //           reaction.pessoa_id === loggedUser.id &&
  //           reaction.reacao === 'INTERESSE'
  //         )
  //       }),
  //     )
  //   }
  // }, [loggedUser.id, project.id, project.projeto_reacoes])
  function ToogleFollow() {
    if (followed) {
      api
        .delete(
          `/api/v1/reacoes?pessoa_id=${loggedUser.id}&projeto_id=${profile.id}&reacao=FAVORITO`,
        )
        .then(response => {
          setFollowed(false)
        })
    } else {
      api
        .post('/api/v1/reacoes', {
          reacao: 'FAVORITO',
          pessoa_id: loggedUser?.id,
          projeto_id: profile.id,
        })
        .then(response => {
          setFollowed(true)
        })
    }
  }
  return (
    <BodyCard>
      <Link to={`/perfil/${profile.usuario}`}>
        <img
          src={
            profile?.foto_perfil
              ? `https://conectar.s3.sa-east-1.amazonaws.com/uploads/${profile?.foto_perfil}`
              : userDefault
          }
          alt={profile.nome}
        />
      </Link>

      <section>
        <p>
          <Link to={`/perfil/${profile.usuario}`}>
            <h2>{profile.nome}</h2>
            {(profile.usuario && '@' + profile.usuario) || (
              <Skeleton width="100px" />
            )}
          </Link>
        </p>
      </section>
      <aside>
        <span>
          {profile.idealizador && <img src={id} alt="" />}
          {profile.aliado && <img src={al} alt="" />}
          {profile.colaborador && <img src={co} alt="" />}
        </span>
        <Button theme="primary">SEGUIR</Button>
      </aside>
    </BodyCard>
  )
}
export default ProfileCard
