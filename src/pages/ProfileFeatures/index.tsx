import React, { useState, ChangeEvent, FormEvent } from 'react';
import { BodyProfileFeatures } from './styles';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select, { OptionsTypes } from '../../components/Select';
import Button from '../../components/Button';
import ToggleSwitch from '../../components/ToggleSwitch';
import { yearOptions, monthOptions } from '../../utils/dates';
import { useHistory } from 'react-router-dom';
import edit from '../../assets/icon/editar.svg';
import trash from '../../assets/icon/lixeira.svg';

interface ShowRegisterTypes {
  first: boolean;
  second: boolean;
  third: boolean;
}
interface DataSchoolExperienceType {
  institution: string;
  trainingLevel: string;
  cource: string;
  localization: string;
  situation: string;
  details: string;
  initialYear: number;
  finalYear: number;
}
interface DataWorkExperienceType {
  organization: string;
  bond: string;
  office: string;
  localization: string;
  details: string;
  initialMonth: string;
  initialYear: number;
  finalMonth: string;
  finalYear: number;
}
interface DataProjectsExperienceType {
  name: string;
  situation: string;
  office: string;
  institution: string;
  current: boolean;
  details: string;
  initialMonth: string;
  initialYear: number;
  finalMonth: string;
  finalYear: number;
}


