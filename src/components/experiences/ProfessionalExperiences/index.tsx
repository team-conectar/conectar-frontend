
import React, { ChangeEvent, FormEvent, useState, useEffect, useCallback, OptionHTMLAttributes } from 'react';
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
interface ProfessionalType {
  id?: number;
  organizacao: string,
  descricao: string,
  data_inicio: string,
  data_fim: string,
  cargo: string,
  vinculo: string,
}

const ProfessionalExperiences: React.FC = () => {
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [tempEditExperience, setTempEditExperience] = useState<ProfessionalType>();
  const [professionalRecords, setProfessionalRecords] = useState<ProfessionalType[]>([]);
  const [control, setControl] = useState<number>(0);
  const [professionalFormData, setProfessionalFormData] = useState({
    organizacao: "",
    vinculo: "",
    cargo: "",
    initialYear: "",
    finalYear: "",
    initialMonth: "",
    finalMonth: "",
    descricao: "",
    currentlyWorking: false,
  });
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
    axios
      .get("/api/v1/experiencias/profissional/me")
      .then(response => {
        setProfessionalRecords(response.data);
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
  }, [control]);
  async function handleDeleteExperienceRecord(id: any) {
    if (professionalRecords.length === 1) {
      professionalRecords.splice(0, 1);
    }
    // professionalRecords.splice(
    //   professionalRecords.indexOf(
    //     professionalRecords.filter((experiencia) => {
    //       return experiencia.id === id
    //     })[0]
    //   ), 1
    // )
    await axios.delete(`/api/v1/experiencias/profissional/${id}`, {
      withCredentials: true,
    });
    setControl(control + 1);
    setShowRegister(false);

  }
  async function handlePutExperience(event: FormEvent) {
    event.preventDefault();
    await axios.put(`/api/v1/experiencias/profissional/${tempEditExperience?.id}`, tempEditExperience, {
      withCredentials: true,
    });

    setTempEditExperience({} as ProfessionalType);
    setControl(control + 1);
    setShowRegister(false);
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
  async function handleProfessionalSubmit(event: FormEvent) {
    event.preventDefault();

    const {
      vinculo,
      currentlyWorking,
      organizacao,
      cargo,
      descricao,
      finalYear,
      initialYear,
      initialMonth,
      finalMonth,
    }: {
      vinculo: string;
      currentlyWorking: boolean;
      cargo: string;
      organizacao: string;
      descricao: string;
      initialYear: string;
      initialMonth: string;
      // Supressing "The operand of a 'delete' operator must be optional" warning
      finalYear: any;
      finalMonth: any;
    } = professionalFormData;

    let data_fim;
    const data_inicio = `${initialYear}-${initialMonth}-01`;

    if (!currentlyWorking) {
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
    const res = await axios
      .post("/api/v1/experiencias/profissional", data, {
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
  function handleProfessionalInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleInputChange(
      event,
      tempEditExperience?.organizacao ? setTempEditExperience : setProfessionalFormData,
      tempEditExperience?.organizacao ? tempEditExperience : professionalFormData
    );
  }
  function handleProfessionalSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    handleSelectChange(
      event,
      tempEditExperience?.organizacao ? setTempEditExperience : setProfessionalFormData,
      tempEditExperience?.organizacao ? tempEditExperience : professionalFormData
    );
  }
  function handleProfessionalTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    handleTextAreaChange(
      event,
      tempEditExperience?.organizacao ? setTempEditExperience : setProfessionalFormData,
      tempEditExperience?.organizacao ? tempEditExperience : professionalFormData
    );
  }
  return (
    <BodyExperiences>
      <h2>Atuação Profissional</h2>
      {!showRegister ? (
        <div className="experiencias">
          {professionalRecords?.map((experience: ProfessionalType) => (
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
                  {`${experience.cargo} | ${experience.organizacao}`}
                </legend>
                <p>
                  {experience.vinculo} <br />
                  {experience.data_inicio} <br />
                  {`${experience.data_inicio} até ${experience.data_fim}`}
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
          <form className="form--experiencia" onSubmit={tempEditExperience?.organizacao ? handlePutExperience : handleProfessionalSubmit}>
            <aside className="area-registro">
              <section className="bloco-um">
                <Input
                  label="Organização"
                  name="organizacao"
                  onChange={handleProfessionalInputChange}
                  defaultValue={tempEditExperience?.organizacao}
                />
                <Input
                  label="Cargo"
                  name="cargo"
                  onChange={handleProfessionalInputChange}
                  defaultValue={tempEditExperience?.cargo}
                />
              </section>
              <section className="bloco-dois">
                <Select
                  label="Vínculo"
                  name="vinculo"
                  options={vinculos}
                  defaultOption={tempEditExperience?.vinculo || "Selecione"}
                  onChange={handleProfessionalSelectChange}
                />
              </section>
              <section className="bloco-tres">
                <aside>
                  <Select
                    label="Mês inicial"
                    name="initialMonth"
                    options={monthOptions}
                    defaultOption={tempEditExperience?.data_inicio || "Selecione"}
                    onChange={handleProfessionalSelectChange}
                  />
                  <Select
                    label="Ano inicial"
                    name="initialYear"
                    options={yearOptions}
                    defaultOption={tempEditExperience?.data_inicio || "Selecione"}
                    onChange={handleProfessionalSelectChange}
                  />
                </aside>
                <aside>
                  <ToggleSwitch
                    label="Trabalho atual"
                    name="currentlyWorking"
                    id="currentlyWorking"
                    onChange={handleProfessionalInputChange}
                    defaultChecked={tempEditExperience?.data_fim ? true : false}
                  />
                </aside>
                {!professionalFormData.currentlyWorking && (
                  <aside>
                    <Select
                      label="Mês final"
                      name="finalMonth"
                      options={monthOptions}
                      defaultOption={tempEditExperience?.data_fim || "Selecione"}
                      onChange={handleProfessionalSelectChange}
                    />
                    <Select
                      label="Ano final"
                      name="finalYear"
                      options={yearOptions}
                      defaultOption={tempEditExperience?.data_fim || "Selecione"}
                      onChange={handleProfessionalSelectChange}
                    />
                  </aside>
                )}
              </section>
              <section className="bloco-quatro">
                <Textarea
                  name="descricao"
                  label="Detalhes"
                  onChange={handleProfessionalTextAreaChange}
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
                    setTempEditExperience({} as ProfessionalType)
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
