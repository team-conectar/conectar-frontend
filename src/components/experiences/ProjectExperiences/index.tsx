
import React, { ChangeEvent, FormEvent, useState, useCallback, useEffect, OptionHTMLAttributes } from 'react';
import Input from '../../Input';
import Textarea from '../../Textarea';
import Select from '../../Select';
import ToggleSwitch from '../../ToggleSwitch';
import Button from '../../Button';
import { BodyExperiences } from '../styles';
import { inputChange } from "../../../utils/inputChange";
import { selectChange } from "../../../utils/selectChange";
import { textareaChange } from "../../../utils/textareaChange";
import { yearOptions, monthOptions } from "../../../utils/dates";
import axios, { AxiosError } from "axios";
import edit from '../../../assets/icon/editar.svg';
import trash from '../../../assets/icon/lixeira.svg';
interface ProjectType {
  id?: number;
  nome: string,
  descricao: string,
  data_inicio: string,
  data_fim: string,
  cargo: string,
  situacao: string,
}
const ProjectExperiences: React.FC = () => {

  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [tempEditExperience, setTempEditExperience] = useState<ProjectType>();
  const [projectRecords, setProjectRecords] = useState<ProjectType[]>([]);
  const [control, setControl] = useState<number>(0);
  const [projectFormData, setProjectFormData] = useState({
    cargo: "",
    nome: "",
    initialYear: "",
    finalYear: "",
    initialMonth: "",
    finalMonth: "",
    descricao: "",
    situacao: "",
    currentProject: false,
  });
  const situacao: OptionHTMLAttributes<HTMLOptionElement>[] = [
    { label: "Desativado", value: "Desativado" },
    { label: "Em andamento", value: "Em andamento" },
    { label: "Conluído", value: "Conluído" },
  ];
  useEffect(() => {
    axios
      .get("/api/v1/experiencias/projeto/me")
      .then(response => {
        setProjectRecords(response.data);
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
  }, [control]);
  async function handleDeleteExperienceRecord(id: any) {
    if (projectRecords.length === 1) {
      projectRecords.splice(0, 1);
    }
    // projectRecords.splice(
    //   projectRecords.indexOf(
    //     projectRecords.filter((experiencia) => {
    //       return experiencia.id === id
    //     })[0]
    //   ), 1
    // )
    await axios.delete(`/api/v1/experiencias/projeto/${id}`, {
      withCredentials: true,
    });
    setControl(control + 1);
    setShowRegister(false);

  }
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
      nome,
      cargo,
      descricao,
      finalYear,
      initialYear,
      finalMonth,
      initialMonth,
      situacao,
    }: {
      nome: string;
      descricao: string;
      currentProject: boolean;
      cargo: string;
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
      nome,
      descricao,
      data_inicio,
      data_fim,
      cargo,
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
    setControl(control + 1);
    setShowRegister(false);
    // Do something
  }
  async function handlePutExperience(event: FormEvent) {
    event.preventDefault();
    await axios.put(`/api/v1/experiencias/projeto/${tempEditExperience?.id}`, tempEditExperience, {
      withCredentials: true,
    });

    setTempEditExperience({} as ProjectType);
    setControl(control + 1);
    setShowRegister(false);
  }
  function handleProjectInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleInputChange(
      event,
      tempEditExperience?.nome ? setTempEditExperience : setProjectFormData,
      tempEditExperience?.nome ? tempEditExperience : projectFormData
    );
  }
  function handleProjectSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    handleSelectChange(
      event,
      tempEditExperience?.nome ? setTempEditExperience : setProjectFormData,
      tempEditExperience?.nome ? tempEditExperience : projectFormData
    );
  }
  function handleProjectTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    handleTextAreaChange(
      event,
      tempEditExperience?.nome ? setTempEditExperience : setProjectFormData,
      tempEditExperience?.nome ? tempEditExperience : projectFormData
    );
  }

  return (
    <BodyExperiences>
      <h2>Projetos</h2>

      {!showRegister ? (
        <div className="experiencias">
          {projectRecords?.map((experience: ProjectType) => (
            <div
              key={experience.id}
              className="experiencia-cadastrada"
            >
              <section className="icones">
                <img
                  src={edit}
                  alt="editar experiencia"
                  onClick={() => {
                    setTempEditExperience(experience);
                    setShowRegister(true);
                  }}
                />
                <img
                  src={trash}
                  alt="apagar experiencia"
                  onClick={() => handleDeleteExperienceRecord(experience.id)}
                />
              </section>
              <fieldset className="info-experiencias">
                <legend>
                  {`${experience.cargo} | ${experience.nome}`}
                </legend>
                <p>
                  {experience.situacao} <br />
                  {experience.descricao} <br />
                  {`${experience.data_inicio} até ${experience.situacao === "Em andamento"? "o presente momento":experience.data_fim}`}
                </p>

              </fieldset>
            </div>
          ))}
          <button onClick={() => setShowRegister(true)}>
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
                  name="nome"
                  onChange={handleProjectInputChange}
                  defaultValue={tempEditExperience?.nome}
                />
              </section>
              <section className="bloco-dois">
                <Select
                  label="Situação"
                  name="situacao"
                  options={situacao}
                  defaultOption={tempEditExperience?.situacao || "Selecione"}
                  onChange={handleProjectSelectChange}
                />

                <Input
                  label="Cargo"
                  name="cargo"
                  onChange={handleProjectInputChange}
                  defaultValue={tempEditExperience?.cargo}
                />
              </section>
              <section className="bloco-tres">
                <aside>
                  <Select
                    label="Mês inicial"
                    name="initialMonth"
                    options={monthOptions}
                    defaultOption={tempEditExperience?.data_inicio || "Selecione"}
                    onChange={handleProjectSelectChange}
                  />
                  <Select
                    label="Ano inicial"
                    name="initialYear"
                    options={yearOptions}
                    defaultOption={tempEditExperience?.data_inicio || "Selecione"}
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
                    defaultChecked={tempEditExperience?.data_fim ? true : false}
                  />
                </aside>
                {!projectFormData.currentProject && (
                  <aside>
                    <Select
                      label="Mês final"
                      name="finalMonth"
                      options={monthOptions}
                      defaultOption={tempEditExperience?.data_inicio || "Selecione"}
                    />
                    <Select
                      label="Ano final"
                      name="finalYear"
                      options={yearOptions}
                      defaultOption={tempEditExperience?.data_inicio || "Selecione"}
                      onChange={handleProjectSelectChange}
                      value={projectFormData.finalYear}
                    />
                  </aside>
                )}
              </section>
              <section className="bloco-quatro">
                <Textarea
                  name="descricao"
                  label="Detalhes"
                  onChange={handleProjectTextAreaChange}
                  defaultValue={tempEditExperience?.descricao}
                />
              </section>
              <section className="area-botoes">
                <Button
                  type="submit"
                  theme="primary-green"
                //disabled={academicFormData === {} as AcademicType? false:true}
                >Salvar</Button>
                <Button
                  theme="secondary-green"
                  onClick={() => {
                    tempEditExperience ? handleDeleteExperienceRecord(tempEditExperience.id) : setShowRegister(false)
                  }}
                >Excluir</Button>
                <Button
                  onClick={() => {
                    setShowRegister(false)
                    setTempEditExperience({} as ProjectType)
                  }}
                >
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
