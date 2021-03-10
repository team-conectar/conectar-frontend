import React, { HTMLAttributes, useEffect, useState } from 'react'
import { VacancieLi, DropdownList } from './styles'
import id from '../../assets/icon/id.svg'
import al from '../../assets/icon/al.svg'
import co from '../../assets/icon/co.svg'
import { AxiosError } from 'axios'
import api from '../../services/api'
import { GiHamburgerMenu } from 'react-icons/gi'
import { VacanciesType } from '../Vacancy'

interface Props extends HTMLAttributes<HTMLLIElement> {
  vacancy: VacanciesType
}
const VacancieListItem: React.FC<Props> = ({ vacancy, ...rest }) => {
  const [profile, setProfile] = useState<string>('')
  const [agreement, setAgreement] = useState<string>('')
  useEffect(() => {
    const res = [
      api
        .get(`/api/v1/tipoAcordo?tipo_acordo_id=${vacancy.tipo_acordo_id}`)
        .then(response => {
          setAgreement(response.data.descricao)
        })
        .catch((err: AxiosError) => {
          return err?.response?.data.detail
        }),
      api
        .get(`/api/v1/papel/${vacancy.papel_id}`)
        .then(response => {
          setProfile(response.data.descricao)
        })
        .catch((err: AxiosError) => {
          return err?.response?.data.detail
        }),
    ]
    console.log(res)
  }, [vacancy.papel_id, vacancy.tipo_acordo_id])
  return (
    <VacancieLi {...rest}>
      <img
        src={
          (profile?.toLowerCase() === 'colaborador' && co) ||
          (profile?.toLowerCase() === 'idealizador' && al) ||
          (profile?.toLowerCase() === 'aliado' && id) ||
          ''
        }
        alt={profile}
      />
      <p>
        <strong>
          {vacancy.titulo} | {profile}
        </strong>
        <br />
        <span>{agreement} </span>
        <strong>{vacancy.remunerado ? 'Remunerado' : 'Não remunerado'}</strong>
        <br />
        <span>2 vagas</span>
      </p>

      <DropdownList IconButton={<GiHamburgerMenu />}>
        <li>Clonar vaga</li>
        <li>Exluir vaga</li>
      </DropdownList>
    </VacancieLi>
  )
}
export default VacancieListItem
