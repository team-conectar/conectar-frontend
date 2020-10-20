import React, { useState, ChangeEvent, FormEvent, useEffect, useContext } from 'react';
import { BodyCreateProject } from './styles';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import ToggleSwitch from '../../components/ToggleSwitch';
import { useHistory } from 'react-router';
import SelectArea, { Area } from '../../components/SelectArea';
import SelectTool, { ToolType } from '../../components/SelectTools';
import axios, { AxiosError } from "axios";

import Modal from '../../components/Modal';
import Login from '../../components/Login';
import Dropzone from '../../components/Dropzone';

import { Context } from "../../context/AuthContext";
import Logged from "../../components/Logged";

function CreateProject() {

  const { isAuthenticated } = useContext(Context);


  const history = useHistory();
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    visibilidade: true,
    objetivo: "",
  });

  const [selectedTools, setSelectedTools] = useState<ToolType[]>([]);
  const [showNextStep, setShowNextStep] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedAreas, setSelectedAreas] = useState<Area[]>([]);
  const [idProject, setIdProject] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File>();

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setFormData({ ...formData, [name]: value })
  }

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value })

  }
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const {
      nome,
      visibilidade,
    } = formData;

    const data = new FormData();

    data.append("nome", nome);
    data.append("visibilidade", JSON.stringify(visibilidade));
    selectedFile && data.append("userpic", selectedFile, `${nome}pic.jpg`);
    data.append("areas", JSON.stringify(selectedAreas));
    try {
      await axios.post("/api/v1/projeto", data);
      setShowNextStep(true);
    } catch (error) {
      return error.response.data.detail;
    }
  }

  async function handleSecondSubmit(event: FormEvent) {
    event.preventDefault();

    const data = { ...formData, "habilidades": selectedTools };
    try {
      await axios.put("/api/v1/projeto", data, {
        withCredentials: true,
      });
      history.push("/");
    } catch (error) {
      return error.response.data.detail;
    }
  }
  // async function handleSubmit(event: FormEvent) {
  //   event.preventDefault();
  //   // await axios
  //   //   .post("/api/v1/habilidades", selectedTools, {
  //   //     withCredentials: true,
  //   //   })
  //   //   .catch((err: AxiosError) => {
  //   //     return err?.response?.data.detail;
  //   //   });
  //   const data = { ...formData, "habilidades": selectedTools, "areas": selectedAreas };
  //   const res = idProject > 0
  //     ? await axios
  //       .post("/api/v1/projeto", data, {
  //         withCredentials: true,
  //       }).then((response) => {
  //         const { id }: { id: number } = response.data;
  //         setIdProject(id);
  //       })
  //       .catch((err: AxiosError) => {
  //         return err?.response?.data.detail;
  //       })
  //     : await axios
  //       .put(`/api/v1/projeto/${idProject}`, data, {
  //         withCredentials: true,
  //       })
  //       .catch((err: AxiosError) => {
  //         return err?.response?.data.detail;
  //       });
  //   console.log(res);
  //   alert({ ...res });
  // }

  

  return (
    <BodyCreateProject showSecondStep={showNextStep}>
      <Logged />
      <Modal
        open={showModal}
        setOpen={setShowModal}
      >
        <h1>Para prosseguir, você precisa estar logado</h1>
        <Login onSuccessLogin={() => setShowModal(isAuthenticated)} />
      </Modal>
      <div className="area-central container">
        <h1>Criar Projeto</h1>

        <form
          className="primeira-etapa"
          onSubmit={handleSubmit}
        >
          <div className="coluna-um">

            <Input
              mask=""
              name="nome"
              label="Título do projeto"
              onChange={handleInputChange}
              required
            />
            <div className="upload-img">
              <Dropzone onFileUploaded={setSelectedFile} />
            </div>

            <ToggleSwitch
              name="visibilidade"
              id="visibilidade"
              label="Tornar este projeto privado"
              onChange={handleInputChange}
              checked={formData.visibilidade}
            />



          </div>
          <div className="coluna-dois">
            <SelectArea
              label="Área de desenvolvimento"
              callbackSelectedAreas={selectedAreas}
              setCallbackSelectedAreas={setSelectedAreas}
            />
          </div>
          <section>
            <Button
              type="button"
              onClick={history.goBack}
              theme="secondary-yellow"
            >Cancelar</Button>
            <Button
              theme="primary-yellow"
              type="submit"
              disabled={formData.nome === ""}
            >Continuar</Button>
          </section>


        </form>
        <form
          className="segunda-etapa"
          onSubmit={handleSecondSubmit}
        >
          <div className="coluna-um">
            <Textarea
              label="Objetivo do projeto"
              name="objetivo"
              onChange={handleTextAreaChange}
              required
            />
            <Textarea
              label="Descrição simples"
              name="descricao"
              onChange={handleTextAreaChange}
              required
            />
          </div>
          <div className="coluna-dois">
            <SelectTool
              callbackSelectedTools={selectedTools}
              setCallbackSelectedTools={setSelectedTools}
              label="Ferramentas, matérias e habilidades que o time precisa dominar"
            />
          </div>
          <section>
            <Button
              className="voltar"
              type="button"
              onClick={() => setShowNextStep(false)}
              theme="secondary-yellow"
            >Voltar</Button>
            <Button
              theme="primary-yellow"
              onClick={handleSubmit}
              disabled={formData.objetivo === "" || formData.descricao === ""}
              type="submit"
            >Concluir</Button>
          </section>
        </form>
      </div>
    </BodyCreateProject>
  )
}
export default CreateProject;