
import React, { ChangeEvent, FormEvent, useState, useCallback, OptionHTMLAttributes } from 'react';
import Input from '../Input';
import Textarea from '../Textarea';
import Select from '../Select';
import ToggleSwitch from '../ToggleSwitch';
import Button from '../Button';
import { BodyExperiences } from './styles';
import { inputChange } from "../../utils/inputChange";
import { selectChange } from "../../utils/selectChange";
import { textareaChange } from "../../utils/textareaChange";
import { yearOptions, monthOptions } from "../../utils/dates";
import axios, { AxiosError } from "axios";

const ProjectExperiences: React.FC = () => {

  const [register, setRegister] = useState<boolean>(false)
  const situacao: OptionHTMLAttributes<HTMLOptionElement>[] = [
    { label: "Desativado", value: "desativado" },
    { label: "Em andamento", value: "em andamento" },
    { label: "Conluído", value: "conluido" },
  ];

  const [projectFormData, setProjectFormData] = useState({
    position: "",
    projectName: "",
    initialYear: "",
    finalYear: "",
    initialMonth: "",
    finalMonth: "",
    details: "",
    situacao: "",
    currentProject: false,
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

  async function handleProjectSubmit(event: FormEvent) {
    event.preventDefault();

    const {
      currentProject,
      projectName,
      position,
      details,
      finalYear,
      initialYear,
      finalMonth,
      initialMonth,
      situacao,
    }: {
      projectName: string;
      details: string;
      currentProject: boolean;
      position: string;
      situacao: string;
      initialYear: string;
      initialMonth: string;
      // Supressing "The operand of a 'delete' operator must be optional" warning
      finalYear: any;
      finalMonth: any;
    } = projectFormData;

    let data_fim;
    const data_inicio = `${initialYear}-${initialMonth}-01`;

    if (!currentProject) {
      data_fim = `${finalYear}-${finalMonth}-01`;
    }

    const data = {
      nome: projectName,
      descricao: details,
      data_inicio,
      data_fim,
      cargo: position,
      situacao,
    };

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

  return (
    <BodyExperiences>
      <h2>Projetos</h2>

      {!register ? (
        <div className="experiencias">
          <button onClick={() => setRegister(true)}>
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
            </section>
            <section className="bloco-dois">
              <Select
                label="Situação"
                name="situacao"
                options={situacao}
                defaultOption="Selecione"
                onChange={handleProjectSelectChange}
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
                  label="Mês inicial"
                  name="initialMonth"
                  options={monthOptions}
                  defaultOption="Selecione"
                  onChange={handleProjectSelectChange}
                />
                <Select
                  label="Ano inicial"
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
                  name="currentProject"
                  id="currentProject"
                  onChange={handleProjectInputChange}
                />
              </aside>
              {!projectFormData.currentProject && (
                <aside>
                  <Select
                    label="Mês final"
                    name="finalMonth"
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
              )}
            </section>
            <section className="bloco-quatro">
              <Textarea
                name="details"
                label="Detalhes"
                onChange={handleProjectTextAreaChange}
              />
            </section>
            <section className="area-botoes">
              <Button type="submit" theme="primary-green">
                Salvar
              </Button>
              <Button theme="secondary-green">Excluir</Button>
              <Button onClick={() => setRegister(false)} theme="primary-green">
                Cancelar
              </Button>
            </section>
          </aside>
        </form>
      )}
    </BodyExperiences>
  );
};

export default ProjectExperiences;