function ProfileFeatures() {
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;



  }
  const history = useHistory();
  const vinculos: OptionsTypes[] = [
    { label: "Trainee", value: "0", },
    { label: "Terceirizado", value: "1", },
    { label: "Intermitente", value: "2", },
    { label: "Aprendiz", value: "3", },
    { label: "Estágio", value: "4", },
    { label: "Temporário", value: "5", },
    { label: "Freelance", value: "6", },
    { label: "Autônomo", value: "7", },
    { label: "Meio Período", value: "8", },
    { label: "Tempo Integral", value: "9", }
  ]
  const [register, setRegister] = useState<ShowRegisterTypes>({
    first: false,
    second: false,
    third: false,
  });
  const [dataSchool, setDataSchool] = useState<DataSchoolExperienceType[]>([])
  const [dataWork, setDataWork] = useState<DataWorkExperienceType[]>([])
  const [dataProjects, setDataProjects] = useState<DataProjectsExperienceType[]>([
    {
      name: "string",
      situation: "string",
      office: "string",
      institution: "string",
      current: true,
      details: "string",
      initialMonth: "string",
      initialYear: 2019,
      finalMonth: "string",
      finalYear: 2020,
    }
  ])
  return (
    <BodyProfileFeatures >
      <div className="area-central container">
        <h1>Nos conte sua experiência</h1>
        <section className="caracteristicas">
          <h2>Educação</h2>

          {!register.first
            ?
            <div className="experiencias">

              {dataProjects.map(experience => (
                <div className="experiencia-cadastrada">
                  <section className="icones">
                    <img src={edit} alt="editar experiencia" />
                    <img src={trash} alt="apagar experiencia" />
                  </section>
                  <fieldset className="info-experiencias">
                    <legend>{experience.name}</legend>
                    <p>{experience.institution} | {experience.office}</p>
                    {experience.current
                      ?
                      <text>
                        <p>Projeto em andamento</p>
                        <p>{experience.initialMonth} de {experience.initialYear} - Até o momento</p>
                      </text>
                      :
                      <text>
                        <p>{experience.initialMonth} de {experience.initialYear} - {experience.finalMonth} de {experience.finalYear}</p>
                        <p>Projeto finalizado</p>
                      </text>
                    }
                  </fieldset>


                </div>

              ))}
              <button onClick={() => setRegister({ ...register, first: true })}>
                <span>+ </span>
                Adicionar
              </button>
            </div>
            :
            <aside className="area-registro">
              <section className="bloco-um">
                <Input label="Instituição de ensino" name="" />
                <Input label="Curso" name="" />
              </section>
              <section className="bloco-dois">
                <Select
                  label="Nível de formação"
                  name=""
                  options={vinculos}
                  defaultOption="Selecione"
                />
                <aside>
                  <Select
                    label="Ano incial"
                    name="initialYear"
                    options={yearOptions}
                    defaultOption="Selecione"
                  />
                  <Select
                    label="Ano final"
                    name="finalYear"
                    options={yearOptions}
                    defaultOption="Selecione"
                  />
                </aside>
              </section>
              <section className="bloco-tres">
                <form action="">
                  <ToggleSwitch label="Incompleto" name="" />
                  <ToggleSwitch label="Em andamento" name="" />
                  <ToggleSwitch label="Concluído" name="" />
                </form>
              </section>
              <section className="bloco-quatro">
                <Textarea name="details" label="Detalhes"></Textarea>
              </section>
              <section className="area-botoes">
                <Button>Salvar</Button>
                <Button>Excluir</Button>
                <Button onClick={() => setRegister({ ...register, first: false })}>Calcelar</Button>
              </section>
            </aside>
          }
        </section>
        <section className="caracteristicas">
          <h2>Atuação Profissional</h2>
          {!register.second
            ?
            <div className="experiencias">

              {dataProjects.map(experience => (
                <div className="experiencia-cadastrada">
                  <section className="icones">
                    <img src={edit} alt="editar experiencia" />
                    <img src={trash} alt="apagar experiencia" />
                  </section>
                  <fieldset className="info-experiencias">
                    <legend>{experience.name}</legend>
                    <p>{experience.institution} | {experience.office}</p>
                    {experience.current
                      ?
                      <text>
                        <p>Projeto em andamento</p>
                        <p>{experience.initialMonth} de {experience.initialYear} - Até o momento</p>
                      </text>
                      :
                      <text>
                        <p>{experience.initialMonth} de {experience.initialYear} - {experience.finalMonth} de {experience.finalYear}</p>
                        <p>Projeto finalizado</p>
                      </text>
                    }
                  </fieldset>


                </div>

              ))}
              <button onClick={() => setRegister({ ...register, second: true })}>
                <span>+ </span>
                Adicionar
              </button>
            </div>
            :
            <aside className="area-registro">
              <section className="bloco-um">
                <Input label="Organização" name="organization" />
                <Input label="Cargo" name="" />
              </section>
              <section className="bloco-dois">

                <Select
                  label="Vínculo"
                  name="bond"
                  options={vinculos}
                  defaultOption="Selecione"
                />
                <Input label="Localização" name="" />
              </section>
              <section className="bloco-tres">
                <aside>
                  <Select
                    label="Mês incial"
                    name="initialMonth"
                    options={monthOptions}
                    defaultOption="Selecione"
                  />
                  <Select
                    label="Ano incial"
                    name="initialYear"
                    options={yearOptions}
                    defaultOption="Selecione"
                  />
                </aside>
                <aside>
                  <ToggleSwitch label="Trabalho atual" name=""/>
                </aside>
                <aside>
                  <Select
                    label="Mês final"
                    name="initialMonth"
                    options={monthOptions}
                    defaultOption="Selecione"
                  />
                  <Select
                    label="Ano final"
                    name="initialYear"
                    options={yearOptions}
                    defaultOption="Selecione"
                  />
                </aside>
              </section>
              <section className="bloco-quatro">
                <Textarea name="details" label="Detalhes"></Textarea>
              </section>
              <section className="area-botoes">
                <Button>Salvar</Button>
                <Button>Excluir</Button>
                <Button onClick={() => setRegister({ ...register, second: false })}>Calcelar</Button>
              </section>
            </aside>
          }
        </section>
        <section className="caracteristicas">
          <h2>Projetos</h2>

          {!register.third
            ?
            <div className="experiencias">

              {dataProjects.map(experience => (
                <div className="experiencia-cadastrada">
                  <section className="icones">
                    <img src={edit} alt="editar experiencia" />
                    <img src={trash} alt="apagar experiencia" />
                  </section>
                  <fieldset className="info-experiencias">
                    <legend>{experience.name}</legend>
                    <p>{experience.institution} | {experience.office}</p>
                    {experience.current
                      ?
                      <text>
                        <p>Projeto em andamento</p>
                        <p>{experience.initialMonth} de {experience.initialYear} - Até o momento</p>
                      </text>
                      :
                      <text>
                        <p>{experience.initialMonth} de {experience.initialYear} - {experience.finalMonth} de {experience.finalYear}</p>
                        <p>Projeto finalizado</p>
                      </text>
                    }
                  </fieldset>


                </div>

              ))}
              <button onClick={() => setRegister({ ...register, third: true })}>
                <span>+ </span>
                Adicionar
              </button>
            </div>
            :
            <aside className="area-registro">
              <section className="bloco-um">
                <Input label="Nome do projeto" name="projectName" onChange={handleInputChange} />
                <Input label="Instituição de execução" name="" onChange={handleInputChange} />
              </section>
              <section className="bloco-dois">
                <Select
                  label="Situação"
                  name="situation"
                  options={vinculos}
                  defaultOption="Selecione"
                />

                <Input label="Cargo" name="" />
              </section>
              <section className="bloco-tres">
                <aside>
                  <Select
                    label="Mês incial"
                    name="initialMonth"
                    options={monthOptions}
                    defaultOption="Selecione"
                  />
                  <Select
                    label="Ano incial"
                    name="initialYear"
                    options={yearOptions}
                    defaultOption="Selecione"
                  />
                </aside>
                <aside>
                  <ToggleSwitch label="Estou nesse projeto atualmente" name=""/>
                </aside>
                <aside>
                  <Select
                    label="Mês final"
                    name="initialMonth"
                    options={monthOptions}
                    defaultOption="Selecione"
                  />
                  <Select
                    label="Ano final"
                    name="initialYear"
                    options={yearOptions}
                    defaultOption="Selecione"
                  />
                </aside>
              </section>
              <section className="bloco-quatro">
                <Textarea name="details" label="Detalhes"></Textarea>
              </section>
              <section className="area-botoes">
                <Button>Salvar</Button>
                <Button>Excluir</Button>
                <Button onClick={() => setRegister({ ...register, third: false })}>Calcelar</Button>
              </section>
            </aside>
          }
        </section>
        <footer>
          <Button>Pular</Button> <Button onClick={() => { history.push("/experienceareas") }}>Continuar</Button>
        </footer>
      </div>
    </BodyProfileFeatures >
  )
}
export default ProfileFeatures;