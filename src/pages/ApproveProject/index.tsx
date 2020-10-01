import React, { useState, ChangeEvent, FormEvent } from 'react';
import { BodyApproveProject } from './styles';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import ToggleSwitch from '../../components/ToggleSwitch';
import { useHistory } from 'react-router';
import { useDropzone } from 'react-dropzone'
import SelectArea from '../../components/SelectArea';
import SelectTool from '../../components/SelectTools';
import axios, { AxiosError } from "axios";
import NavBar from '../../components/NavBar';
import ProjectCards from '../../components/ProjectCards';



function ApproveProject() {

  const history = useHistory();
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    visibilidade: true,
    objetivo: "",
  });

  // function handleCheckBoxChange(event: ChangeEvent<HTMLInputElement>) {
  //   const { name, value } = event.target;

  //   setFormData({...formData, [name]: value });
  //   console.log(formData.visibilidade);
  // }

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

  const [showNextStep, setShowNextStep] = useState<boolean>(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: onDropAcceptedFiles => {
      console.log(onDropAcceptedFiles);

    },
  });

  return (
    <BodyApproveProject showSecondStep={showNextStep}>
      <NavBar logged={false} />
      <main>
        <div className="area-esq">
          <aside>

            <legend>XXXXXXXXXXXXXXXx</legend>
            <Button >xxxxxxxxxxx</Button>
            <p>xxxxxxxxxx</p>
          </aside>
        </div>
        <div className="area-central">
          <section>
            <img src="" alt="" width="500px" />
            <h1>Confira as respostas dos candidatos aos convites enviados</h1>
          </section>
          
          <ProjectCards />
          <section>
            <Button
              className="voltar"
              type="button"
              onClick={() => setShowNextStep(false)}
              theme="secondary-yellow"
            >Finalizar acordos</Button>
            <Button
              theme="primary-yellow"
              onClick={handleSubmit}
              disabled={false}
            >Enviar convites</Button>
          </section>
        </div>
        <div className="area-dir">
          <aside>

            <legend>XXXXXXXXXXXXXXXx</legend>
            <Button >xxxxxxxxxxx</Button>
            <p>xxxxxxxxxx</p>
          </aside>
        </div>
      </main>
    </BodyApproveProject>
  )
}
export default ApproveProject;