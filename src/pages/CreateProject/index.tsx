import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useContext,
} from "react";
import { BodyCreateProject } from "./styles";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Button from "../../components/Button";
import ToggleSwitch from "../../components/ToggleSwitch";
import { useHistory } from "react-router";
import SelectArea, { AreaType } from "../../components/SelectArea";
import SelectTool, { ToolType } from "../../components/SelectTools";
import { AxiosError } from "axios";
import api from "../../services/api";
import Modal from "../../components/Modal";
import Login from "../../components/Login";
import Dropzone from "../../components/Dropzone";
import { Beforeunload } from 'react-beforeunload';
import { Context } from "../../context/AuthContext";
import Logged from "../../components/Logged";
import { BodyModalDefault } from '../../components/Modal/styles';


function CreateProject() {
  const { loading, isAuthenticated } = useContext(Context);

  const history = useHistory();
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    visibilidade: true,
    objetivo: "",
  });

  const [selectedTools, setSelectedTools] = useState<ToolType[]>([]);
  const [showNextStep, setShowNextStep] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(!isAuthenticated);
  const [selectedAreas, setSelectedAreas] = useState<AreaType[]>([]);
  const [idProject, setIdProject] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File>();
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setFormData({ ...formData, [name]: value });
  }

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { nome, visibilidade } = formData;

    const data = new FormData();

    data.append("nome", nome);
    data.append("visibilidade", JSON.stringify(visibilidade));
    selectedFile && data.append("foto_capa", selectedFile, `${nome}pic.jpg`);
    data.append("descricao", "Não informado");
    data.append("objetivo", "Não informado");

    try {
      const { id } = await (await api.post("/api/v1/projeto", data, {
        withCredentials: true,
      })).data;
      setIdProject(id);
      setShowNextStep(true);
    } catch (error) {
      return error.response.data.detail;
    }
  }

  async function handleSecondSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      ...formData,
      habilidades: selectedTools,
      areas: selectedAreas,
    };

    await api
      .put(`/api/v1/projeto/${idProject}`, data, {
        withCredentials: true,
      })
      .then(() => {
        history.push("/");
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
  }

  return (
    <BodyCreateProject showSecondStep={showNextStep}>
      <Beforeunload onBeforeunload={(event) => event.preventDefault()} />
      <Logged />
      <Modal
        open={showModal}
        setOpen={setShowModal}
        onAfterClose={() => {
          setShowModal(!isAuthenticated);
        }}
      >
        <BodyModalDefault>

          <h1>Para prosseguir, você precisa estar logado</h1>
          <Login onSuccessLogin={() => setShowModal(isAuthenticated)} />
        </BodyModalDefault>
      </Modal>
      <div className="area-central container">
        <h1>Criar Projeto</h1>

        <form className="primeira-etapa" onSubmit={handleSubmit}>
          <div className="coluna-um">
            <Input
              mask=""
              name="nome"
              label="Título do projeto"
              onChange={handleInputChange}
              minLength={3}
              maxLength={50}
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
            >
              Cancelar
            </Button>
            <Button
              theme="primary-yellow"
              type="submit"
              disabled={formData.nome === ""}
            >
              Continuar
            </Button>
          </section>
        </form>

        <form className="segunda-etapa" onSubmit={handleSecondSubmit}>
          <div className="coluna-um">
            <Textarea
              label="Objetivo do projeto"
              name="objetivo"
              onChange={handleTextAreaChange}
              minLength={3}
              maxLength={500}
              required
            />
            <Textarea
              label="Descrição simples"
              name="descricao"
              onChange={handleTextAreaChange}
              minLength={3}
              maxLength={500}
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
            >
              Voltar
            </Button>
            <Button
              theme="primary-yellow"
              disabled={formData.objetivo === "" || formData.descricao === ""}
              type="submit"
            >
              Concluir
            </Button>
          </section>
        </form>
      </div>
    </BodyCreateProject>
  );
}
export default CreateProject;
