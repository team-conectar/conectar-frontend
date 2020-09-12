import React, { useState, ChangeEvent, FormEvent, useCallback } from "react";
import { BodyProfileFeatures } from "./styles";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select, { OptionsTypes } from "../../components/Select";
import Button from "../../components/Button";
import ToggleSwitch from "../../components/ToggleSwitch";
import { yearOptions, monthOptions } from "../../utils/dates";
import { useHistory } from "react-router-dom";
import edit from "../../assets/icon/editar.svg";
import trash from "../../assets/icon/lixeira.svg";

import { inputChange } from "../../utils/inputChange";
import { selectChange } from "../../utils/selectChange";
import { textareaChange } from "../../utils/textareaChange";

import axios, { AxiosError } from "axios";

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
  const history = useHistory();
  const vinculos: OptionsTypes[] = [
    { label: "Trainee", value: "Trainee" },
    { label: "Terceirizado", value: "Terceirizado" },
    { label: "Intermitente", value: "Intermitente" },
    { label: "Aprendiz", value: "Aprendiz" },
    { label: "Estágio", value: "Estágio" },
    { label: "Temporário", value: "Temporário" },
    { label: "Freelance", value: "Freelance" },
    { label: "Autônomo", value: "Autônomo" },
    { label: "Meio Período", value: "Meio Período" },
    { label: "Tempo Integral", value: "Tempo Integral" },
  ];
  const [register, setRegister] = useState<ShowRegisterTypes>({
    first: false,
    second: false,
    third: false,
  });
  const [dataSchool, setDataSchool] = useState<DataSchoolExperienceType[]>([]);
  const [dataWork, setDataWork] = useState<DataWorkExperienceType[]>([]);
  const [dataProjects, setDataProjects] = useState<
    DataProjectsExperienceType[]
  >([
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
    },
  ]);

  const [academicFormData, setAcademicFormData] = useState({
    institution: "",
    schooling: "",
    course: "",
    initialYear: "",
    finalYear: "",
    details: "",
  });

  const [projectFormData, setProfessionalFormData] = useState({
    position: "",
    projectName: "",
    initialYear: "",
    finalYear: "",
    details: "",
    situation: "",
    currentlyWorking: false,
  });

  const [professionalFormData, setProjectFormData] = useState({
    organization: "",
    bond: "",
    position: "",
    initialYear: "",
    finalYear: "",
    details: "",
    currentlyWorking: false
  });

  /**
   * The useCallback hook will act as the bind method so we can
   * use the generalized function in this scope. Note that memoization
   * doesn't actually improve performance here
   * reference: https://reactjs.org/docs/hooks-reference.html#usecallback
   */
  const handleInputChange = useCallback(
    (
      event: ChangeEvent<HTMLInputElement>,
      setFormData: Function,
      formData: {}
    ) => {
      inputChange(event, setFormData, formData);
    },
    []
  );

  const handleTextAreaChange = useCallback(
    (
      event: ChangeEvent<HTMLTextAreaElement>,
      setFormData: Function,
      formData: {}
    ) => {
      textareaChange(event, setFormData, formData);
    },
    []
  );

  const handleSelectChange = useCallback(
    (
      event: ChangeEvent<HTMLSelectElement>,
      setFormData: Function,
      formData: {}
    ) => {
      selectChange(event, setFormData, formData);
    },
    []
  );

  async function handleAcademicSubmit(event: FormEvent) {
    event.preventDefault();

    const {
      institution,
      schooling,
      course,
      details,
      finalYear,
      initialYear,
    }: {
      institution: string;
      schooling: string;
      course: string;
      details: string;
      initialYear: string;
      // Supressing "The operand of a 'delete' operator must be optional" warning
      finalYear: any;
    } = academicFormData;

    const data = {
      instituicao: institution,
      descricao: details,
      data_inicio: initialYear,
      data_fim: finalYear,
      escolaridade: schooling,
      curso: course,
    };

    /**
     * In case finalYear has been set, it should not be sent to backend
     * So it will be null and not listed when not needed
     */
    if (!finalYear) {
      delete data["data_fim"];
    }

    /**
     * Sends data to backend
     * It's important to notice the withCredentials being true here
     * so it will send the JWT token as cookie
     * */
    const res = await axios
      .post("/api/v1/experiencias/academica", data, {
        withCredentials: true,
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
    console.log(res);

    // Do something
  }

  async function handleProjectSubmit(event: FormEvent) {
    event.preventDefault();

    const {
      currentlyWorking,
      projectName,
      position,
      details,
      finalYear,
      initialYear,
      situation
    }: {
      projectName: string;
      details: string;
      currentlyWorking: boolean;
      position: string;
      situation: string;
      initialYear: string;
      // Supressing "The operand of a 'delete' operator must be optional" warning
      finalYear: any;
    } = projectFormData;

    const data = {
      nome: projectName,
      descricao: details,
      data_inicio: initialYear,
      data_fim: finalYear,
      cargo: position,
      situacao: situation
    };

    if(!currentlyWorking) {
      delete data["data_fim"];
    }

    /**
     * Sends data to backend
     * It's important to notice the withCredentials being true here
     * so it will send the JWT token as cookie
     * */
    const res = await axios
      .post("/api/v1/experiencias/projeto", data, {
        withCredentials: true,
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
    console.log(res);

    // Do something
  }

  async function handleProfessionalSubmit(event: FormEvent) {
    event.preventDefault();

    const {
      bond,
      currentlyWorking,
      organization,
      position,
      details,
      finalYear,
      initialYear,
    }: {
      bond: string;
      currentlyWorking: boolean;
      position: string;
      organization: string;
      details: string;
      initialYear: string;
      // Supressing "The operand of a 'delete' operator must be optional" warning
      finalYear: any;
    } = professionalFormData;

    const data = {
      organizacao: organization,
      descricao: details,
      data_inicio: initialYear,
      data_fim: finalYear,
      cargo: position,
      vinculo: bond,
    };

    if(!currentlyWorking) {
      delete data["data_fim"];
    }

    /**
     * Sends data to backend
     * It's important to notice the withCredentials being true here
     * so it will send the JWT token as cookie
     * */
    const res = await axios
      .post("/api/v1/experiencias/professional", data, {
        withCredentials: true,
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
    console.log(res);

    // Do something
  }

  // Project functions
  function handleProjectInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleInputChange(event, setProjectFormData, projectFormData);
  }
  function handleProjectSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    handleSelectChange(event, setProjectFormData, projectFormData);
  }
  function handleProjectTextAreaChange(
    event: ChangeEvent<HTMLTextAreaElement>
  ) {
    handleTextAreaChange(event, setProjectFormData, projectFormData);
  }

  // Professional functions
  function handleProfessionalInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleInputChange(event, setProfessionalFormData, professionalFormData);
  }
  function handleProfessionalSelectChange(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    handleSelectChange(event, setProfessionalFormData, professionalFormData);
  }
  function handleProfessionalTextAreaChange(
    event: ChangeEvent<HTMLTextAreaElement>
  ) {
    handleTextAreaChange(event, setProfessionalFormData, professionalFormData);
  }

  // Academic functions
  function handleAcademicInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleInputChange(event, setAcademicFormData, academicFormData);
  }
  function handleAcademicSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    handleSelectChange(event, setAcademicFormData, academicFormData);
  }
  function handleAcademicTextAreaChange(
    event: ChangeEvent<HTMLTextAreaElement>
  ) {
    handleTextAreaChange(event, setAcademicFormData, academicFormData);
  }

  return (
    <BodyProfileFeatures>
      <div className="area-central container">
        <h1>Nos conte sua experiência</h1>
        <section className="caracteristicas">
          <h2>Educação</h2>

          {!register.first ? (
            <div className="experiencias">
              {dataProjects.map((experience) => (
                /**
                 * We need to find an actual key for this
                 */
                <div
                  key={Math.floor(Math.random() * (99999 - 0 + 1) + 1)}
                  className="experiencia-cadastrada"
                >
                  <section className="icones">
                    <img src={edit} alt="editar experiencia" />
                    <img src={trash} alt="apagar experiencia" />
                  </section>
                  <fieldset className="info-experiencias">
                    <legend>{experience.name}</legend>
                    <p>
                      {experience.institution} | {experience.office}
                    </p>
                    {experience.current ? (
                      /**
                       * COMMENT
                       * Interestingly, there's no reference to an text tag for html5
                       * and its referenced as an SVGElement on React
                       * */
                      <text>
                        <p>Projeto em andamento</p>
                        <p>
                          {experience.initialMonth} de {experience.initialYear}{" "}
                          - Até o momento
                        </p>
                      </text>
                    ) : (
                      <text>
                        <p>
                          {experience.initialMonth} de {experience.initialYear}{" "}
                          - {experience.finalMonth} de {experience.finalYear}
                        </p>
                        <p>Projeto finalizado</p>
                      </text>
                    )}
                  </fieldset>
                </div>
              ))}
              <button onClick={() => setRegister({ ...register, first: true })}>
                <span>+ </span>
                Adicionar
              </button>
            </div>
          ) : (
            /**
             * COMMENT
             * Please make separate components for each experience
             */
            <form className="form--experiencia" onSubmit={handleAcademicSubmit}>
              <aside className="area-registro">
                <section className="bloco-um">
                  <Input
                    label="Instituição de ensino"
                    name="institution"
                    required
                    onChange={handleAcademicInputChange}
                  />
                  <Input
                    label="Curso"
                    name="course"
                    required
                    onChange={handleAcademicInputChange}
                  />
                </section>
                <section className="bloco-dois">
                  <Select
                    label="Nível de formação"
                    name="schooling"
                    required
                    options={vinculos}
                    defaultOption="Selecione"
                    onChange={handleAcademicSelectChange}
                    value={academicFormData.schooling}
                  />
                  <aside>
                    <Select
                      label="Ano incial"
                      name="initialYear"
                      required
                      options={yearOptions}
                      defaultOption="Selecione"
                      onChange={handleAcademicSelectChange}
                      value={academicFormData.initialYear}
                    />
                    <Select
                      label="Ano final"
                      name="finalYear"
                      options={yearOptions}
                      defaultOption="Selecione"
                      onChange={handleAcademicSelectChange}
                      value={academicFormData.finalYear}
                    />
                  </aside>
                </section>
                <section className="bloco-tres">
                  <form action="">
                    {/**
                     * COMMENT
                     * why is the form only here ?
                     * These are checkboxes, when the user can input only one of them
                     * you may use a radio button
                     * */}
                    <ToggleSwitch label="Incompleto" name="incomplete" />
                    <ToggleSwitch label="Em andamento" name="current" />
                    <ToggleSwitch label="Concluído" name="finished" />
                  </form>
                </section>
                <section className="bloco-quatro">
                  <Textarea
                    name="details"
                    label="Detalhes"
                    required
                    onChange={handleAcademicTextAreaChange}
                  ></Textarea>
                </section>
                <section className="area-botoes">
                  <Button type="submit">Salvar</Button>
                  <Button>Excluir</Button>
                  <Button
                    onClick={() => setRegister({ ...register, first: false })}
                  >
                    Calcelar
                  </Button>
                </section>
              </aside>
            </form>
          )}
        </section>
        <section className="caracteristicas">
          <h2>Atuação Profissional</h2>
          {!register.second ? (
            <div className="experiencias">
              {dataProjects.map((experience) => (
                <div
                  key={Math.floor(Math.random() * (99999 - 0 + 1) + 1)}
                  className="experiencia-cadastrada"
                >
                  <section className="icones">
                    <img src={edit} alt="editar experiencia" />
                    <img src={trash} alt="apagar experiencia" />
                  </section>
                  <fieldset className="info-experiencias">
                    <legend>{experience.name}</legend>
                    <p>
                      {experience.institution} | {experience.office}
                    </p>
                    {experience.current ? (
                      <text>
                        <p>Projeto em andamento</p>
                        <p>
                          {experience.initialMonth} de {experience.initialYear}{" "}
                          - Até o momento
                        </p>
                      </text>
                    ) : (
                      <text>
                        <p>
                          {experience.initialMonth} de {experience.initialYear}{" "}
                          - {experience.finalMonth} de {experience.finalYear}
                        </p>
                        <p>Projeto finalizado</p>
                      </text>
                    )}
                  </fieldset>
                </div>
              ))}
              <button
                onClick={() => setRegister({ ...register, second: true })}
              >
                <span>+ </span>
                Adicionar
              </button>
            </div>
          ) : (
            <form className="form--experiencia" onSubmit={handleProfessionalSubmit}>
              <aside className="area-registro">
                <section className="bloco-um">
                  <Input
                    label="Organização"
                    name="organization"
                    onChange={handleProfessionalInputChange}
                  />
                  <Input
                    label="Cargo"
                    name="position"
                    onChange={handleProfessionalInputChange}
                  />
                </section>
                <section className="bloco-dois">
                  <Select
                    label="Vínculo"
                    name="bond"
                    options={vinculos}
                    defaultOption="Selecione"
                    onChange={handleProfessionalSelectChange}
                  />
                  {/* 
                    This will not be used
                    <Input label="Localização" name="" /> 
                  */}
                </section>
                <section className="bloco-tres">
                  <aside>
                    <Select
                      label="Mês incial"
                      name="initialMonth"
                      options={monthOptions}
                      defaultOption="Selecione"
                      // onChange={handleProfessionalSelectChange}
                    />
                    <Select
                      label="Ano incial"
                      name="initialYear"
                      options={yearOptions}
                      defaultOption="Selecione"
                      onChange={handleProfessionalSelectChange}
                    />
                  </aside>
                  <aside>
                    <ToggleSwitch
                      label="Trabalho atual"
                      name="currentlyWorking"
                      onChange={handleProfessionalInputChange}
                    />
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
                      name="finalYear"
                      options={yearOptions}
                      defaultOption="Selecione"
                      onChange={handleProfessionalSelectChange}
                    />
                  </aside>
                </section>
                <section className="bloco-quatro">
                  <Textarea
                    name="details"
                    label="Detalhes"
                    onChange={handleProfessionalTextAreaChange}
                  />
                </section>
                <section className="area-botoes">
                  <Button type="submit" >Salvar</Button>
                  <Button>Excluir</Button>
                  <Button
                    onClick={() => setRegister({ ...register, second: false })}
                  >
                    Calcelar
                  </Button>
                </section>
              </aside>
            </form>
          )}
        </section>
        <section className="caracteristicas">
          <h2>Projetos</h2>

          {!register.third ? (
            <div className="experiencias">
              {dataProjects.map((experience) => (
                <div
                  key={Math.floor(Math.random() * (99999 - 0 + 1) + 1)}
                  className="experiencia-cadastrada"
                >
                  <section className="icones">
                    <img src={edit} alt="editar experiencia" />
                    <img src={trash} alt="apagar experiencia" />
                  </section>
                  <fieldset className="info-experiencias">
                    <legend>{experience.name}</legend>
                    <p>
                      {experience.institution} | {experience.office}
                    </p>
                    {experience.current ? (
                      <text>
                        <p>Projeto em andamento</p>
                        <p>
                          {experience.initialMonth} de {experience.initialYear}{" "}
                          - Até o momento
                        </p>
                      </text>
                    ) : (
                      <text>
                        <p>
                          {experience.initialMonth} de {experience.initialYear}{" "}
                          - {experience.finalMonth} de {experience.finalYear}
                        </p>
                        <p>Projeto finalizado</p>
                      </text>
                    )}
                  </fieldset>
                </div>
              ))}
              <button onClick={() => setRegister({ ...register, third: true })}>
                <span>+ </span>
                Adicionar
              </button>
            </div>
          ) : (
            <form className="form--experiencia" onSubmit={handleProjectSubmit}>
              <aside className="area-registro">
                <section className="bloco-um">
                  <Input
                    label="Nome do projeto"
                    name="projectName"
                    onChange={handleProjectInputChange}
                  />
                  {/* 
                   COMMENT
                   Is this gonna be used ? As i don't recall the project having an institution
                  <Input
                    label="Instituição de execução"
                    name=""
                    // onChange={handleInputChange}
                  /> */}
                </section>
                <section className="bloco-dois">
                  <Select
                    label="Situação"
                    name="situation"
                    options={vinculos}
                    defaultOption="Selecione"
                  />
  
                  <Input
                    label="Cargo"
                    name="position"
                    onChange={handleProjectInputChange}
                  />
                </section>
                <section className="bloco-tres">
                  <aside>
                    {/*
                      COMMENT 
                      I'll keep this, but this is not how the backend was structured
                      As it was structured to be a full date, we may have to just change it
                      to be a string instead, but it will be more demanding to make queries by year
                    */}
                    <Select
                      label="Mês incial"
                      name="initialMonth"
                      options={monthOptions}
                      defaultOption="Selecione"
                      // onChange={handleProjectSelectChange}
                    />
                    <Select
                      label="Ano incial"
                      name="initialYear"
                      options={yearOptions}
                      defaultOption="Selecione"
                      onChange={handleProjectSelectChange}
                      value={projectFormData.initialYear}
                    />
                  </aside>
                  <aside>
                    <ToggleSwitch
                      label="Estou nesse projeto atualmente"
                      name="currentlyWorking"
                    />
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
                      name="finalYear"
                      options={yearOptions}
                      defaultOption="Selecione"
                      onChange={handleProjectSelectChange}
                      value={projectFormData.finalYear}
                    />
                  </aside>
                </section>
                <section className="bloco-quatro">
                  <Textarea
                    name="details"
                    label="Detalhes"
                    onChange={handleProjectTextAreaChange}
                  />
                </section>
                <section className="area-botoes">
                  <Button type="submit" >Salvar</Button>
                  <Button>Excluir</Button>
                  <Button
                    onClick={() => setRegister({ ...register, third: false })}
                  >
                    Calcelar
                  </Button>
                </section>
              </aside>
            </form>
          )}
        </section>
        <footer>
          <Button>Pular</Button>{" "}
          <Button
            onClick={() => {
              history.push("/experienceareas");
            }}
          >
            Continuar
          </Button>
        </footer>
      </div>
    </BodyProfileFeatures>
  );
}
export default ProfileFeatures;
