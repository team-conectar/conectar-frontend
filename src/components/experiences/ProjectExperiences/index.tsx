
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
import { yearOptions, monthOptions, toMonth, finalYearOptions } from "../../../utils/dates";
import { AxiosError } from "axios";
import api from "../../../services/api";
import edit from '../../../assets/icon/editar.svg';
import trash from '../../../assets/icon/lixeira.svg';
import Modal from "../../Modal";
interface ProjectType {
  id: number;
  nome: string,
  descricao: string,
  data_inicio: string,
  data_fim: string,
  cargo: string,
  situacao: string,
}
interface ProjectDataType {
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
}
const ProjectExperiences: React.FC = () => {

  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [projectRecords, setProjectRecords] = useState<ProjectType[]>([]);
  // gets the editing experience id
  const [editingId, setEditingId] = useState<number>(0);
  const initialProjectData = {
    nome: "",
    descricao: "",
    cargo: "",
    situacao: "",
    initialYear: "",
    initialMonth: "",
    currentProject: false,
  } as ProjectDataType;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [experienceExcluded, setExperienceExcluded] = useState({
    id: 0,
    nome: "",
  })
  const [projectFormData, setProjectFormData] = useState(initialProjectData);
  const situacao: OptionHTMLAttributes<HTMLOptionElement>[] = [
    { label: "Desativado", value: "Desativado" },
    { label: "Em andamento", value: "Em andamento" },
    { label: "Conluído", value: "Conluído" },
  ];
  useEffect(() => {
    api
      .get("/api/v1/experiencias/projeto/me", {
        withCredentials: true,
      })
      .then(response => {
        setProjectRecords(response.data);
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
  }, [editingId, showRegister, openModal]);
  async function handleDeleteExperience(id: number) {
    if (projectRecords.length === 1) {
      projectRecords.splice(0, 1);
    }
    await api
      .delete(`/api/v1/experiencias/projeto/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        setShowRegister(false);
        setOpenModal(false);
        setEditingId(0);
        setProjectFormData(initialProjectData);
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });


  }
  /**
   * The useCallback hook will act as the bind method so we can
   * use the generalized function in this scope. Note that memoization
   * doesn't actually improve performance here
   * reference: https://reactjs.org/docs/hooks-reference.html#usecallback
   */

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
    }: ProjectDataType = projectFormData;
    //setting to null because if there a update an experience with an existing data_fim it will not send
    let data_fim = null;
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
    console.log(data);
    /**
     * Sends data to backend
     * It's important to notice the withCredentials being true here
     * so it will send the JWT token as cookie
     * */
    const res = editingId
      ? await api
        .put(`/api/v1/experiencias/projeto/${editingId}`, data, {
          withCredentials: true,
        })
        .then(() => {
          setShowRegister(false);
          setEditingId(0);
          setProjectFormData(initialProjectData);
        })
        .catch((err: AxiosError) => {
          // Returns error message from backend
          return err?.response?.data.detail;
        })
      : await api
        .post("/api/v1/experiencias/projeto", data, {
          withCredentials: true,
        })
        .then(() => {
          setShowRegister(false);
          setEditingId(0);
          setProjectFormData(initialProjectData);
        })
        .catch((err: AxiosError) => {
          // Returns error message from backend
          return err?.response?.data.detail;
        });
    console.log(res);

    // Do something
  }
  function handleEditExperience(experience: ProjectType) {
    const {
      id,
      nome,
      descricao,
      data_inicio,
      data_fim,
      cargo,
      situacao,
    }: ProjectType = experience;

    const [initialYear, initialMonth] = data_inicio.split("-");

    const data = {
      nome,
      cargo,
      descricao,
      initialYear,
      initialMonth,
      situacao,
      currentProject: data_fim ? false : true,
      finalYear: data_fim ? data_fim.split("-")[0] : data_fim,
      finalMonth: data_fim ? data_fim.split("-")[1] : data_fim,
    };


    setShowRegister(true);
    setEditingId(id);
    setProjectFormData(data);

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

  function handleProjectInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleInputChange(
      event,
      setProjectFormData,
      projectFormData
    );
  }
  function handleProjectSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    handleSelectChange(
      event,
      setProjectFormData,
      projectFormData
    );
  }
  function handleProjectTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    handleTextAreaChange(
      event,
      setProjectFormData,
      projectFormData
    );
  }

  return (
    <BodyExperiences>
      <Modal setOpen={setOpenModal} open={openModal}>
        <h1>Deseja realmente excluir {experienceExcluded?.nome}?</h1>
        <footer>
          <Button
            theme="primary-yellow"
            onClick={() => experienceExcluded && handleDeleteExperience(experienceExcluded?.id)}
          >
            Excluir
          </Button>
          <Button
            theme="secondary-yellow"
            onClick={() => setOpenModal(false)}
          >
            Manter
          </Button>
        </footer>
      </Modal>
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
                  onClick={() => handleEditExperience(experience)}
                />
                <img
                  src={trash}
                  alt="apagar experiencia"
                  onClick={() => {
                    setOpenModal(true);
                    setExperienceExcluded(experience);
                  }}
                />
              </section>
              <fieldset className="info-experiencias">
                <legend>
                  {`${experience.cargo} | ${experience.nome}`}
                </legend>

                <p>
                  {experience.situacao} <br />
                  {`
                  ${toMonth(experience.data_inicio.split("-")[1])} 
                  de 
                  ${experience.data_inicio.split("-")[0]} 
                  até 
                  ${experience.data_fim ? `
                      ${toMonth(experience.data_fim.split("-")[1])} 
                      de 
                      ${experience.data_fim.split("-")[0]}
                    ` :
                      "o momento atual"}
                  `}
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
          <form
            className="form--experiencia"
            onSubmit={handleProjectSubmit}
          >
            <aside className="area-registro">
              <section className="bloco-um">
                <Input
                  mask=""
                  label="Nome do projeto"
                  name="nome"
                  onChange={handleProjectInputChange}
                  defaultValue={projectFormData?.nome}
                  required
                />
              </section>
              <section className="bloco-dois">
                <Select
                  label="Situação"
                  name="situacao"
                  options={situacao}
                  onChange={handleProjectSelectChange}
                  defaultOption={projectFormData?.situacao || "Selecione"}
                  required
                />

                <Input
                  mask=""
                  label="Cargo"
                  name="cargo"
                  onChange={handleProjectInputChange}
                  defaultValue={projectFormData?.cargo}
                  required
                />
              </section>
              <section className="bloco-tres">
                <aside>
                  <Select
                    label="Mês inicial"
                    name="initialMonth"
                    options={monthOptions}
                    onChange={handleProjectSelectChange}
                    defaultOption={toMonth(projectFormData?.initialMonth) || "Selecione"}
                    required
                  />
                  <Select
                    label="Ano inicial"
                    name="initialYear"
                    options={yearOptions}
                    onChange={handleProjectSelectChange}
                    defaultOption={projectFormData?.initialYear || "Selecione"}
                    required
                  />
                </aside>
                <aside>
                  <ToggleSwitch
                    label="Estou nesse projeto atualmente"
                    name="currentProject"
                    id="currentProject"
                    onChange={handleProjectInputChange}
                    defaultChecked={projectFormData?.currentProject}
                  />
                </aside>
                {!projectFormData.currentProject && (
                  <aside>
                    <Select
                      label="Mês final"
                      name="finalMonth"
                      options={monthOptions}
                      onChange={handleProjectSelectChange}
                      defaultOption={toMonth(projectFormData?.finalMonth) || "Selecione"}
                      required
                    />
                    <Select
                      label="Ano final"
                      name="finalYear"
                      options={finalYearOptions(Number(projectFormData.initialYear))}
                      onChange={handleProjectSelectChange}
                      defaultOption={
                        Number(projectFormData?.finalYear) > Number(projectFormData?.initialYear)
                          ? projectFormData.finalYear
                          : "Selecione"
                      }
                      required
                    />
                  </aside>
                )}
              </section>
              <section className="bloco-quatro">
                <Textarea
                  name="descricao"
                  label="Detalhes"
                  onChange={handleProjectTextAreaChange}
                  defaultValue={projectFormData?.descricao}
                  required
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
                  onClick={
                    editingId > 0
                      ? () => {
                        setOpenModal(true);
                        setExperienceExcluded({ ...projectFormData, "id": editingId })
                      }
                      : () => setShowRegister(false)
                  }
                >Excluir</Button>
                <Button
                  onClick={() => {
                    setShowRegister(false);
                    setEditingId(0);
                    setProjectFormData(initialProjectData)
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
