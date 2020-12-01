import React, {
  useRef,
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
import { finalYearOptions, yearOptions } from "../../../utils/dates";
import { AxiosError } from "axios";
import api from "../../../services/api";
import edit from "../../../assets/icon/editar.svg";
import trash from "../../../assets/icon/lixeira.svg";
import Modal from "../../Modal";
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import getValidationErrors from '../../../utils/getValidationErrors';
/**
 * As this type is used from data that comes from the backend, it comes with
 * data_fim and data_inicio, but we need data_inicio and data_fim as placeholders
 * so we can create a full date from it and modify the state properly
 */
interface AcademicType {
  id: number;
  instituicao: string;
  escolaridade: string;
  curso: string;
  situacao: string;
  descricao: string;
  data_inicio: string;
  data_fim: string;
}


const AcademicExperiences: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [academicRecords, setAcademicRecords] = useState<AcademicType[]>([]);
  const [editingId, setEditingId] = useState<number>(0);
  const initialAcademicData = {
    id: 0,
    instituicao: "",
    escolaridade: "",
    curso: "",
    situacao: "",
    descricao: "",
    data_inicio: "",
    data_fim: "",
  } as AcademicType;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [experienceExcluded, setExperienceExcluded] = useState({
    id: 0,
    nome: "",
  })
  const [academicFormData, setAcademicFormData] = useState(initialAcademicData);
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
  useEffect(() => {
    api
      .get("/api/v1/experiencias/academica/me", {
        withCredentials: true,
      })
      .then((response) => {
        setAcademicRecords(response.data);
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
  }, [editingId, showRegister, openModal]);
  async function handleDeleteExperience(id: number) {
    if (academicRecords.length === 1) {
      academicRecords.splice(0, 1);
    }
    await api
      .delete(`/api/v1/experiencias/academica/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        setShowRegister(false);
        setOpenModal(false);
        setEditingId(0);
        setAcademicFormData(initialAcademicData);
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
  }
  const handleSubmit = useCallback(
    async (formData: AcademicType) => {

      const {
        instituicao,
        escolaridade,
        curso,
        descricao,
        data_fim,
        data_inicio,
        situacao,
      } = formData;


      const data = {
        instituicao,
        descricao,
        data_inicio: `${data_inicio}-02-01`,
        data_fim: (situacao !== "Incompleto" && data_fim) ? `${data_fim}-02-01` : null,
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
      const res = editingId
        ? await api
          .put(`/api/v1/experiencias/academica/${editingId}`, data, {
            withCredentials: true,
          })
          .then(() => {
            setShowRegister(false);
            setEditingId(0);
            setAcademicFormData(initialAcademicData);
          })
          .catch((err: AxiosError) => {
            // Returns error message from backend
            return err?.response?.data.detail;
          })
        : await api
          .post("/api/v1/experiencias/academica", data, {
            withCredentials: true,
          }).then(() => {
            setShowRegister(false);
            setEditingId(0);
            setAcademicFormData(initialAcademicData);
          })
          .catch((err: AxiosError) => {
            // Returns error message from backend
            return err?.response?.data.detail;
          });
      console.log(res);
      // Do something
    }, []);
  function handleEditExperience(experience: AcademicType) {
    let {
      id,
      instituicao,
      escolaridade,
      curso,
      descricao,
      data_fim,
      data_inicio,
      situacao,
    }: AcademicType = experience;


    const data = {
      id,
      instituicao,
      escolaridade,
      curso,
      descricao,
      data_fim: (situacao !== "Incompleto" && data_fim) ? data_fim.split("-")[0] : "",
      data_inicio: data_inicio.split("-")[0],
      situacao,
    };


    setShowRegister(true);
    setEditingId(id);
    setAcademicFormData(data);

  }


  return (
    <BodyExperiences>
      {console.log(academicFormData)}
      <Modal setOpen={setOpenModal} open={openModal}>
        <h1>Deseja realmente excluir {experienceExcluded.nome}?</h1>
        <footer>
          <Button
            theme="primary-yellow"
            onClick={() => handleDeleteExperience(experienceExcluded.id)}
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
                    handleEditExperience(experience)
                  }}
                />
                <img
                  src={trash}
                  alt="apagar experiencia"
                  onClick={() => {
                    setOpenModal(true);
                    setExperienceExcluded({ ...experience, "nome": experience.curso });
                  }}
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
                  {`${experience?.data_inicio?.split("-")[0]} até ${experience?.data_fim?.split("-")[0]
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
          <Form
            className="form--experiencia"
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <aside className="area-registro">
              <section className="bloco-um">
                <Input
                  label="Instituição de ensino"
                  name="instituicao"
                  required
                  defaultValue={academicFormData?.instituicao}
                />
                <Input
                  label="Curso"
                  name="curso"
                  required
                  defaultValue={academicFormData?.curso}
                />
              </section>
              <section className="bloco-dois">
                <Select
                  label="Nível de formação"
                  name="escolaridade"
                  required
                  options={niveisFormacao}
                  defaultOption={
                    academicFormData
                      ? academicFormData.escolaridade
                      : "Selecione"
                  }
                />
                <aside>
                  <Select
                    label="Ano inicial"
                    name="data_inicio"
                    required
                    options={yearOptions}
                    defaultOption={
                      // Getting only the year as string so we can modify it properly
                      academicFormData?.data_inicio
                        ? academicFormData?.data_inicio.split("-")[0]
                        : "Selecione"
                    }
                  />
                  {academicFormData.situacao !== "Incompleto" &&
                    <Select
                      label="Ano final"
                      name="data_fim"
                      options={finalYearOptions(Number(academicFormData.data_inicio.split("-")[0]))}
                      defaultOption={
                        academicFormData.data_fim && Number(academicFormData?.data_inicio.split("-")[0]) < Number(academicFormData?.data_fim.split("-")[0])
                          ? academicFormData.data_fim.split("-")[0]
                          : "Selecione"
                      }
                      required
                    />
                  }
                </aside>
              </section>
              <section className="bloco-tres area-toggle">
                <ToggleSwitch
                  label="Incompleto"
                  name="situacao"
                  type="radio"
                  value="Incompleto"
                  id="incomplete"
                  defaultChecked={
                    academicFormData &&
                    academicFormData?.situacao === "Incompleto"
                  }
                  required
                />
                <ToggleSwitch
                  label="Em andamento"
                  name="situacao"
                  type="radio"
                  value="Em andamento"
                  id="current"
                  defaultChecked={
                    academicFormData &&
                    academicFormData?.situacao === "Em andamento"
                  }
                  required
                />
                <ToggleSwitch
                  label="Concluído"
                  name="situacao"
                  type="radio"
                  value="Concluído"
                  id="finished"
                  defaultChecked={
                    academicFormData &&
                    academicFormData?.situacao === "Concluído"
                  }
                  required
                />
              </section>
              <section className="bloco-quatro">
                <Textarea
                  name="descricao"
                  label="Detalhes"
                  required
                  defaultValue={academicFormData?.descricao}
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
                        setExperienceExcluded({ ...academicFormData, "nome": academicFormData.curso })
                      }
                      : () => setShowRegister(false)
                  }
                >
                  Excluir
              </Button>
                <Button
                  onClick={() => {
                    setShowRegister(false);
                    setEditingId(0);
                    setAcademicFormData(initialAcademicData);
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

export default AcademicExperiences;
