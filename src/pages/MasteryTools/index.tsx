import React, { useState, useEffect, FormEvent } from 'react';
import { BodyMasteryTools } from './styles';
import Button from '../../components/Button';
import { useHistory } from 'react-router-dom';
import SelectTool, { ToolType } from '../../components/SelectTools';
import axios, { AxiosError } from "axios";


function MasteryTools() {
  const history = useHistory();


  const [selectedTools, setSelectedTools] = useState<ToolType[]>([]);
  const [existingTools, setExistingTools] = useState<ToolType[]>([]);
  useEffect(() => {
    axios
      .get("/api/v1/habilidades")
      .then((response) => {
        setExistingTools(response.data);
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
  },[]);
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    // existingTools?.map(tool => {
    //   if(tool.id){
    //     delete tool.id;
    //   }
    // })
    selectedTools?.map(tool => {
      if(!existingTools.includes(tool)){
        setExistingTools([...existingTools,tool])
      }
    })
    {console.log(existingTools)}
    const res = await axios
      .post("/api/v1/habilidades", existingTools, {
        withCredentials: true,
      })
      .catch((err: AxiosError) => {
        return err?.response?.data.detail;
      });
    console.log(res);
    alert(res);
    const resp = await axios
      .put("/api/v1/pessoas/1", selectedTools, {
        withCredentials: true,
      })
      .catch((err: AxiosError) => {
        return err?.response?.data.detail;
      });
    console.log(resp);
    alert(resp);
  }
  return (
    <BodyMasteryTools onSubmit={handleSubmit}>
      {console.log(existingTools)}
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