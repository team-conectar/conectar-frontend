import React, { useState, FormEvent } from 'react';
import { BodyMasteryTools } from './styles';
import Button from '../../components/Button';
import { useHistory } from 'react-router-dom';
import SelectTool, { ToolType } from '../../components/SelectTools';
import axios, { AxiosError } from "axios";


function MasteryTools() {
  const history = useHistory();


  const [selectedTools, setSelectedTools] = useState<ToolType[]>([]);
  
  
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    // existingTools?.map(tool => {
    //   if(tool.id){
    //     delete tool.id;
    //   }
    // })
    
    await axios
      .put("/api/v1/pessoas", {"habilidades": selectedTools}, {
        withCredentials: true,
      })
      .catch((err: AxiosError) => {
        return err?.response?.data.detail;
      });
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
          onClick={() => { /*history.push("/profilefeatures")*/ }}
          theme="primary-yellow"
          type="submit"
        >Continuar</Button>
      </footer>
    </BodyMasteryTools>
  )
}
export default MasteryTools;