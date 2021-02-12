import React, { HTMLAttributes, useEffect, useState } from 'react'
import { VacancieLi, DropdownList } from './styles'
import id from '../../assets/icon/id.svg'
import al from '../../assets/icon/al.svg'
import co from '../../assets/icon/co.svg'
import { AxiosError } from 'axios'
import api from '../../services/api'
import { GiHamburgerMenu } from 'react-icons/gi'

interface Props extends HTMLAttributes<HTMLLIElement> {
  vacancy: {
    papel_id: number
    tipo_acordo_id: number
    id: number
    perfil?: string
  }
}
const VacancieListItem: React.FC<Props> = ({ vacancy, ...rest }) => {
  const [office, setOffice] = useState<string>('')
  const [agreement, setAgreement] = useState<string>('')
  useEffect(() => {
    const res = [
      api
        .get(`/api/v1/tipoAcordo?id=${vacancy.tipo_acordo_id}`)
        .then(response => {
          setAgreement(response.data)
        })
        .catch((err: AxiosError) => {
          return err?.response?.data.detail
        }),
      api
        .get(`/api/v1/papel?id=${vacancy.tipo_acordo_id}`)
        .then(response => {
          setOffice(response.data)
        })
        .catch((err: AxiosError) => {
          return err?.response?.data.detail
        }),
    ]
    console.log(res)
  }, [vacancy.tipo_acordo_id])
  return (
    <VacancieLi {...rest}>
      <img
        src={
          (vacancy.perfil?.toLowerCase() === 'colaborador' && co) ||
          (vacancy.perfil?.toLowerCase() === 'idealizador' && al) ||
          (vacancy.perfil?.toLowerCase() === 'a;iado' && id) ||
          ''
        }
        alt={vacancy.perfil}
      />
      <p>
        <strong>
          {office} | {vacancy.perfil}
        </strong>
        <br />
        <span>{agreement} </span>
        <strong>
          | Não remunerado <br />
        </strong>
        <span>2 vagas</span>
      </p>

      <DropdownList DropButton={<GiHamburgerMenu />}>
        <li>Clonar vaga</li>
        <li>Exluir vaga</li>
      </DropdownList>
    </VacancieLi>
  )
}
export default VacancieListItem
