import React, { useState, useEffect, FormEvent } from 'react';
import { BodyMasteryTools } from './styles';
import Button from '../../components/Button';
import { useHistory } from 'react-router-dom';
import SelectTool from '../../components/SelectTools';
import axios, { AxiosError } from "axios";


function MasteryTools() {
  const history = useHistory();


  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    

    const res = await axios
      .post("/api/v1/habilidades", selectedTools, {
        withCredentials: true,
      })
      .catch((err: AxiosError) => {
        return err?.response?.data.detail;
      });
    console.log(res);
    alert(res);
  }
  return (
    <BodyMasteryTools onSubmit={handleSubmit}>
      <div className="area-central container">

        <h1>Selecione suas habilidades e ferramentas de domínio</h1>
        <SelectTool
          callbackSelectedTools={selectedTools}
          setCallbackSelectedTools={setSelectedTools}
        />


      </div>
      <footer >
        <Button
          theme="secondary-yellow"
          onClick={() => { history.push("/profilefeatures") }}
        >Pular</Button>
        <Button
          onClick={() => { history.push("/profilefeatures") }}
          theme="primary-yellow"
          type="submit"
        >Continuar</Button>
      </footer>
    </BodyMasteryTools>
  )
}
export default MasteryTools;