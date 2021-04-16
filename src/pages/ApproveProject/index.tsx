import React, { useState, useEffect, useCallback } from 'react'
import { BodyApproveProject } from './styles'
import Button from '../../components/UI/Button'
import { AxiosError } from 'axios'
import NavBar from '../../components/UI/NavBar'
import ProjectCard, { IProject } from '../../components/ProjectCard'
import api from '../../services/api'
import ProfileLink from '../../components/ProfileLink'
import LinksCard from '../../components/LinksCard'
import SuccessfulCreatorsCard from '../../components/SuccessfulCreatorsCard'
import VacancieCard, { IVacancyCard } from '../../components/VacancieCard'
import { useParams } from 'react-router-dom'
import hero from '../../assets/image/temos_um_time_para_seu_projeto.svg'
import { IProfile } from '../../components/ProfileCard'
interface routeParms {
  id: string
}
const ApproveProject: React.FC = () => {
  const project_id = useParams<routeParms>().id
  const [project, setProject] = useState<IProject>({} as IProject)
  const [vacancies, setVacancies] = useState<Array<IVacancyCard>>([])

  useEffect(() => {
    const res = [
      api
        .get(`/api/v1/projeto/${project_id}`)
        .then(response => {
          setProject(response.data)
        })
        .catch((err: AxiosError) => {
          return err?.response?.data.detail
        }),
      api
        .get(`/api/v1/pessoa_projeto/projeto/${project_id}`)
        .then(resDisponiveis => {
          setVacancies(resDisponiveis.data)
          api
            .get(`/api/v1/pessoa_projeto/similaridade/${project_id}`)
            .then(resSimilaridade => {
              setVacancies(
                resDisponiveis.data.map((vacancy: IVacancyCard) => {
                  return {
                    ...vacancy,
                    pessoa_id: resSimilaridade.data[`${vacancy.id}`].id,
                    pessoa_foto_url: resSimilaridade.data[`${vacancy.id}`].foto,
                  }
                }),
              )
            })
        })
        .catch((err: AxiosError) => {
          console.log(err?.response?.data.detail)
        }),
    ]
    console.log(res)
  }, [project_id])
  const handleInvite = useCallback(() => {
    setVacancies(
      vacancies.map(vacancy => {
        api
          .put(`/api/v1/pessoa_projeto/${vacancy.id}`, {
            situacao: 'PENDENTE_COLABORADOR',
          })
          .catch((err: AxiosError) => {
            console.log(err?.response?.data.detail)
          })
        return { ...vacancy, situacao: 'PENDENTE_COLABORADOR' }
      }),
    )
  }, [vacancies])

  return (
    <>
      <NavBar />
      <BodyApproveProject>
        <ProfileLink />
        <main>
          <figure>
            <img src={hero} alt="Confira as vagas" />
            <figcaption>
              Confira o resumo da conexão do seu projeto com os candidatos
            </figcaption>
          </figure>
          <section>
            <ProjectCard project={project} hiddeOwner />
          </section>
          <section>
            <ul>
              {vacancies.map(vacancy => (
                <VacancieCard key={vacancy.id} vacancy={vacancy} />
              ))}
            </ul>
          </section>
          <aside>
            <Button theme="secondary">Finalizar acordos</Button>
            <Button theme="primary" onClick={handleInvite}>
              Enviar convites
            </Button>
          </aside>
        </main>
        <LinksCard />
        <SuccessfulCreatorsCard />
      </BodyApproveProject>
    </>
  )
}
export default ApproveProject
