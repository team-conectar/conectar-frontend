import React, { ChangeEvent, FormEvent, useState, useCallback } from 'react';
import Input from '../Input';
import Textarea from '../Textarea';
import Select, { OptionsTypes } from '../Select';
import ToggleSwitch from '../ToggleSwitch';
import Button from '../Button';
import { BodyAcademicForm } from './styles';
import { inputChange } from "../../utils/inputChange";
import { selectChange } from "../../utils/selectChange";
import { textareaChange } from "../../utils/textareaChange";
import { yearOptions, monthOptions } from "../../utils/dates";
import axios, { AxiosError } from "axios";

const AcademicExperiences: React.FC = () => {
  const [register, setRegister] = useState<boolean>(false)
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
  const [professionalFormData, setProfessionalFormData] = useState({
    organization: "",
    bond: "",
    position: "",
    initialYear: "",
    finalYear: "",
    details: "",
    currentlyWorking: false
  });
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

    if (!currentlyWorking) {
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
  return (
    <BodyAcademicForm>
      <section className="caracteristicas">
        <h2>Atuação Profissional</h2>
        {!register ? (
          <div className="experiencias">
            <button onClick={() => setRegister(true)}>
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

                </section>
                <section className="bloco-tres">
                  <aside>
                    <Select
                      label="Mês inicial"
                      name="initialMonth"
                      options={monthOptions}
                      defaultOption="Selecione"
                    // onChange={handleProfessionalSelectChange}
                    />
                    <Select
                      label="Ano inicial"
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
                      id="currentlyWorking"
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
                  <Button type="submit" theme="primary-green">Salvar</Button>
                  <Button theme="secondary-green">Excluir</Button>
                  <Button
                    onClick={() => setRegister(false)}
                  >
                    Cancelar
                  </Button>
                </section>
              </aside>
            </form>
          )}
      </section>



    </BodyAcademicForm>

  )

}

export default AcademicExperiences;