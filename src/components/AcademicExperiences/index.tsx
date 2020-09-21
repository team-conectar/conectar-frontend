import React, { ChangeEvent, FormEvent, useState, useCallback } from 'react';
import Input from '../Input';
import Textarea from '../Textarea';
import Select, { OptionsTypes } from '../Select';
import ToggleSwitch from '../ToggleSwitch';
import Button from '../Button';
import { BodyExperiences } from './styles';
import { inputChange } from "../../utils/inputChange";
import { selectChange } from "../../utils/selectChange";
import { textareaChange } from "../../utils/textareaChange";
import { yearOptions } from "../../utils/dates";
import axios, { AxiosError } from "axios";

const AcademicExperiences: React.FC = () => {
  const [register, setRegister] = useState<boolean>(false)
  const niveisFormacao: OptionsTypes[] = [
    { label: "Ensino Fundamental", value: "Ensino Fundamental" },
    { label: "Ensino Médio", value: "Ensino Médio" },
    { label: "Ensino Técnico", value: "Ensino Técnico" },
    { label: "Graduação", value: "Graduação" },
    { label: "Mestrado", value: "Mestrado" },
    { label: "Mestrado Profissional", value: "Mestrado Profissional" },
    { label: "Doutorado", value: "Doutorado" },
    { label: "Especialização", value: "Especialização" },
    { label: "Residência Médica", value: "Residência Médica" },
    { label: "Aperfeiçoamento", value: "Aperfeiçoamento" },
  ];
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
  const [academicFormData, setAcademicFormData] = useState({
    institution: "",
    schooling: "",
    course: "",
    initialYear: "",
    finalYear: "",
    details: "",
    situacao: "",
  });
  function handleAcademicInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleInputChange(event, setAcademicFormData, academicFormData);
  }
  function handleAcademicSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    handleSelectChange(event, setAcademicFormData, academicFormData);
  }
  function handleAcademicTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    handleTextAreaChange(event, setAcademicFormData, academicFormData);
  }
  return (
    <BodyExperiences>



      <h2>Educação</h2>

      {!register ? (
        <div className="experiencias">
          {//dataProjects.map((experience) => (
            /**
             * We need to find an actual key for this
             */
            // <div
            //   key={Math.floor(Math.random() * (99999 - 0 + 1) + 1)}
            //   className="experiencia-cadastrada"
            // >
            //   <section className="icones">
            //     <img src={edit} alt="editar experiencia" />
            //     <img src={trash} alt="apagar experiencia" />
            //   </section>
            //   <fieldset className="info-experiencias">
            //     <legend>{experience.name}</legend>
            //     <p>
            //       {experience.institution} | {experience.office}
            //     </p>
            //     {experience.current ? (
            //       /**
            //        * COMMENT
            //        * Interestingly, there's no reference to an text tag for html5
            //        * and its referenced as an SVGElement on React
            //        * */
            //       <p>
            //         <p>Projeto em andamento</p>
            //         <p>
            //           {experience.initialMonth} de {experience.initialYear}{" "}
            //             - Até o momento
            //           </p>
            //       </p>
            //     ) : (
            //         <p>
            //           <p>
            //             {experience.initialMonth} de {experience.initialYear}{" "}
            //             - {experience.finalMonth} de {experience.finalYear}
            //           </p>
            //           <p>Projeto finalizado</p>
            //         </p>
            //       )}
            //   </fieldset>
            // </div>
            // ))
          }

          <button onClick={() => setRegister(true)}>
            <span>+ </span>
                Adicionar
              </button>
        </div>
      ) : (

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
                  options={niveisFormacao}
                  defaultOption="Selecione"
                  onChange={handleAcademicSelectChange}
                  value={academicFormData.schooling}
                />
                <aside>
                  <Select
                    label="Ano inicial"
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
              <section className="bloco-tres area-toggle">
                <ToggleSwitch
                  label="Incompleto"
                  name="situation"
                  type="radio"
                  value="incomplete"
                  id="incomplete"
                  onChange={handleAcademicInputChange}
                />
                <ToggleSwitch
                  label="Em andameAcademicnto"
                  name="situation"
                  type="radio"
                  onChange={handleAcademicInputChange}
                  value="current"
                  id="current"
                />
                <ToggleSwitch
                  label="Concluído"
                  name="situation"
                  type="radio"
                  value="finished"
                  id="finished"
                  onChange={handleAcademicInputChange}
                />

              </section>
              <section className="bloco-quatro">
                <Textarea
                  name="details"
                  label="Detalhes"
                  required
                  onChange={handleAcademicTextAreaChange}
                />
              </section>
              <section className="area-botoes">
                <Button
                  type="submit"
                  theme="primary-green"
                >Salvar</Button>
                <Button
                  theme="secondary-green"
                >Excluir</Button>
                <Button
                  onClick={() => setRegister(false)}
                >
                  Cancelar
                  </Button>
              </section>
            </aside>
          </form>
        )}


    </BodyExperiences>

  )

}

export default AcademicExperiences;