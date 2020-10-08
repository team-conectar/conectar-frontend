import React, { useState, ChangeEvent, FormEvent } from 'react';
import { BodyCreateProject } from './styles';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import ToggleSwitch from '../../components/ToggleSwitch';
import { useHistory } from 'react-router';
import { useDropzone } from 'react-dropzone'
import SelectArea from '../../components/SelectArea';
import SelectTool, { ToolType } from '../../components/SelectTools';
import axios, { AxiosError } from "axios";
import { isAuthenticated } from '../../utils/auth';
import Modal from '../../components/Modal';
import Login from '../../components/Login';



function CreateProject() {

  const history = useHistory();
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    visibilidade: true,
    objetivo: "",
  });

 

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
    await axios
      .post("/api/v1/habilidades", selectedTools, {
        withCredentials: true,
      })
      .catch((err: AxiosError) => {
        return err?.response?.data.detail;
      });

    const res = await axios
      .post("/api/v1/projeto", formData, {
        withCredentials: true,
      })
      .catch((err: AxiosError) => {
        return err?.response?.data.detail;
      });
    console.log(res);
    alert(res);
  }
  const [selectedTools, setSelectedTools] = useState<ToolType[]>([]);
  const [showNextStep, setShowNextStep] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(isAuthenticated());
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: onDropAcceptedFiles => {
      console.log(onDropAcceptedFiles);
    },
  });

  return (
    <BodyCreateProject showSecondStep={showNextStep}>
      {console.log(localStorage.getItem('permissions'))}
      <Modal
        open={showModal}
        setOpen={setShowModal}
      >
        <h1>Para prosseguir, você precisa estar logado</h1>
        <Login onSuccessLogin={() => setShowModal(isAuthenticated())} />
      </Modal>
      <div className="area-central container">
        <h1>Criar Projeto</h1>

        <main className="primeira-etapa">
          <div className="coluna-um">

            <Input
              name="nome"
              label="Título do projeto"
              onChange={handleInputChange}
              required
            />
            <div className="upload-img">
              <label htmlFor="upload">Capa do projeto</label>
              <div className="view-img" {...getRootProps()}>
                <label>Fazer Upload de Imagem</label>
                <input
                  name="upload"
                  id="upload"
                  accept="image/png, image/jpeg"
                  {...getInputProps()}
                />
                <p>ou</p>
                {isDragActive ? (
                  <p>Solte a imagem</p>
                ) : (
                    <p>Arraste o arquivo para cá</p>
                  )}

                <p>Tamanho mínimo de 805x632px</p>
              </div>
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
            <SelectArea label="Área de desenvolvimento" />
          </div>
          <section>
            <Button
              type="button"
              onClick={history.goBack}
              theme="secondary-yellow"
            >Cancelar</Button>
            <Button
              onClick={() => setShowNextStep(true)}
              theme="primary-yellow"
              type="submit"
              disabled={formData.nome === ""}
            >Continuar</Button>
          </section>


        </main>
        <main className="segunda-etapa">
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
        </main>
      </div>
    </BodyCreateProject>
  )
}
export default CreateProject;