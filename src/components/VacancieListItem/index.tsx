import React, { HTMLAttributes, useCallback, useEffect, useState } from 'react'
import { IPropsLiVancancyStyles, VacancyLi } from './styles'
import id from '../../assets/icon/id.svg'
import al from '../../assets/icon/al.svg'
import co from '../../assets/icon/co.svg'
import { AxiosError } from 'axios'
import api from '../../services/api'
import { GiHamburgerMenu } from 'react-icons/gi'
import { VacanciesType } from '../Vacancy'
import { showToast } from '../../components/Toast/Toast'
import { IconEdit, IconTrash } from '../../assets/icon'
interface Props extends IPropsLiVancancyStyles {
  vacancy: VacanciesType
  onEdit(): void
  onDelete(): void
  dontShowOption?: true
}
const VacancyListItem: React.FC<Props> = ({
  vacancy,
  onEdit,
  onDelete,
  dontShowOption,
  ...rest
}) => {
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
    <VacancyLi {...rest}>
      <img
        src={
          (profile?.toLowerCase() === 'colaborador' && co) ||
          (profile?.toLowerCase() === 'idealizador' && id) ||
          (profile?.toLowerCase() === 'aliado' && al) ||
          ''
        }
        alt={profile}
      />
      <p>
        <strong>
          {vacancy.id} | {profile}
        </strong>
        <br />
        <span>{agreement} </span>
        <strong>{vacancy.remunerado ? 'Remunerado' : 'Não remunerado'}</strong>
        <br />
        <span>
          {`vaga ${vacancy.pessoa_id ? 'indisponível' : 'disponível'} `}
        </span>
      </p>

      {!dontShowOption && (
        <aside>
          <IconEdit onClick={() => onEdit && onEdit()} />
          <IconTrash
            onClick={() => {
              onDelete && onDelete()
            }}
          />
        </aside>
      )}
    </VacancyLi>
  )
}
export default VacancyListItem
