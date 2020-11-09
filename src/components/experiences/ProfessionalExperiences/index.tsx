import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useCallback,
  OptionHTMLAttributes,
} from "react";
import Input from "../../Input";
import Textarea from "../../Textarea";
import Select from "../../Select";
import ToggleSwitch from "../../ToggleSwitch";
import Button from "../../Button";
import { BodyExperiences } from "../styles";
import { inputChange } from "../../../utils/inputChange";
import { selectChange } from "../../../utils/selectChange";
import { textareaChange } from "../../../utils/textareaChange";
import { yearOptions, monthOptions, toMonth, finalYearOptions } from "../../../utils/dates";
import  { AxiosError } from "axios";
import api from "../../../services/api";
import edit from "../../../assets/icon/editar.svg";
import trash from "../../../assets/icon/lixeira.svg";
import Modal from "../../Modal";
interface ProfessionalType {
  id: number;
  organizacao: string;
  descricao: string;
  data_inicio: string;
  data_fim: string;
  cargo: string;
  vinculo: string;
}
interface ProfessionalDataType {
  vinculo: string;
  currentWorking: boolean;
  cargo: string;
  organizacao: string;
  descricao: string;
  initialYear: string;
  initialMonth: string;
  // Supressing "The operand of a 'delete' operator must be optional" warning
  finalYear: any;
  finalMonth: any;
}
const ProfessionalExperiences: React.FC = () => {
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [professionalRecords, setProfessionalRecords] = useState<ProfessionalType[]>([]);
  // gets the editing experience id
  const [editingId, setEditingId] = useState<number>(0);
  const initialProfessionalData = {
    currentWorking: false,
  } as ProfessionalDataType;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [experienceExcluded, setExperienceExcluded] = useState({
    id: 0,
    nome: "",
  })
  const [professionalFormData, setProfessionalFormData] = useState(initialProfessionalData);
  const vinculos: OptionHTMLAttributes<HTMLOptionElement>[] = [
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
  useEffect(() => {
    api
      .get("/api/v1/experiencias/profissional/me", {
        withCredentials: true,
      })
      .then((response) => {
        setProfessionalRecords(response.data);
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
  }, [showRegister, editingId, openModal]);
  async function handleDeleteExperience(id: number) {
    if (professionalRecords.length === 1) {
      professionalRecords.splice(0, 1);
    }
    await api.delete(`/api/v1/experiencias/profissional/${id}`, {
      withCredentials: true,
    })
      .then(() => {
        setShowRegister(false);
        setOpenModal(false);
        setEditingId(0);
        setProfessionalFormData(initialProfessionalData);
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });

  }


  async function handleProfessionalSubmit(event: FormEvent) {
    event.preventDefault();

    const {
      vinculo,
      currentWorking,
      organizacao,
      cargo,
      descricao,
      finalYear,
      initialYear,
      initialMonth,
      finalMonth,
    }: ProfessionalDataType = professionalFormData;
    //setting to null because if there a update an experience with an existing data_fim it will not send
    let data_fim = null;
    const data_inicio = `${initialYear}-${initialMonth}-01`;

    if (!currentWorking) {
      data_fim = `${finalYear}-${finalMonth}-01`;
    }

    const data = {
      organizacao,
      descricao,
      data_inicio,
      data_fim,
      cargo,
      vinculo,
    };

    /**
     * Sends data to backend
     * It's important to notice the withCredentials being true here
     * so it will send the JWT token as cookie
     * */
    const res = editingId
      ? await api
        .put(
          `/api/v1/experiencias/profissional/${editingId}`, data, {
          withCredentials: true,
        })
        .then(() => {
          setShowRegister(false);
          setEditingId(0);
          setProfessionalFormData(initialProfessionalData);
        })
        .catch((err: AxiosError) => {
          // Returns error message from backend
          return err?.response?.data.detail;
        })
      : await api
        .post("/api/v1/experiencias/profissional", data, {
          withCredentials: true,
        })
        .then(() => {
          setShowRegister(false);
          setEditingId(0);
          setProfessionalFormData(initialProfessionalData);
        })
        .catch((err: AxiosError) => {
          // Returns error message from backend
          return err?.response?.data.detail;
        });

    console.log(res);

    // Do something
  }
  function handleEditExperience(experience: ProfessionalType) {

    const {
      id,
      organizacao,
      descricao,
      data_inicio,
      data_fim,
      cargo,
      vinculo,
    }: ProfessionalType = experience;

    const [initialYear, initialMonth] = data_inicio.split("-");

    const data = {
      vinculo,
      organizacao,
      cargo,
      descricao,
      initialYear,
      initialMonth,
      currentWorking: data_fim ? false : true,
      finalYear: data_fim ? data_fim.split("-")[0] : data_fim,
      finalMonth: data_fim ? data_fim.split("-")[1] : data_fim,
    };


    setShowRegister(true);
    setEditingId(id);
    setProfessionalFormData(data);

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
  function handleProfessionalInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleInputChange(
      event,
      setProfessionalFormData,
      professionalFormData
    );
  }
  function handleProfessionalSelectChange(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    handleSelectChange(
      event,
      setProfessionalFormData,
      professionalFormData
    );
  }
  function handleProfessionalTextAreaChange(
    event: ChangeEvent<HTMLTextAreaElement>
  ) {
    handleTextAreaChange(
      event,
      setProfessionalFormData,
      professionalFormData
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
      <h2>Atuação Profissional</h2>
      {!showRegister ? (
        <div className="experiencias">
          {professionalRecords?.map((experience: ProfessionalType) => (
            <div key={experience.id} className="experiencia-cadastrada">
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
                    setExperienceExcluded({ ...experience, "nome": experience.cargo });
                  }}
                />
              </section>
              <fieldset className="info-experiencias">
                <legend>
                  {`${experience.cargo} | ${experience.organizacao}`}
                </legend>
                <p>
                  {experience.vinculo} <br />
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
                  `} <br />
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
            onSubmit={handleProfessionalSubmit}
          >
            <aside className="area-registro">
              <section className="bloco-um">
                <Input
                  mask=""
                  label="Organização"
                  name="organizacao"
                  onChange={handleProfessionalInputChange}
                  defaultValue={professionalFormData?.organizacao}
                  required
                />
                <Input
                  mask=""
                  label="Cargo"
                  name="cargo"
                  onChange={handleProfessionalInputChange}
                  defaultValue={professionalFormData?.cargo}
                  required
                />
              </section>
              <section className="bloco-dois">
                <Select
                  label="Vínculo"
                  name="vinculo"
                  options={vinculos}
                  defaultOption={professionalFormData?.vinculo || "Selecione"}
                  onChange={handleProfessionalSelectChange}
                  required
                />
              </section>
              <section className="bloco-tres">
                <aside>
                  <Select
                    label="Mês inicial"
                    name="initialMonth"
                    options={monthOptions}
                    defaultOption={toMonth(professionalFormData.initialMonth) || "Selecione"}
                    onChange={handleProfessionalSelectChange}
                    required
                  />
                  <Select
                    label="Ano inicial"
                    name="initialYear"
                    options={yearOptions}
                    defaultOption={professionalFormData?.initialYear || "Selecione"}
                    onChange={handleProfessionalSelectChange}
                    required
                  />
                </aside>
                <aside>
                  <ToggleSwitch
                    label="Trabalho atual"
                    name="currentWorking"
                    id="currentWorking"
                    onChange={handleProfessionalInputChange}
                    defaultChecked={professionalFormData?.currentWorking}
                  />
                </aside>
                {console.log(professionalFormData?.finalYear)}
                {!professionalFormData.currentWorking && (
                  <aside>
                    <Select
                      label="Mês final"
                      name="finalMonth"
                      options={monthOptions}
                      defaultOption={toMonth(professionalFormData?.finalMonth) || "Selecione"}
                      onChange={handleProfessionalSelectChange}
                      required
                    />
                    <Select
                      label="Ano final"
                      name="finalYear"
                      options={finalYearOptions(Number(professionalFormData.initialYear))}
                      defaultOption={Number(professionalFormData?.finalYear) > Number(professionalFormData?.initialYear) ? professionalFormData.finalYear : "Selecione"}
                      onChange={handleProfessionalSelectChange}
                      required
                    />
                  </aside>
                )}
              </section>
              <section className="bloco-quatro">
                <Textarea
                  name="descricao"
                  label="Detalhes"
                  onChange={handleProfessionalTextAreaChange}
                  defaultValue={professionalFormData?.descricao}
                  required
                />
              </section>
              <section className="area-botoes">
                <Button
                  type="submit"
                  theme="primary-green"
                //disabled={academicFormData === {} as AcademicType? false:true}
                >
                  Salvar
              </Button>
                <Button
                  theme="secondary-green"
                  onClick={
                    editingId > 0
                      ? () => {
                        setOpenModal(true);
                        setExperienceExcluded({ "nome": professionalFormData.cargo, "id": editingId })
                      }
                      : () => setShowRegister(false)
                  }
                >
                  Excluir
              </Button>
                <Button
                  onClick={() => {
                    setShowRegister(false);
                    setProfessionalFormData(initialProfessionalData);
                    setEditingId(0);
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

export default ProfessionalExperiences;
