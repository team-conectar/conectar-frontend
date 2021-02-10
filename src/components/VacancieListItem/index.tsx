import React, {
  HTMLAttributes,
  InputHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react'
import { VacancieLi, DropdownList } from './styles'
import { Link } from 'react-router-dom'
import id from '../../assets/icon/id.svg'
import al from '../../assets/icon/al.svg'
import co from '../../assets/icon/co.svg'
import { Context } from '../../context/AuthContext'
import { AxiosError } from 'axios'
import { AreaType } from '../SelectArea'
import { ToolType } from '../SelectTools'
import api from '../../services/api'
import Button from '../Button'
import Dropdown from '../Dropdown'
import { GiHamburgerMenu } from 'react-icons/gi'

interface Props extends HTMLAttributes<HTMLLIElement> {
  vacancy: {
    papel_id: number
    tipo_acordo_id: number
    id: number
  }
}
const VacancieListItem: React.FC<Props> = ({ vacancy, ...rest }) => {
  const [office, setOffice] = useState<string>('')
  const [agreement, setAgreement] = useState<string>('')
  useEffect(() => {
    const res = api
      .get(`/api/v1/tipoAcordo?id=${vacancy.tipo_acordo_id}`)
      .then(response => {
        setAgreement(response.data)
      })
      .catch((err: AxiosError) => {
        return err?.response?.data.detail
      })
    console.log(res)
  }, [vacancy.tipo_acordo_id])
  return (
    <VacancieLi {...rest}>
      <img src={co} alt="colaborador" />
      <p>
        <strong>Ux Designer | Colaborador</strong>
        <br />
        <span>{agreement} </span>
        <strong>
          | Não remunerado <br />
        </strong>
        <span>2 vagas</span>
      </p>

      <DropdownList DropButton={<GiHamburgerMenu />}>
        <li>Clonar vaga</li>
        <li>Editar vaga</li>
        <li>Exluir vaga</li>
      </DropdownList>
    </VacancieLi>
  )
}
export default VacancieListItem
