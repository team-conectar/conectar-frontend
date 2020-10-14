import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useCallback,
  useEffect,
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
import { yearOptions } from "../../../utils/dates";
import axios, { AxiosError } from "axios";
import edit from "../../../assets/icon/editar.svg";
import trash from "../../../assets/icon/lixeira.svg";

/**
 * As this type is used from data that comes from the backend, it comes with
 * data_fim and data_inicio, but we need data_inicial and data_final as placeholders
 * so we can create a full date from it and modify the state properly
 */
interface AcademicType {
  id?: number;
  instituicao: string;
  escolaridade: string;
  curso: string;
  situacao: string;
  descricao: string;
  data_inicial: any;
  data_final?: any;
  data_inicio?: string;
  data_fim?: string;
}

const AcademicExperiences: React.FC = () => {
  const [showRegister, setShowRegister] = useState<boolean>(false);
  // Add initial state so we can modify it with ease
  const [tempEditExperience, setTempEditExperience] = useState<AcademicType>({
    instituicao: "",
    curso: "",
    escolaridade: "",
    situacao: "",
    descricao: "",
    data_inicial: "",
  });
  const [academicRecords, setAcademicRecords] = useState<AcademicType[]>([]);
  const [control, setControl] = useState<number>(0);
  const niveisFormacao: OptionHTMLAttributes<HTMLOptionElement>[] = [
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
  const [academicFormData, setAcademicFormData] = useState({
    instituicao: "",
    escolaridade: "",
    curso: "",
    data_inicial: "",
    data_final: "",
    descricao: "",
    situacao: "",
  });
  useEffect(() => {
    axios
      .get("/api/v1/experiencias/academica/me")
      .then((response) => {
        setAcademicRecords(response.data);
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
  }, [control]);
  async function handleDeleteExperienceRecord(id: any) {
    if (academicRecords.length === 1) {
      academicRecords.splice(0, 1);
    }
    // academicRecords.splice(
    //   academicRecords.indexOf(
    //     academicRecords.filter((experiencia) => {
    //       return experiencia.id === id
    //     })[0]
    //   ), 1
    // )
    await axios.delete(`/api/v1/experiencias/academica/${id}`, {
      withCredentials: true,
    });
    setControl(control + 1);
    setShowRegister(false);
  }
  async function handlePutExperience(event: FormEvent) {
    event.preventDefault();

    // Getting changed dates from editing
    let data_inicio;
    if(tempEditExperience.data_inicial) {
      data_inicio = `${tempEditExperience?.data_inicial}-02-01`;
    } else {
      data_inicio = tempEditExperience.data_inicio;
    }
    
    let data_fim;
    let data: AcademicType;

    // Swap data_inicio and data_fim that were gathered from DB with new ones
    if(tempEditExperience?.data_final){
      data_fim = `${tempEditExperience?.data_final}-02-01`;
      data = { ...tempEditExperience, data_inicio, data_fim };
    } else {
      data = { ...tempEditExperience, data_inicio};
    }

    // Deleting placeholders for actual dates
    delete data?.data_inicial;
    delete data?.data_final;
    await axios.put(
      `/api/v1/experiencias/academica/${tempEditExperience?.id}`,
      data,
      {
        withCredentials: true,
      }
    );

    setTempEditExperience({} as AcademicType);
    setControl(control + 1);
    setShowRegister(false);
  }
  async function handleAcademicSubmit(event: FormEvent) {
    event.preventDefault();

    const {
      instituicao,
      escolaridade,
      curso,
      descricao,
      data_final,
      data_inicial,
      situacao,
    }: AcademicType = academicFormData;

    let data_fim;
    if (situacao !== "Incompleto") {
      if (data_final) {
        data_fim = `${data_final}-02-01`;
      }
    }

    const data_inicio = `${data_inicial}-02-01`;

    const data = {
      instituicao,
      descricao,
      data_inicio,
      data_fim,
      escolaridade,
      curso,
      situacao,
    };

    console.table([data]);

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
    console.log(academicFormData);
    setControl(control + 1);
    setShowRegister(false);
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

  function handleAcademicInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleInputChange(
      event,
      tempEditExperience.curso ? setTempEditExperience : setAcademicFormData,
      tempEditExperience.curso ? tempEditExperience : academicFormData
    );
  }
  function handleAcademicSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    handleSelectChange(
      event,
      tempEditExperience.curso ? setTempEditExperience : setAcademicFormData,
      tempEditExperience.curso ? tempEditExperience : academicFormData
    );
  }
  function handleAcademicTextAreaChange(
    event: ChangeEvent<HTMLTextAreaElement>
  ) {
    handleTextAreaChange(
      event,
      tempEditExperience.curso ? setTempEditExperience : setAcademicFormData,
      tempEditExperience.curso ? tempEditExperience : academicFormData
    );
  }
  return (
    <BodyExperiences>
      <h2>Educação</h2>
      {!showRegister ? (
        <div className="experiencias">
          {academicRecords?.map((experience: AcademicType) => (
            <div key={experience.id} className="experiencia-cadastrada">
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
                  {`${experience.escolaridade} em ${experience.curso}`}
                </legend>
                <p>
                  {experience.instituicao} <br />
                  {experience.situacao} <br />
                  {/* 
                      Get only the year from data by spliting the date and getting the first
                      index of the array.
                  */}
                  {`${experience?.data_inicio?.split("-")[0]} até ${
                    experience?.data_fim?.split("-")[0]
                  }`}
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
          onSubmit={
            tempEditExperience.curso ? handlePutExperience : handleAcademicSubmit
          }
        >
          <aside className="area-registro">
            <section className="bloco-um">
              <Input
                label="Instituição de ensino"
                name="instituicao"
                required
                onChange={handleAcademicInputChange}
                defaultValue={tempEditExperience?.instituicao}
              />
              <Input
                label="Curso"
                name="curso"
                required
                onChange={handleAcademicInputChange}
                defaultValue={tempEditExperience?.curso}
              />
            </section>
            <section className="bloco-dois">
              <Select
                label="Nível de formação"
                name="escolaridade"
                required
                options={niveisFormacao}
                defaultOption={
                  tempEditExperience
                    ? tempEditExperience.escolaridade
                    : "Selecione"
                }
                onChange={handleAcademicSelectChange}
                value={academicFormData.escolaridade}
              />
              <aside>
                <Select
                  label="Ano inicial"
                  name="data_inicial"
                  required
                  options={yearOptions}
                  defaultOption={
                    // Getting only the year as string so we can modify it properly
                    tempEditExperience?.data_inicio
                      ? tempEditExperience?.data_inicio.split("-")[0]
                      : "Selecione"
                  }
                  onChange={handleAcademicSelectChange}
                  value={academicFormData.data_inicial}
                />

                <Select
                  label="Ano final"
                  name="data_final"
                  options={yearOptions}
                  required={academicFormData.situacao !== "Incompleto"}
                  defaultOption={
                    tempEditExperience?.data_fim
                      ? tempEditExperience?.data_fim.split("-")[0]
                      : "Selecione"
                  }
                  onChange={handleAcademicSelectChange}
                  value={academicFormData.data_final}
                />
              </aside>
            </section>
            <section className="bloco-tres area-toggle">
              <ToggleSwitch
                label="Incompleto"
                name="situacao"
                type="radio"
                value="Incompleto"
                id="incomplete"
                onChange={handleAcademicInputChange}
                defaultChecked={
                  tempEditExperience &&
                  tempEditExperience?.situacao === "Incompleto"
                }
                required
              />
              <ToggleSwitch
                label="Em andamento"
                name="situacao"
                type="radio"
                onChange={handleAcademicInputChange}
                value="Em andamento"
                id="current"
                defaultChecked={
                  tempEditExperience &&
                  tempEditExperience?.situacao === "Em andamento"
                }
                required
              />
              <ToggleSwitch
                label="Concluído"
                name="situacao"
                type="radio"
                value="Concluído"
                id="finished"
                onChange={handleAcademicInputChange}
                defaultChecked={
                  tempEditExperience &&
                  tempEditExperience?.situacao === "Concluído"
                }
                required
              />
            </section>
            <section className="bloco-quatro">
              <Textarea
                name="descricao"
                label="Detalhes"
                required
                onChange={handleAcademicTextAreaChange}
                defaultValue={tempEditExperience?.descricao}
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
                onClick={() =>
                  tempEditExperience
                    ? handleDeleteExperienceRecord(tempEditExperience.id)
                    : setShowRegister(false)
                }
              >
                Excluir
              </Button>
              <Button
                onClick={() => {
                  setShowRegister(false);
                  setTempEditExperience({} as AcademicType);
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

export default AcademicExperiences;
