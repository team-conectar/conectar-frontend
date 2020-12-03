import React, {
  useRef,
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
import { yearOptions, monthOptions, toMonth, finalYearOptions } from "../../../utils/dates";
import { AxiosError } from "axios";
import api from "../../../services/api";
import edit from "../../../assets/icon/editar.svg";
import trash from "../../../assets/icon/lixeira.svg";
import Modal from "../../Modal";
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import getValidationErrors from '../../../utils/getValidationErrors';
import { OptionTypeBase, ValueType } from "react-select";
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
  id?: number;
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
  //Global
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
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const formRef = useRef<FormHandles>(null);
  const [stored, setStored] = useState<ProfessionalType[]>([]);
  const [initialYear, setInitialYear] = useState<number>();
  const initialProfessionalData = {
    id: 0,
    currentWorking: false,
  } as ProfessionalDataType;
  const [editStored, setEditStored] = useState<ProfessionalDataType>(initialProfessionalData);
  const [experienceExcluded, setExperienceExcluded] = useState({
    id: 0,
    nome: "",
  })
  useEffect(() => {
    api
      .get("/api/v1/experiencias/profissional/me", {
        withCredentials: true,
      })
      .then((response) => {
        setStored(response.data);
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
  }, [showRegister, editStored, openModal]);
  async function handleDeleteExperience(id: number) {
    if (stored.length === 1) {
      stored.splice(0, 1);
    }
    await api.delete(`/api/v1/experiencias/profissional/${id}`, {
      withCredentials: true,
    })
      .then(() => {
        setShowRegister(false);
        setOpenModal(false);
        setEditStored(initialProfessionalData);
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });

  }

  const handleSubmit = useCallback(
    async (formData: ProfessionalDataType) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          vinculo: Yup
            .string()
            .required('Informe o vínculo'),
          organizacao: Yup
            .string()
            .required('Informe a organização'),
          cargo: Yup
            .string()
            .required('Informe o cargo'),
          descricao: Yup
            .string()
            .required('Informe a descrição'),
          finalYear: Yup
            .string()
            .required('Ano final é obrigatório'),
          initialYear: Yup
            .string()
            .required('Ano inicial é obrigatório'),
          initialMonth: Yup
            .string()
            .required('Mês inicial é obrigatório'),
          finalMonth: Yup
            .string()
            .required('Mês final é obrigatório'),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });
        // Validation passed
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
        }: ProfessionalDataType = formData;
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
        if (editStored.id) await api
          .put(
            `/api/v1/experiencias/profissional/${editStored.id}`, data, {
            withCredentials: true,
          })
          .then(() => {
            setShowRegister(false);
            setEditStored(initialProfessionalData);
          })
          .catch((err: AxiosError) => {
            // Returns error message from backend
            return err?.response?.data.detail;
          })
        else await api
          .post("/api/v1/experiencias/profissional", data, {
            withCredentials: true,
          })
          .then(() => {
            setShowRegister(false);
            setEditStored(initialProfessionalData);

          })
          .catch((err: AxiosError) => {
            // Returns error message from backend
            return err?.response?.data.detail;
          });


      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          // Validation failed
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
          return;
        }
        alert("Lgoin ou senha incorreto")
      }


      // Do something
    }, []);
  //Edit
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
      id,
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
    setEditStored(data);

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
          {stored?.map((experience: ProfessionalType) => (
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
                    ${experience.data_fim ?
                      `${toMonth(experience.data_fim.split("-")[1])} 
                      de 
                      ${experience.data_fim.split("-")[0]}` :
                      "o momento atual"
                    }
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
          <Form
            className="form--experiencia"
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <aside className="area-registro">
              <section className="bloco-um">
                <Input
                  label="Organização"
                  name="organizacao"
                  defaultValue={editStored?.organizacao}
                />
                <Input
                  label="Cargo"
                  name="cargo"
                  defaultValue={editStored?.cargo}
                />
              </section>
              <section className="bloco-dois">
                <Select
                  label="Vínculo"
                  name="vinculo"
                  options={vinculos}
                />
              </section>
              <section className="bloco-tres">
                <aside>
                  <Select
                    label="Mês inicial"
                    name="initialMonth"
                    options={monthOptions}
                    defaultValue={editStored.id ?
                      {
                        label: editStored?.initialMonth,
                        value: editStored?.initialMonth
                      } : null

                    }
                    defaultOption={editStored?.initialMonth}
                  />
                  <Select
                    label="Ano inicial"
                    name="initialYear"
                    options={yearOptions}
                    onChange={(option: any) => {
                      setInitialYear(Number(option.value))
                    }}
                    defaultValue={editStored.id ?
                      {
                        label: editStored?.initialYear,
                        value: editStored?.initialYear
                      } : null
                    }
                  />
                </aside>
                <aside>
                  <ToggleSwitch
                    label="Trabalho atual"
                    name="currentWorking"
                    id="currentWorking"
                    defaultChecked={editStored.currentWorking}
                  />
                </aside>
                {!0 && (
                  <aside>
                    <Select
                      label="Mês final"
                      name="finalMonth"
                      options={monthOptions}

                    />
                    <Select
                      label="Ano final"
                      name="finalYear"
                      options={finalYearOptions(Number(initialYear))}

                    />
                  </aside>
                )}
              </section>
              <section className="bloco-quatro">
                <Textarea
                  name="descricao"
                  label="Detalhes"
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
                    editStored.id
                      ? () => {
                        setOpenModal(true);
                        //setExperienceExcluded({ "nome": professionalFormData.cargo, "id": editStored })
                      }
                      : () => setShowRegister(false)
                  }
                >
                  Excluir
              </Button>
                <Button
                  onClick={() => {
                    setShowRegister(false);
                    setEditStored(initialProfessionalData);
                  }}
                >
                  Cancelar
              </Button>
              </section>
            </aside>
          </Form>
        )}
    </BodyExperiences>
  );
};

export default ProfessionalExperiences;
